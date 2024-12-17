export type QueryParams = {
  countOnly: string;
  keyword: string;
  order: string;
  priority: string;
  sort: string;
};

export interface ApiError {
  response?: {
    data?: {
      details?: string;
    };
  };
}