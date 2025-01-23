import { Response } from "express";

import { ApiError } from "./ApiError";


/**
 * Sends a 400 Bad Request response with a detailed error message.
 *
 * @param {Response} res - The Express response object.
 * @param {string} message - The error message to send.
 * @param {string} path - The request path where the error occurred.
 * @returns {void}
 */
const sendValidationError = (res: Response, message: string, path: string) => {
  res.status(400).json(new ApiError(new Date().toISOString(), 400, message, path));
};


export {
  sendValidationError,
};
