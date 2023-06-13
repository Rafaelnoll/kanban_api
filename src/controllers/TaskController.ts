import TasksRepository from '../repositories/TasksRepository';
import { Request, Response } from 'express';

class TaskController {
  index(request: Request, response: Response) {
    response.send(TasksRepository.findAll());
  }
}

export default new TaskController();
