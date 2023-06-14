import { Client } from 'pg';

const client = new Client({
  host: process.env.PG_HOST,
  port: 5432,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

client.connect();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const query = async (query: string, values?: any[]) => {
  const { rows } = await client.query(query, values);
  return rows;
};

export default query;
