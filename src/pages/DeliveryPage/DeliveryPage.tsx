import { Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { v4 as uuidv4 } from 'uuid';

import Loader from '../../components/Loader';
import * as Styled from './DeliveryPage.styles';

type Order = {
    id: string;
    restaurantId: string;
    restaurantName: string;
    restaurantAddress: string;
    deliveryRate: number;
    deliveryDetails: {
        address: string;
    };
};

const DeliveryPage = () => {
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
    const [orderShown, setOrderShown] = useState(false);
    const [status, setStatus] = useState('');
    const { isLoading, mutateAsync: mutateGetClosestOffers } = useMutation(
        'getOrders',
        () =>
            axios
                .get(
                    '/api/deliveries/offer?courierAddress=Puławska 113a, 02-707 Warszawa'
                )
                .then((response) => response),
        {
            onSuccess: (response) => {
                setCurrentOrder(response.data);
                setOrderShown(true);
            },
        }
    );
    const { mutateAsync: mutateGetOrder } = useMutation(
        'getOrder',
        (id: string) => axios.get(`/api/orders/${id}`),
        {
            onSuccess: (response) => setStatus(response.data.status),
        }
    );
    const { mutateAsync: mutateAccept } = useMutation(
        'acceptOrder',
        (id: string) =>
            axios.put(`/api/deliveries/${id}/accept`, {
                courierId: uuidv4(),
            }),
        {
            onSuccess: (response) => mutateGetOrder(response.data.id),
        }
    );
    const { mutateAsync: mutateStart } = useMutation(
        'startOrder',
        (id: string) =>
            axios.put(`/api/deliveries/${id}/start`, {
                courierId: uuidv4(),
            }),
        {
            onSuccess: (response) => mutateGetOrder(response.data.id),
        }
    );
    const { mutateAsync: mutateFinish } = useMutation(
        'finishOrder',
        (id: string) =>
            axios.put(`/api/deliveries/${id}/finish`, {
                courierId: uuidv4(),
            }),
        {
            onSuccess: () => handleRejectOffer(),
        }
    );

    const handleAcceptOrder = () => {
        currentOrder && mutateAccept(currentOrder.id);
    };

    const handleStartDelivery = () => {
        currentOrder && mutateStart(currentOrder.id);
    };

    const handleFinishDelivery = () => {
        currentOrder && mutateFinish(currentOrder.id);
    };

    const handleRejectOffer = () => {
        setOrderShown(false);
        setCurrentOrder(null);
        mutateGetClosestOffers();
    };

    useEffect(() => {
        const getOrdersInterval = setInterval(() => {
            if (!orderShown && status === '') mutateGetClosestOffers();
        }, 5000);

        return () => clearInterval(getOrdersInterval);
    }, [orderShown, status]);

    return !isLoading && currentOrder ? (
        <Styled.OrderWrapper>
            {orderShown && status === '' ? (
                <>
                    <h3>Order received!</h3>
                    <span>Restaurant name: {currentOrder.restaurantName}</span>
                    <span>
                        Restaurant address: {currentOrder.restaurantAddress}
                    </span>
                    <span>
                        Delivery address: {currentOrder.deliveryDetails.address}
                    </span>
                    <span>Delivery rate: {currentOrder.deliveryRate}</span>
                    <Button variant="contained" onClick={handleAcceptOrder}>
                        Accept order
                    </Button>
                    <Button variant="contained" onClick={handleRejectOffer}>
                        Reject order
                    </Button>
                </>
            ) : (
                <>
                    <h3>Order accepted</h3>
                    <span>Restaurant name: {currentOrder.restaurantName}</span>
                    <span>
                        Restaurant address: {currentOrder.restaurantAddress}
                    </span>
                    <span>
                        Delivery address: {currentOrder.deliveryDetails.address}
                    </span>
                    <span>Delivery rate: {currentOrder.deliveryRate}</span>
                    {status === 'COURIER_ASSIGNED' && (
                        <Button
                            variant="contained"
                            onClick={handleStartDelivery}
                        >
                            Start delivery
                        </Button>
                    )}

                    {status === 'DELIVERY_IN_PROGRESS' && (
                        <Button
                            variant="contained"
                            onClick={handleFinishDelivery}
                        >
                            Finish delivery
                        </Button>
                    )}
                </>
            )}
        </Styled.OrderWrapper>
    ) : (
        <Loader description="Waiting for orders..." />
    );
};

export default DeliveryPage;
