import { Request, Response } from 'express';
import TasksRepository from '../repositories/TasksRepository';
import { TaskStatus } from '../interfaces/Task';

interface Properties {
  possibleStatusTypes: TaskStatus[];
}

class TaskController implements Properties {
  possibleStatusTypes: TaskStatus[];

  constructor() {
    this.possibleStatusTypes = ['DO', 'DOING', 'DONE'];

    this.store = this.store.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }

  async index(request: Request, response: Response) {
    const user = request.user;

    const tasks = await TasksRepository.findAll(user.id);
    response.status(200).json(tasks);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const user = request.user;

    const task = await TasksRepository.findById(id, user.id);

    if (!task) {
      return response.status(404).json({ error: 'Tarefa não encontrada!' });
    }

    response.status(200).json(task);
  }

  async store(request: Request, response: Response) {
    const { title, description, status, category_id } = request.body;
    const user = request.user;

    if (!title) {
      return response
        .status(400)
        .json({ error: 'O título da tarefa é obrigatório!' });
    }

    if (status && !this.possibleStatusTypes.includes(status)) {
      return response
        .status(400)
        .json({ error: "O campo de status deve ser 'DO', 'DONE' ou 'DOING'" });
    }

    const taskCreated = await TasksRepository.create({
      title,
      description,
      status,
      category_id,
      user_id: user?.id,
    });
    response.status(201).json(taskCreated);
  }

  async update(request: Request, response: Response) {
    const { title, description, status, category_id } = request.body;
    const { id } = request.params;
    const user = request.user;

    const taskUpdated = await TasksRepository.update(
      {
        title,
        description,
        status,
        category_id,
        user_id: user.id,
      },
      id,
    );

    if (!taskUpdated) {
      return response.status(404).json({ error: 'Tarefa não encontrada!' });
    }

    response.status(201).json(taskUpdated);
  }

  async updateStatus(request: Request, response: Response) {
    const { status } = request.body;
    const { id } = request.params;

    if (!status) {
      return response.status(400).json({ error: 'Status é obrigatório!' });
    }

    if (status && !this.possibleStatusTypes.includes(status)) {
      return response
        .status(400)
        .json({ error: "O campo de status deve ser 'DO', 'DONE' ou 'DOING'" });
    }

    const taskUpdated = await TasksRepository.updateStatus(
      {
        status,
      },
      id,
    );

    if (!taskUpdated) {
      return response
        .status(500)
        .json({ error: 'Não foi possível atualizar a tarefa!' });
    }

    response.status(201).json(taskUpdated);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const user = request.user;

    await TasksRepository.delete(id, user.id);
    response.sendStatus(204);
  }

  async listAllByCategory(request: Request, response: Response) {
    const { category_id } = request.params;
    const user = request.user;

    if (!user) {
      return response.status(401).json({ error: 'Não autorizado!' });
    }

    const tasks = await TasksRepository.findAllByCategory({
      category_id,
      user_id: user.id,
    });

    if (tasks.length === 0) {
      return response.status(404).json({ error: 'Tarefa não encontrada!' });
    }

    response.status(200).json(tasks);
  }
}

export default new TaskController();
