import { AppError } from "../utils/error.js";
import logger from "../config/logger.js";
import { ERROR_CODES } from "../utils/errorDictionary.js";
export function errorHandler(err, req, res, next) {
    const statusCode = err.name === "ValidationError"? 400: err.statusCode || 500
    const code = err.code || ERROR_CODES.INTERNAL_SERVER_ERROR
    const line = `${code} - ${err.message} - ${req.method} ${req.originalUrl}`
    if(statusCode >= 500){
        logger.error(line)
    }else{
        logger.warning(line)
    }
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map(error => error.message)
        return res.status(400).json({ status: "error", message: messages })
    }
    if (err.name === "CastError" && err.path === "_id") {
        err = new AppError(ERROR_CODES.ID_ERROR);
    }
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
            code: err.code || ERROR_CODES.INTERNAL_SERVER_ERROR
        })
    }
    if (res.headersSent) {
        return next(err)
    }
    return res.status(500).json({
        status: "error",
        message: "Error interno del servidor",
        code: ERROR_CODES.INTERNAL_SERVER_ERROR
    })
}