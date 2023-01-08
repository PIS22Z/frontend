import { useParams } from 'react-router-dom';

import Loader from '../../components/Loader';
import { useOrderStatus } from '../../hooks/useOrderStatus';
import * as Styled from './StatusPage.styles';

const StatusPage = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const { isLoading, orderStatus } = useOrderStatus(orderId);

    return !isLoading ? (
        <Styled.StatusContainer>
            <h3>Order status</h3>
            {orderStatus?.status !== 'REJECTED' &&
                orderStatus?.status !== 'DELIVERED' && <Loader />}
            <span>Order status: {orderStatus?.status}</span>
        </Styled.StatusContainer>
    ) : (
        <Loader />
    );
};
export default StatusPage;
