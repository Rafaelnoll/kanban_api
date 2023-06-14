import { Request, Response } from 'express';

import CategoriesRepository from '../repositories/CategoriesRepository';

class CategoryController {
  async index(request: Request, response: Response) {
    const categories = await CategoriesRepository.findAll();
    response.status(200).json(categories);
  }

  async store(request: Request, response: Response) {
    const { name } = request.body;

    const category = await CategoriesRepository.create(name);
    response.status(201).json(category);
  }
}

export default new CategoryController();
