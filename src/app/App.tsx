import { Route, Routes } from 'react-router-dom';
import 'swiper/css/bundle';

import HomePage from '../pages/HomePage';
import OrdersPage from '../pages/OrdersPage';

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/orders" element={<OrdersPage />} />
            </Routes>
        </>
    );
};

export default App;
