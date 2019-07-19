import rp from 'request-promise';
const { baseUrl } = require('../../config').todos;

export const getAllTodos = () => rp({ uri: `${baseUrl}/todos`, json: true });
