import { Route, Routes } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import PaymentPage from '../pages/PaymentPage';
import ProductsPage from '../pages/ProductsPage';
import StatusPage from '../pages/StatusPage';

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/restaurant/:restaurantId"
                    element={<ProductsPage />}
                />
                <Route path="/payment/:orderId" element={<PaymentPage />} />
                <Route path="/status/:orderId" element={<StatusPage />} />
            </Routes>
        </>
    );
};

export default App;
