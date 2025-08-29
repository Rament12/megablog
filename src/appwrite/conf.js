import config from "../config/config.js";
import { Client,ID,Databases,Storage,Query } from "appwrite";


export class Service{
    client=new Client();
    databases;
    storage;
    constructor(){
        this.client
        .setEndpoint(config.VITE_APPWRITE_URL) // Your API Endpoint
        .setProject(config.VITE_APPWRITE_PROJECT_ID); // Your project ID
        this.databases=new Databases(this.client);
        this.storage=new Storage(this.client);
    }
   async createPost({title,content,featureImage,slug,userId,status}){
    try {
        return await this.databases.createDocument(
            config.VITE_APPWRITE_DATABASE_ID,
            config.VITE_APPWRITE_USERS_COLLECTION_ID,
            ID.unique(),
            {
                title,
                content,
                featureImage,
                slug,
                userId,
                status
            }
        )
        
    } catch (error) {
        console.log("create post error",error);
             
    }
   }    
   async updatePost(slug,{title,content,featureImage,userId,status}){
    try {
        return await this.databases.updateDocument(
            config.VITE_APPWRITE_DATABASE_ID,
            config.VITE_APPWRITE_USERS_COLLECTION_ID,
            slug,
            {
                title,
                content,
                featureImage,
                userId,
                status
            }
        )
        
    } catch (error) {
        console.log("update post error",error);
        
    }
   }
   async deletePost(slug){
    try {
         await this.databases.deleteDocument(
            config.VITE_APPWRITE_DATABASE_ID,
            config.VITE_APPWRITE_USERS_COLLECTION_ID,
            slug,
        )
        return true;
        
    } catch (error) {
        console.log("delete post error",error);
        return false;
        
    }
   }
   async getPosts(slug){
    try {
        await this.databases.getDocument(
            config.VITE_APPWRITE_DATABASE_ID,
            config.VITE_APPWRITE_USERS_COLLECTION_ID,
            slug,

        ) 
        
    } catch (error) {
        console.log("get posts error",error);
        return false;
        
    }
   }
    async listPosts(queries=[Query.equal("status","active")]){
     try {
          return await this.databases.listDocuments(
                config.VITE_APPWRITE_DATABASE_ID,
                config.VITE_APPWRITE_USERS_COLLECTION_ID,
                queries,
          ) 
          
     } catch (error) {
          console.log("list posts error",error);
          return false;
          
     }
    }
    //upload file
    async uploadfile(file){
        try {
            return await this.storage.createFile(
                config.VITE_APPWRITE_BLOGS_BUCKET_ID,
                ID.unique(),
                file
            )
            
        } catch (error) {
            console.log("file upload error",error);
            return false
            
        }
    }
    async deletFile(fileId){
        try {
            await this.storage.deleteFile(
                config.VITE_APPWRITE_BLOGS_BUCKET_ID,
                fileId
            )
            return true;
        } catch (error) {
            console.log("file delete error",error);
            return false;
            
        }
    }
    getFilePreview(fileId){
        return this.storage.getFilePreview(
            config.VITE_APPWRITE_BLOGS_BUCKET_ID,
            fileId
        )
    }
}


const service=new Service();
export default service;
