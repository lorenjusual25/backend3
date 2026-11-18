import app from "./app.js";
import { connectDB } from "./config/db.js";
import { config } from "./config/env.config.js";
import logger from "./config/logger.js";
const PORT = config.PORT
const main = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            logger.info(`Servidor corriendo en puerto ${PORT}`)
        })
    } catch (error) {
        logger.fatal(`Error al iniciar el servidor: ${error.message}`,{error})
        process.exitCode = 1
    }
}
main()