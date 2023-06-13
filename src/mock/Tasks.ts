import ITask from '../interfaces/Task';

export default [
  {
    title: 'Title#01',
    description: 'Description#01',
    status: 'do',
    categories: ['Sport', 'Health'],
  },
  {
    title: 'Title#02',
    description: 'Description#02',
    status: 'do',
    categories: ['Programming', 'Javascript'],
  },
  {
    title: 'Title#03',
    description: 'Description#03',
    status: 'doing',
    categories: ['Web', 'Freelance'],
  },
  {
    title: 'Title#04',
    description: 'Description#04',
    status: 'done',
    categories: ['Programming', 'Web', 'Work'],
  },
] as unknown as ITask[];
