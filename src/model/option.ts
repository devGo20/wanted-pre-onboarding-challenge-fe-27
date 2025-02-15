export interface Option<T> {
  label: string;
  value: T;
}

export const SortOptions: Option<{ sort: string; order: string; }>[] = [
  { label: "최근 생성순", value: { sort: "createdAt", order: "desc" } },
  { label: "오래된 생성순", value: { sort: "createdAt", order: "asc" } },
  { label: "최근 수정순", value: { sort: "updatedAt", order: "desc" } },
  { label: "오래된 수정순", value: { sort: "updatedAt", order: "asc" } },
];