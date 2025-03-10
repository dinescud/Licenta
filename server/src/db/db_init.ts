import mongoose from "mongoose"
import { CONFIGURATION } from "../config/config"

export const initDB = async () => {
    await mongoose.connect(CONFIGURATION.mongo_url)
    console.log('connected to mongodb');
}