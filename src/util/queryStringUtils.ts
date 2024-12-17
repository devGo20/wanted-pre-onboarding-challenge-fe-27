import { useSearchParams } from "react-router-dom";
import { QueryParams } from "../model/api";

export function getQueryStringValues(queryString: string) {
  const searchParams = new URLSearchParams(queryString);
  return {
    sort: searchParams.get('sort') || 'createdAt',
    order: searchParams.get('order') || 'desc',
    priority: searchParams.get('priority') || '',
    keyword: searchParams.get('keyword') || '',
    countOnly: searchParams.get('countOnly') || "false"
  };
}

export function createQueryString(params: QueryParams) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined || value !== '') {
      searchParams.set(key, value.toString());
    }
  });
  return searchParams.toString();
}

export function useQueryStrings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getQueryStringValues(searchParams.toString());
  const getParams = () => params;
  const setParams = (newParams: Partial<QueryParams>) => {
    const queryString = createQueryString({
      ...params,
      ...newParams,
    });
    setSearchParams(queryString, { replace: true });
  };
  return { getParams, setParams };
}
