import { Request, Response } from 'express';
import TasksRepository from '../repositories/TasksRepository';

class TaskController {
  index(request: Request, response: Response) {
    response.send(TasksRepository.findAll());
  }
}

export default new TaskController();
