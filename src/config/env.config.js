import dotenv from "dotenv"
dotenv.config()
export const config = {
    PORT: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || "development",
    isProd: process.env.NODE_ENV === "production",
    mongoDbUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET
}