export default interface IUser {
  id?: string;
  username: string;
  email: string;
  description?: string;
  password: string;
  image_path?: string | null;
}
