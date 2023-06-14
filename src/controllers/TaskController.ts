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

    if (!task) {
      return response.status(404).json({ error: 'Task not found!' });
    }

    response.status(200).json(task);
  }

  async store(request: Request, response: Response) {
    const { title, description, category_id } = request.body;

    if (!title) {
      return response.status(400).json({ error: 'Task title is required' });
    }

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

    if (!taskUpdated) {
      return response.status(404).json({ error: 'Task not found!' });
    }

    response.status(201).json(taskUpdated);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await TasksRepository.delete(id);
    response.sendStatus(204);
  }

  async listAllByCategory(request: Request, response: Response) {
    const { category_id } = request.params;

    const tasks = await TasksRepository.findAllByCategory(category_id);

    if (tasks.length === 0) {
      return response.status(404).json({ error: 'Tasks not found' });
    }

    response.status(200).json(tasks);
  }
}

export default new TaskController();
