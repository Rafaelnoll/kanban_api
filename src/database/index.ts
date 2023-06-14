import { Client } from 'pg';

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'kanban',
});

client.connect();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const query = async (query: string, values?: any[]) => {
  const { rows } = await client.query(query, values);
  return rows;
};

export default query;
