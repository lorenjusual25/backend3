import { AppError } from "../utils/error.js";
export function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map(error => error.message)
        return res.status(400).json({ status: "error", message: messages })
    }
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message
        })
    }
    return res.status(500).json({
        status: "error",
        message: "Error interno del servidor"
    })
}