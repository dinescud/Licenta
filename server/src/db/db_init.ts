import mongoose from "mongoose"
import { config } from "../config/config"

export const initDB = async () => {
    await mongoose.connect(config.mongo_db)
    console.log('connected to mongodb');
}