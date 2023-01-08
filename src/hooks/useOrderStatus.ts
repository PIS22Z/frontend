import axios from 'axios';
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

export const useOrderStatus = (orderId: string) => {
    const { data: orderResponse, isLoading } = useQuery(
        'orderStatus',
        () => axios.get(`/api/orders/${orderId}`).then((response) => response),
        {
            staleTime: Infinity,
        }
    );
    const orderStatus = orderResponse
        ? (orderResponse.data as OrderStatus)
        : null;

    return { orderStatus, isLoading };
};
