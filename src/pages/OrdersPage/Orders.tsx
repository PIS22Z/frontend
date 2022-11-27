import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, ButtonGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { addProduct, removeProduct } from '../../redux/reducers/productSlice';
import { RootState } from '../../redux/store';
import * as Styled from './Orders.styles';

const Orders = () => {
    const { products: selectedProducts } = useSelector(
        (state: RootState) => state.products
    );
    const dispatch = useDispatch();

    const handleSubmit = () => {
        /**TODO:IMPLEMENT SUBMITTING */
    };

    return (
        <Styled.Container>
            {selectedProducts.map(({ id, name, price, count }) => (
                <Styled.Paper elevation={3} key={id}>
                    <Styled.Badge badgeContent={count} color="primary" />
                    <Styled.TextWrapper>
                        <Styled.Title>{name}</Styled.Title>
                        <Styled.Text>{price * count}$</Styled.Text>
                    </Styled.TextWrapper>

                    <ButtonGroup>
                        <Button
                            onClick={() => dispatch(removeProduct({ id: id }))}
                        >
                            <RemoveIcon fontSize="small" />
                        </Button>
                        <Button
                            onClick={() =>
                                dispatch(
                                    addProduct({ id: id, name, price: price })
                                )
                            }
                        >
                            <AddIcon fontSize="small" />
                        </Button>
                    </ButtonGroup>
                </Styled.Paper>
            ))}
            <Styled.SubmitButton variant="contained" onClick={handleSubmit}>
                Complete order
            </Styled.SubmitButton>
        </Styled.Container>
    );
};
export default Orders;
