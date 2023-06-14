import query from '../database';
import Repository from '../interfaces/Repository';
import ICategory from '../interfaces/Category';

class CategoriesRepository implements Repository<ICategory> {
  async findAll() {
    return await query('SELECT * FROM categories;');
  }

  async create(name: string) {
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
}

export default new CategoriesRepository();
