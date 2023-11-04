import { useEffect, useState } from 'react';
import { getTodos } from 'src/api/todos';
import { TaskTab } from 'src/components/Tasks/TaskList';

const Home = () => {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        getTodos().then((data) => setTodos(data));
    }, []);

    return (
        <div className=" h-full">
            <TaskTab todos={todos} />
        </div>
    );
};

export default Home;
