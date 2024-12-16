export interface ApiError {
  response?: {
    data?: {
      details?: string;
    };
  };
}