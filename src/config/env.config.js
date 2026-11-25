import dotenv from "dotenv"
const nodeEnv = process.env.NODE_ENV || "development"
const envFiles = {
    development: ".env.development",
    production: ".env.production",
    test: ".env-test",
    local: ".env"
}
const envFile = envFiles[nodeEnv]
if (envFile) {
    dotenv.config({ path: envFile })
}
export const config = {
    PORT: process.env.PORT || 8080,
    nodeEnv,
    isProd: nodeEnv === "production",
    mongoDbUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    loggerLevel: process.env.LOGGER_LEVEL,
    clientUrl: process.env.CLIENT_URL
}
if (!config.mongoDbUri) {
  throw new Error("MONGO_URI no está definida para el entorno " + nodeEnv)
}