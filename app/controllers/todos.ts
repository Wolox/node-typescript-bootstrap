const { getAllTodos } = require('../services/todos');

exports.getTodos = (_: any, res: { send: (arg0: any) => void; }, next: any) =>
  getAllTodos()
    .then((todos: any) => res.send(todos))
    .catch(next);
