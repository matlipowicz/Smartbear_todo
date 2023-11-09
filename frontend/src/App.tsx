import { Route, Routes } from 'react-router-dom';

import { TaskModal } from './components/TaskModal/TaskModal';
import { TaskDetails } from './components/Tasks/TaskDetails';
import { MenuProvider } from './context/MenuContext/MenuContext';
import { ModalProvider } from './context/ModalContext/ModalContext';
import { TasksProvider } from './context/ModalContext/TasksContext';
import { MainLayout } from './layout/MainLayout';
import AllTasks from './pages/AllTasks/AllTasks';
import Calendar from './pages/Calendar/Calendar';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';

function App() {
    return (
        <TasksProvider>
            <MenuProvider>
                <ModalProvider>
                    <MainLayout>
                        <TaskModal />
                        <Routes>
                            <Route path="/tasks">
                                <Route index element={<Home />} />
                                <Route path=":id" element={<TaskDetails />} />
                            </Route>
                            <Route path="/calendar" element={<Calendar />} />
                            <Route path="/all-tasks" element={<AllTasks />} />
                            <Route path="/profile" element={<Profile />} />
                        </Routes>
                    </MainLayout>
                </ModalProvider>
            </MenuProvider>
        </TasksProvider>
    );
}

export default App;
