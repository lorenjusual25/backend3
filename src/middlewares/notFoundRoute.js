import { AppError } from "../utils/error.js";
import { ERROR_CODES } from "../utils/errorDictionary.js";
export function notFoundRoute(req, res, next) {
    next(new AppError(ERROR_CODES.ROUTE_NOT_FOUND))
}