// src/appwrite/appwriteConfig.js
import {
  Client,
  Account,
  Databases,
  Storage,
  ID,
  Permission,
  Role,
} from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client); // ✅ Create Storage instance

export { client, account, databases, storage, ID, Permission, Role };
