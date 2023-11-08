// import { getTodos } from 'src/api/todos';
import { TaskTab } from 'src/components/Tasks/TaskList';
import { useTasksContext } from 'src/context/ModalContext/TasksContext';

import Component_4 from '../../../public/graphics/Component_4.svg?react';

const Home = () => {
    // const [todos, setTodos] = useState([]);
    // useEffect(() => {
    //     getTodos().then((data) => setTodos(data));
    // }, []);

    // console.log(value);

    const { tasks } = useTasksContext();

    return (
        <div className=" h-full">
            {tasks.length > 0 ? (
                <TaskTab />
            ) : (
                <div className="h-full w-full flex justify-start items-center flex-col gap-4 ">
                    <Component_4 />
                    <p className="text-2xl font-normal text-center lg:text-3xl	">What do you want to do today?</p>
                    <p className="font-light md:text-lg lg:text-xl">
                        Tap <span className="text-bright-purple-300">+</span> to add task
                    </p>
                </div>
            )}
        </div>
    );
};

export default Home;
