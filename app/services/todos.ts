import rp from 'request-promise';
import config from '../../config';

const { baseUrl } = config.todos;

export const getAllTodos = () => rp({ uri: `${baseUrl}/todos`, json: true });
