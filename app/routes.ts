const { healthCheck } = require('./controllers/healthCheck');
const { getUsers, getUserById, createUser } = require('./controllers/users');
const { getTodos } = require('./controllers/todos');

exports.init = (app: { get: { (arg0: string, arg1: any): void; (arg0: string, arg1: any): void; (arg0: string, arg1: any): void; (arg0: string, arg1: any): void; }; post: (arg0: string, arg1: any) => void; }) => {
  app.get('/health', healthCheck);
  app.get('/users', getUsers);
  app.post('/users', createUser);
  app.get('/users/:id', getUserById);
  app.get('/todos', getTodos);
};
