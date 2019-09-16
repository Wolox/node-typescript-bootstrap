import rp, { RequestPromise } from 'request-promise';
import config from '../../config';

const { baseUrl } = config.todos;

export const getAllTodos = (): RequestPromise => rp({ uri: `${baseUrl}/todos`, json: true });
