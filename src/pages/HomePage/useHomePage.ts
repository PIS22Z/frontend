import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { startOrder } from '../../redux/reducers/productSlice';

const useHomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .post('/api/orders', {
                userId: uuidv4(),
                items: [
                    {
                        productId: uuidv4(),
                        quantity: 1,
                    },
                ],
            })
            .then((response) => {
                dispatch(startOrder({ id: response.data.id }));
            });
    }, []);
};

export default useHomePage;
