export default interface Repository<Type> {
  findAll: (user_id: string) => Promise<Type[]>;
  findById: (id: string, user_id: string) => Promise<Type>;
  create: (object: Type, user_id: string) => Promise<Type>;
  update: (object: Type, id: string, user_id: string) => Promise<Type>;
  delete: (id: string, user_id: string) => Promise<void>;
}
