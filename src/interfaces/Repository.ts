export default interface Repository<Type> {
  findAll: () => Type[];
}
