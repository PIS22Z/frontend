import { Route, Routes } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import KitchenPage from '../pages/KitchenPage';
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
                <Route
                    path="/kitchen/:restaurantId"
                    element={<KitchenPage />}
                />
            </Routes>
        </>
    );
};

export default App;
