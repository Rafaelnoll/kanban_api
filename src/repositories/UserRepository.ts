import IRepository from '../interfaces/Repository';
import IUser from '../interfaces/User';
import query from '../database';

class UserRepository implements Partial<IRepository<IUser>> {
  async findAll() {
    return await query('SELECT * FROM users;');
  }

  async create({ username, email, password }: IUser) {
    const [row] = await query(
      `
      INSERT INTO users(username, email, password)
      VALUES($1,$2,$3)
      RETURNING *
    `,
      [username, email, password],
    );
    return row;
  }

  async delete(id: string) {
    await query('DELETE FROM users WHERE id = $1', [id]);
  }
}

export default new UserRepository();
