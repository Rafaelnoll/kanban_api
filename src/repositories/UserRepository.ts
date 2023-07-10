import query from '../database';

class UserRepository {
  async findAll() {
    return await query('SELECT * FROM users;');
  }
}

export default new UserRepository();
