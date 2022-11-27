import { Route, Routes } from 'react-router-dom';
import Drawer from '../components/Drawer';
import HomePage from '../pages/HomePage';

const App = () => {
    return (
        <>
            <Drawer />
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </>
    );
};

export default App;
