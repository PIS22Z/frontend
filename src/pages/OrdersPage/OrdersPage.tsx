import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import cartImg from '../../assets/cart.svg';
import { RootState } from '../../redux/store';
import Orders from './Orders';
import * as Styled from './OrdersPage.styles';

const OrdersPage = () => {
    const navigate = useNavigate();
    const { products: selectedProducts } = useSelector(
        (state: RootState) => state.products
    );

    const handleBackClick = () => navigate(-1);

    const handleStartClick = () => navigate('/');

    return (
        <Styled.Container>
            <Styled.Title>Orders</Styled.Title>
            <Styled.BackArrow onClick={handleBackClick} />
            {selectedProducts.length > 0 ? (
                <Orders />
            ) : (
                <>
                    <Styled.Image src={cartImg} alt="cart" />
                    <Styled.ImageTitle>No orders yet</Styled.ImageTitle>
                    <Styled.ImageDesc>
                        Hit the button below
                        <br />
                        to Create and order
                    </Styled.ImageDesc>
                    <Styled.StartButton
                        variant="contained"
                        onClick={handleStartClick}
                    >
                        Start ordering
                    </Styled.StartButton>
                </>
            )}
        </Styled.Container>
    );
};

export default OrdersPage;
