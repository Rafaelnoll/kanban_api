import IRepository from '../interfaces/Repository';
import ITask from '../interfaces/Task';
import query from '../database';
class TasksRepository implements IRepository<ITask> {
  async findAll() {
    return await query('SELECT * FROM tasks');
  }

  async create({ title, description, status, category_id }: ITask) {
    const [row] = await query(
      `
      INSERT INTO tasks(title, description, status, category_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `,
      [title, description, status, category_id],
    );
    return row;
  }
}

export default new TasksRepository();
