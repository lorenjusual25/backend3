export const successResponse = (res, { statusCode = 200 , message = "", payload, ...extra }) => {
  return res.status(statusCode).json({ status: "success", message, ...extra, payload });
}