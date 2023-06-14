import IRepository from '../interfaces/Repository';
import ITask from '../interfaces/Task';
import query from '../database';
class TasksRepository implements IRepository<ITask> {
  async findAll() {
    return await query('SELECT * FROM tasks');
  }
}

export default new TasksRepository();
