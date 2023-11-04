import axios from 'axios';

export const getTodos = async () => {
    try {
        const { data } = await axios.get('http://localhost:3000/todos');
        return data;
    } catch (error) {
        console.log(error);
    }
};
