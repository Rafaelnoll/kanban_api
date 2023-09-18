import IRepository from '../interfaces/Repository';
import ITask from '../interfaces/Task';
import query from '../database';

interface FindAllByCategoryProps {
  category_id: string;
  user_id: string;
}

class TasksRepository implements IRepository<ITask> {
  async findAll(user_id: string) {
    return await query(
      `
      SELECT tasks.*, categories.name as category_name FROM tasks
      LEFT JOIN categories ON categories.id = category_id
      WHERE tasks.user_id = $1
    `,
      [user_id],
    );
  }

  async findById(id: string, user_id: string) {
    const [row] = await query(
      `
      SELECT tasks.*, categories.name as category_name FROM tasks
      LEFT JOIN categories ON categories.id = category_id
      WHERE tasks.id = $1 AND tasks.user_id = $2`,
      [id, user_id],
    );
    return row;
  }

  async findAllByCategory({ category_id, user_id }: FindAllByCategoryProps) {
    const tasks = await query(
      `
      SELECT tasks.*, categories.name as category_name FROM tasks
      LEFT JOIN categories ON categories.id = category_id
      WHERE tasks.category_id = $1 AND categories.user_id = $2`,
      [category_id, user_id],
    );
    return tasks;
  }

  async create({
    title,
    description,
    status = 'DO',
    category_id = null,
    user_id,
  }: ITask) {
    const [row] = await query(
      `
      INSERT INTO tasks(title, description, status, category_id, user_id)
      VALUES($1, $2, $3, $4, $5)
      RETURNING tasks.* , (
        SELECT name FROM categories WHERE categories.id = tasks.category_id
      ) AS category_name;
    `,
      [
        title,
        description,
        status,
        category_id === null ? null : category_id,
        user_id,
      ],
    );
    return row;
  }

  async update(
    { title, description, status = 'DO', category_id = null, user_id }: ITask,
    id: string,
  ) {
    const [row] = await query(
      `
      UPDATE tasks
      SET title = $2, description = $3, status = $4, category_id = $5, user_id = $6
      WHERE id = $1
      RETURNING tasks.* , (
        SELECT name FROM categories WHERE categories.id = tasks.category_id
      ) AS category_name;
      `,
      [
        id,
        title,
        description,
        status,
        category_id === null ? null : category_id,
        user_id,
      ],
    );

    return row;
  }

  async delete(id: string, user_id: string) {
    await query(
      `
      DELETE FROM tasks
      WHERE id = $1 AND user_id = $2
    `,
      [id, user_id],
    );
  }
}

export default new TasksRepository();
