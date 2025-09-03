import config from "../conf/config.js";
import { Client, Account, ID } from "appwrite";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.VITE_APPWRITE_URL) // Your API Endpoint
      .setProject(config.VITE_APPWRITE_PROJECT_ID); // Your project ID

    this.account = new Account(this.client);
  }

  // Create account and auto-login
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (err) {
      console.error("createAccount error:", err);
      throw err;
    }
  }

  // Login
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (err) {
      console.error("login error:", err);
      throw err;
    }
  }

  // Get current logged-in user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (err) {
      // This will happen if the user is not logged in
      if (err.code === 401) {
        console.warn("User not logged in.");
      } else {
        console.error("getCurrentUser error:", err);
      }
      return null;
    }
  }

  // Logout all sessions
  async logout() {
    try {
      await this.account.deleteSessions(); // deletes all sessions
    } catch (err) {
      console.error("logout error:", err);
    }
  }
}

const authService = new AuthService();
export default authService;
