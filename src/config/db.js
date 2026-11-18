import mongoose from 'mongoose'
import { config } from './env.config.js'
import logger from './logger.js'
export const connectDB = async () => {
    await mongoose.connect(config.mongoDbUri)
    logger.info("Conectado a la base de datos")
}