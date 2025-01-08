/* eslint-disable prettier/prettier */
export interface Task {
  _id: string;
  name: string;
  description: string;
  deadlineDate: string;
  deadlineTime: string;
  users?: string[];
}
