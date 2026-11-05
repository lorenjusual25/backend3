import mongoose from 'mongoose'
import { config } from './env.config.js'
export const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoDbUri)
        console.log("Conectado a la base de datos")
    }
    catch (error) {
        console.error(`Error al conectar a la base de datos: ${error}`)
        process.exit(1)
    }
}