import { Request, Response } from 'express';
import TasksRepository from '../repositories/TasksRepository';

class TaskController {
  async index(request: Request, response: Response) {
    const tasks = await TasksRepository.findAll();
    response.json(tasks);
  }
}

export default new TaskController();
