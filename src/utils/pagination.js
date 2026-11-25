const DEFAULT_LIMIT = 10
const DEFAULT_MAX_LIMIT = 50
export const parsePagination = (query) => {
    const page = parseInt(query.page, 10) || 1
    const requested = Number(query.limit) || DEFAULT_LIMIT
    const limit = requested > DEFAULT_MAX_LIMIT ? DEFAULT_MAX_LIMIT : requested
    const offset = (page - 1) * limit
    return { limit, page, offset }
}