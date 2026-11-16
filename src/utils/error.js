import { ERROR_CODES, ERROR_DICTIONARY } from "./errorDictionary.js";
export class AppError extends Error {
    constructor(code) {
        const isInDictionary = code in ERROR_DICTIONARY
        const activeCode = isInDictionary ? code : ERROR_CODES.INTERNAL_SERVER_ERROR
        const error = ERROR_DICTIONARY[activeCode]
        super(error.message)
        this.code = activeCode
        this.statusCode = error.statusCode
    }
}