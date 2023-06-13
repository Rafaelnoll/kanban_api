import tasks from '../mock/Tasks';
import IRepository from '../interfaces/Repository';
import ITask from '../interfaces/Task';
class TasksRepository implements IRepository<ITask> {
  findAll() {
    return tasks;
  }
}

export default new TasksRepository();
