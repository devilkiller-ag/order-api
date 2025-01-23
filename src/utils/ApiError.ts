/**
 * Class for handling API errors.
 */
class ApiError extends Error {
  timestamp: string;
  status: number;
  error: string;
  path: string;

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