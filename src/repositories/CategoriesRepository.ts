import query from '../database';
import Repository from '../interfaces/Repository';
import ICategory from '../interfaces/Category';

class CategoriesRepository implements Repository<ICategory> {
  async findAll() {
    return await query('SELECT * FROM categories;');
  }

  async create({ name }: ICategory) {
    const [row] = await query(
      `
      INSERT INTO categories(name)
      VALUES ($1)
      RETURNING *
    `,
      [name],
    );

    return row;
  }

  async update({ name }: ICategory, id: string) {
    const [row] = await query(
      `
      UPDATE categories
      SET name = $2
      WHERE id = $1
      RETURNING *
    `,
      [id, name],
    );
    return row;
  }

  async delete(id: string) {
    await query(`DELETE FROM categories WHERE id = $1`, [id]);
  }
}

export default new CategoriesRepository();
