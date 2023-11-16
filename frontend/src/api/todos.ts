import axios from 'axios';
import { TaskObjTypes } from 'src/components/TaskModal/TaskModal';

export const getTodos = async () => {
    try {
        const { data } = await axios.get('http://localhost:8080/todos');
        return data;
    } catch (error) {
        console.log(error);
    }
};

//TODO: On the backend return response in body containing POSTED data

export const postTodo = async (todoData: TaskObjTypes) => {
    try {
        const postedData = await axios.post('http://localhost:3000/todos', todoData);
        return postedData;
    } catch (error) {
        console.log('POST status', error);
    }
};

export const patchTodo = async (todoData: Partial<TaskObjTypes>, id: number | undefined) => {
    try {
        const patchedData = await axios.patch(`http://localhost:3000/todos/${id}`, todoData);

        return patchedData;
    } catch (error) {
        console.log('PATCH status', error);
    }
};

export const deleteTodo = async (id: number | undefined) => {
    try {
        const deletedData = await axios.delete(`http://localhost:3000/todos/${id}`);
        return deletedData;
    } catch (error) {
        console.log('Error:', error);
    }
};
