import IRepository from '../interfaces/Repository';
import ITask from '../interfaces/Task';
import query from '../database';
class TasksRepository implements IRepository<ITask> {
  async findAll() {
    return await query(`
      SELECT tasks.*, categories.name as category_name FROM tasks
      LEFT JOIN categories ON categories.id = category_id
    `);
  }

  async findById(id: string) {
    const [row] = await query(
      `
      SELECT tasks.*, categories.name as category_name FROM tasks
      LEFT JOIN categories ON categories.id = category_id
      WHERE tasks.id = $1`,
      [id],
    );
    return row;
  }

  async findAllByCategory(category_id: string) {
    const tasks = await query(
      `
      SELECT tasks.*, categories.name as category_name FROM tasks
      LEFT JOIN categories ON categories.id = category_id
      WHERE tasks.category_id = $1`,
      [category_id],
    );
    return tasks;
  }

  async create({
    title,
    description,
    status = 'DO',
    category_id = null,
  }: ITask) {
    const [row] = await query(
      `
      INSERT INTO tasks(title, description, status, category_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `,
      [title, description, status, category_id === null ? null : category_id],
    );
    return row;
  }

  async update(
    { title, description, status = 'DO', category_id = null }: ITask,
    id: string,
  ) {
    const [row] = await query(
      `
      UPDATE tasks
      SET title = $2, description = $3, status = $4, category_id = $5
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
      ],
    );

    return row;
  }

  async delete(id: string) {
    await query('DELETE FROM tasks WHERE id = $1', [id]);
  }
}

export default new TasksRepository();
