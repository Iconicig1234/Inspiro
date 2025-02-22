import conf from '../conf/conf'
import { Client, Databases, Storage, Query, ID } from "appwrite";

//here we need to ask database and grab some value out of it
export class Service {
    client = new Client()
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    //Get a document by its unique ID. This endpoint response returns a JSON object with the document data.
    async getPost(slug) {
        try {
            //im assuming a error here from slug - slug maybe documentId
            return await this.databases.getDocument(conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug)
        } catch (error) {
            console.log("Appwrite service :: getPost() ::", error)
            return false
        }
    }

    //if i want to query a database for something
    //it returns documents based on diffrent queries conditions - https://appwrite.io/docs/products/databases/queries
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries)
        } catch (error) {
            console.log("Appwrite service :: getPosts() ::", error);
            return false
        }
    }

    //Each piece of data or information in Appwrite Databases is a document. 
    // Documents have a structure defined by the parent collection.
    async createPost({ author, title, slug, content, featuredImage, status, userId, description }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, //its the unique id
                {
                    author, title, content, featuredImage, status, userId, description
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost() ::", error);
            return false
        }
    }

    //Update a document by its unique ID. Using the patch method you can pass only specific fields that will get updated.
    async updatePost(slug, { author, title, content, featuredImage, status, description }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, //unique document id
                {
                    author, title, content, featuredImage, status, description
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePosts() ::", error);
            return false
        }
    }

    //Delete a document by its unique ID.
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePosts() ::", error);
            return false
        }
    }

    //You can create your first bucket, upload, and download your first file in minutes.
    //<------storage services----------->

    //uplading the given file
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile() ::", error);
            return false
        }
    }

    //deleting the file with given id
    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite service :: deleteFile() ::", error);
            return false
        }
    }

    //this gives a low quality preview of doc/images
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

//make an object and return it 
const service = new Service()
export default service;