import axios from 'axios';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

type OrderStatus = {
    id: string;
    restaurantId: string;
    userId: string;
    items: {
        productId: string;
        quantity: number;
    }[];
    amount: number;
    deliveryDetails: {
        address: string;
    };
    status: string;
};

export const useOrderStatus = (orderId: string | undefined) => {
    const {
        data: orderResponse,
        isLoading,
        refetch,
    } = useQuery(
        'orderStatus',
        () => axios.get(`/api/orders/${orderId}`).then((response) => response),
        {
            staleTime: Infinity,
        }
    );
    const orderStatus = orderResponse
        ? (orderResponse.data as OrderStatus)
        : null;

    useEffect(() => {
        const statusInterval = setInterval(() => {
            refetch();
        }, 5000);

        return () => clearInterval(statusInterval);
    }, []);

    return { orderStatus, isLoading };
};
