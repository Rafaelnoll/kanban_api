import query from '../database';
import Repository from '../interfaces/Repository';
import ICategory from '../interfaces/Category';

class CategoriesRepository implements Repository<ICategory> {
  async findAll(user_id: string) {
    return await query(
      `
      SELECT categories.*, COUNT(tasks.id) as tasks_count
      FROM categories
      LEFT JOIN tasks ON tasks.category_id = categories.id
      WHERE categories.user_id = $1
      GROUP BY categories.id, categories.name;
    `,
      [user_id],
    );
  }

  async findById(id: string, user_id: string) {
    const [row] = await query(
      'SELECT * FROM categories WHERE id = $1 AND user_id = $2;',
      [id, user_id],
    );
    return row;
  }

  async create({ name }: ICategory, user_id: string) {
    const [row] = await query(
      `
      INSERT INTO categories(name, user_id)
      VALUES ($1, $2)
      RETURNING *
    `,
      [name, user_id],
    );

    return row;
  }

  async update({ name }: ICategory, id: string, user_id: string) {
    const [row] = await query(
      `
      UPDATE categories
      SET name = $3
      WHERE id = $1 AND user_id = $2
      RETURNING *
    `,
      [id, user_id, name],
    );
    return row;
  }

  async delete(id: string, user_id: string) {
    await query(`DELETE FROM categories WHERE id = $1 AND user_id = $2`, [
      id,
      user_id,
    ]);
  }
}

export default new CategoriesRepository();
