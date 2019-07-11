const rp = require('request-promise');
const { baseUrl } = require('../../config').todos;

exports.getAllTodos = () => rp({ uri: `${baseUrl}/todos`, json: true });
