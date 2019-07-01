const { getAllTodos } = require('../services/todos');

exports.getTodos = (_, res, next) =>
  getAllTodos()
    .then(todos => res.send(todos))
    .catch(next);
