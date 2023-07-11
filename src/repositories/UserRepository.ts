import IRepository from '../interfaces/Repository';
import IUser from '../interfaces/User';
import query from '../database';

type UserWithoutPassword = Omit<IUser, 'password'>;

class UserRepository implements Partial<IRepository<IUser>> {
  async findAll() {
    return await query('SELECT * FROM users;');
  }

  async findByEmail(email: string) {
    const [row] = await query(
      `
      SELECT * FROM users
      WHERE email = $1`,
      [email],
    );
    return row;
  }

  async findById(id: string) {
    const [row] = await query(
      `
      SELECT * FROM users
      WHERE id = $1`,
      [id],
    );
    return row;
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

  async update({ username, email }: UserWithoutPassword, id: string) {
    const [row] = await query(
      `
      UPDATE users
      SET username = $2, email = $3
      WHERE id = $1
      RETURNING *
      `,
      [id, username, email],
    );

    return row;
  }
}

export default new UserRepository();
