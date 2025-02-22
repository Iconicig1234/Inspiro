//starting with appwrite auth services 
//here we are creating a class - because we will come across some codes that are repeated
import { Client, Account, ID } from "appwrite"
import conf from '../conf/conf'

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    //The async function allows us to write promise-based code as if it were synchronous. 
    // This ensures that the execution thread is not blocked. Async functions always return a promise. 
    // If a value is returned that is not a promise, JavaScript automatically wraps it in a resolved promise.
    //The async keyword transforms a regular JavaScript function into an asynchronous function, causing it to return a Promise.
    //The await keyword is used inside an async function to pause its execution and wait for a Promise to resolve before continuing.

    async createAccount({ name, email, password }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("Error in createAccount:", error.message); // Log error message
            throw new Error(`Failed to create account: ${error.message}`); // Add custom context
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.error("Error in Login:", error.message);
            throw new Error(`Failed to login: ${error.message}`);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.error("Error in getting current session information:", error.message);
            throw new Error(`Failed to get current session information: ${error.message}`);
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.error("Error in logout:", error.message);
            throw new Error(`Failed to logout: ${error.message}`);
        }
    }
}

const authService = new AuthService()
export default authService;

//creating object of the class and exporting it
//the advantage of exporting the object is whenever we need
//the constructor can be invoked so endpoints are properly created
//and it can access methods easily


//trying to channge the below repeated code into classes
// const client = new Client()
//     .setProject('<PROJECT_ID>'); // Your project ID
// const account = new Account(client);
