import query from '../database';
import Repository from '../interfaces/Repository';
import ICategory from '../interfaces/Category';

class CategoriesRepository implements Repository<ICategory> {
  async findAll() {
    return await query('SELECT * FROM categories;');
  }
}

export default new CategoriesRepository();
