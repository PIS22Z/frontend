import { useParams } from 'react-router-dom';

import Loader from '../../components/Loader';
import { useOrderStatus } from '../../hooks/useOrderStatus';
import * as Styled from './StatusPage.styles';

export const statusMap = {
    PAID: 'Your order is being processed',
    ACCEPTED: 'Restaurant accepted your order. Looking for a delivery...',
    REJECTED: "Your order's been rejected",
    READY_TO_DELIVER: 'Your food is ready. Waiting for delivery...',
    COURIER_ASSIGNED: "Courier's been found",
    DELIVERY_IN_PROGRESS: "Courier's driving to your destination",
    DELIVERED: 'Order finished. Enjoy your meal!',
};

const StatusPage = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const { isLoading, orderStatus } = useOrderStatus(orderId);

    return !isLoading ? (
        <Styled.StatusContainer>
            <h3>Order status</h3>
            {orderStatus?.status !== 'REJECTED' &&
                orderStatus?.status !== 'DELIVERED' && <Loader />}
            <span>{orderStatus && statusMap[orderStatus.status]}</span>
        </Styled.StatusContainer>
    ) : (
        <Loader />
    );
};
export default StatusPage;
