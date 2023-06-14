import { Request, Response } from 'express';
import TasksRepository from '../repositories/TasksRepository';

class TaskController {
  async index(request: Request, response: Response) {
    const tasks = await TasksRepository.findAll();
    response.json(tasks);
  }

  async store(request: Request, response: Response) {
    const { title, description, category_id } = request.body;

    const taskCreated = await TasksRepository.create({
      title,
      description,
      status: 'DO',
      category_id,
    });
    response.json(taskCreated);
  }
}

export default new TaskController();
