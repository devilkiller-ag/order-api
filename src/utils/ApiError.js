/**
 * Class for handling API errors.
 */
class ApiError extends Error {
  constructor(
    timestamp,
    status,
    error,
    path
  ) {
    this.timestamp = timestamp;
    this.status = status;
    this.error = error;
    this.path = path;
  }
}


export { ApiError };
