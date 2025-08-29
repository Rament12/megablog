import config from "../config/config.js";
import { Client, Account,ID } from "appwrite";


export class AuthService{
    client=new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(config.VITE_APPWRITE_URL) // Your API Endpoint
        .setProject(config.VITE_APPWRITE_PROJECT_ID); // Your project ID
        this.account=new Account(this.client);
    }
    async createAccount({email,password,name}){
        try{
            const userAccount=await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                //call another method
                return this.login({email,password});
            }else{
                return userAccount; 
            }
    }catch(err){
        console.log(err);
        throw err;
    }
  }
    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password);
        }catch(err){
            console.log(err);
            throw err;
        }
    }
    async getUserDetails(){
        try{
             await this.account.get();
        }catch(err){
            console.log("get user details error",err);
        }
        return null;
    }
    async logout(){
        try{
             await this.account.deleteSessions();
        }catch(err){
            console.log("logout error",err);
            
        }
    }
}


const authService=new AuthService();

export default authService;