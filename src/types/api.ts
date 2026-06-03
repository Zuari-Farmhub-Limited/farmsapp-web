// Actual API response shape — data fields sit at the top level alongside status
export interface ApiResponse {
  status:      string;
  httpStatus?: string;
  message?:    string;
  status_code?:string;
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}
