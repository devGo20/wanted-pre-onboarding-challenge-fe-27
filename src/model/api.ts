export type QueryParams = {
  countOnly: string;
  keyword: string;
  order: string;
  priorityFilter: string;
  sort: string;
};

export interface ApiError {
  response?: {
    data?: {
      details?: string;
    };
  };
}