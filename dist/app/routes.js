"use strict";
const { healthCheck } = require('./controllers/healthCheck');
const { getUsers, getUserById, createUser } = require('./controllers/users');
const { getTodos } = require('./controllers/todos');
exports.init = (app) => {
    app.get('/health', healthCheck);
    app.get('/users', getUsers);
    app.post('/users', createUser);
    app.get('/users/:id', getUserById);
    app.get('/todos', getTodos);
};
