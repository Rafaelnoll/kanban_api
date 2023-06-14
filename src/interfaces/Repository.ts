export default interface Repository<Type> {
  findAll: () => Promise<Type[]>;
}
