/**
 * Represents an API error with detailed information.
 *
 * @class ApiError
 * @extends {Error}
 */
class ApiError extends Error {
  /**
   * The timestamp of when the error occurred.
   * @type {string}
   */
  timestamp: string;

  /**
   * The HTTP status code of the error.
   * @type {number}
   */
  status: number;

  /**
   * A brief description of the error.
   * @type {string}
   */
  error: string;

  /**
   * The path or endpoint where the error occurred.
   * @type {string}
   */
  path: string;

  /**
   * Creates an instance of ApiError.
   *
   * @param {string} timestamp - The timestamp of when the error occurred.
   * @param {number} status - The HTTP status code of the error.
   * @param {string} error - A brief description of the error.
   * @param {string} path - The path or endpoint where the error occurred.
   */
  constructor(
    timestamp: string,
    status: number,
    error: string,
    path: string
  ) {
    super();
    this.timestamp = timestamp;
    this.status = status;
    this.error = error;
    this.path = path;
  }
}


export { ApiError };
