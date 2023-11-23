import axios from 'axios';
import { TaskObjTypes } from 'src/types/types';

const BASE_URL = 'http://localhost:8080/todos';

export const getTodos = async () => {
    try {
        const { data } = await axios.get(`${BASE_URL}`);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const postTodo = async (todoData: TaskObjTypes) => {
    try {
        const postedData = await axios.post(`${BASE_URL}`, todoData);
        return postedData;
    } catch (error) {
        console.log('POST status', error);
    }
};

export const patchTodo = async (todoData: Partial<TaskObjTypes>, id: number | undefined) => {
    try {
        const patchedData = await axios.patch(`${BASE_URL}/${id}`, todoData);

        return patchedData;
    } catch (error) {
        console.log('PATCH status', error);
    }
};

export const deleteTodo = async (id: number | undefined) => {
    try {
        const deletedData = await axios.delete(`${BASE_URL}/${id}`);
        return deletedData;
    } catch (error) {
        console.log('Error:', error);
    }
};
