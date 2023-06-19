import mongoose from "mongoose";

export class DatabaseModel {
    static async connectDB() {
        const DB_URL = 'mongodb://127.0.0.1:27017/library_manager';
        return await mongoose.connect(DB_URL);
    }
}