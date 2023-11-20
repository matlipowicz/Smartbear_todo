import { Route, Routes } from 'react-router-dom';

import { TaskModal } from './components/TaskModal/TaskModal';
import { TaskDetails } from './components/Tasks/TaskDetails';
import { MenuProvider } from './context/MenuContext/MenuContext';
import { ModalProvider } from './context/ModalContext/ModalContext';
import { TasksProvider } from './context/ModalContext/TasksContext';
import { MainLayout } from './layout/MainLayout';
import AllTasks from './pages/AllTasks/AllTasks';
import { Calendar } from './pages/Calendar/Calendar';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';

import 'react-big-calendar/lib/css/react-big-calendar.css';

function App() {
    return (
        <TasksProvider>
            <MenuProvider>
                <ModalProvider>
                    <MainLayout>
                        <TaskModal />
                        <Routes>
                            <Route path="/">
                                <Route index element={<Home />} />
                                <Route path=":id" element={<TaskDetails />} />
                            </Route>
                            <Route path="/calendar">
                                <Route index element={<Calendar />} />
                                <Route path=":id" element={<TaskDetails />} />
                            </Route>
                            <Route path="/all-tasks">
                                <Route index element={<AllTasks />} />
                                <Route path=":id" element={<TaskDetails />} />
                            </Route>

                            <Route path="/profile" element={<Profile />} />
                        </Routes>
                    </MainLayout>
                </ModalProvider>
            </MenuProvider>
        </TasksProvider>
    );
}

export default App;
