import axios from 'axios';
import { TaskObjTypes } from 'src/components/TaskModal/TaskModal';

export const getTodos = async () => {
    try {
        const { data } = await axios.get('http://localhost:3000/todos');
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
