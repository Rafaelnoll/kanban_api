import TasksRepository from '../repositories/TasksRepository';

class TaskController {
  index() {
    return TasksRepository.findAll();
  }
}

export default new TaskController();
