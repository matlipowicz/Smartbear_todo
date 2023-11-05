// import { getTodos } from 'src/api/todos';
import { TaskTab } from 'src/components/Tasks/TaskList';

const Home = () => {
    // const [todos, setTodos] = useState([]);
    // useEffect(() => {
    //     getTodos().then((data) => setTodos(data));
    // }, []);

    // console.log(value);

    return (
        <div className=" h-full">
            <TaskTab />
        </div>
    );
};

export default Home;
