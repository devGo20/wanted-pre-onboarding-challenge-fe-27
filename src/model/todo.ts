export interface Todo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const Priority = {
  Urgent: 'urgent',
  Normal: 'normal',
  Low: 'low',
} as const;

export type Priority = typeof Priority[keyof typeof Priority];