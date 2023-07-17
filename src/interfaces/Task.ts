export default interface Task {
  title: string;
  description: string;
  status: 'DO' | 'DOING' | 'DONE';
  category_id: string | null;
  user_id: string;
}
