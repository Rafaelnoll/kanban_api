export type TaskStatus = 'DO' | 'DOING' | 'DONE';

export default interface Task {
  title: string;
  description: string;
  status: TaskStatus;
  category_id: string | null;
  user_id: string;
}
