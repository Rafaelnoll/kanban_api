import { Request, Response } from 'express';

import CategoriesRepository from '../repositories/CategoriesRepository';

class CategoryController {
  async index(request: Request, response: Response) {
    const categories = CategoriesRepository.findAll();
    response.send(categories);
  }
}

export default new CategoryController();
