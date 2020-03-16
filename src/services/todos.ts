import axios from 'axios';
import config from '../config';

export const BASE_URL = config.todos.baseURL as string;

const client = axios.create({
  baseURL: BASE_URL,
  responseType: 'json'
});

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export async function getAllTodos(): Promise<Todo[]> {
  const response = await client.get<Todo[]>('todos');
  return response.data;
}

export default {
  getAllTodos
};
