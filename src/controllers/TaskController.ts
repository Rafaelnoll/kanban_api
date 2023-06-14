import { Request, Response } from 'express';
import TasksRepository from '../repositories/TasksRepository';

class TaskController {
  async index(request: Request, response: Response) {
    const tasks = await TasksRepository.findAll();
    response.status(200).json(tasks);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const task = await TasksRepository.findById(id);
    response.status(200).json(task);
  }

  async store(request: Request, response: Response) {
    const { title, description, category_id } = request.body;

    const taskCreated = await TasksRepository.create({
      title,
      description,
      status: 'DO',
      category_id,
    });
    response.status(201).json(taskCreated);
  }

  async update(request: Request, response: Response) {
    const { title, description, status, category_id } = request.body;
    const { id } = request.params;

    const taskUpdated = await TasksRepository.update(
      {
        title,
        description,
        status,
        category_id,
      },
      id,
    );
    response.status(201).json(taskUpdated);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await TasksRepository.delete(id);
    response.sendStatus(204);
  }
}

export default new TaskController();
