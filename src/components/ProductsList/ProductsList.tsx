import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

import productImg from '../../assets/productExample.jpg';
import { Product } from '../../models/product.model';
import { addProduct } from '../../redux/reducers/productSlice';
import * as Styled from './ProductsList.styles';

const ProductsList = () => {
    const productsMock: Product[] = [
        {
            id: 1,
            name: 'Hawaiian pizza1',
            price: 20,
        },
        {
            id: 2,
            name: 'Hawaiian pizza2',
            price: 20,
        },
        {
            id: 3,
            name: 'Hawaiian pizza3',
            price: 20,
        },
        {
            id: 4,
            name: 'Hawaiian pizza4',
            price: 20,
        },
        {
            id: 5,
            name: 'Hawaiian pizza5',
            price: 20,
        },
    ];
    const dispatch = useDispatch();

    const handleAddProduct = (product: Product) => {
        dispatch(addProduct(product));
    };

    return (
        <Styled.SwiperWrapper
            spaceBetween={10}
            slidesPerView={1.2}
            freeMode={true}
            modules={[FreeMode]}
        >
            {productsMock.map(({ id, name, price }) => (
                <Styled.Slide key={name}>
                    <img src={productImg} alt={name} />
                    <Styled.TextWrapper>
                        <Styled.Name>{name}</Styled.Name>
                        <Styled.Price>{price}$</Styled.Price>
                        <Button
                            variant="contained"
                            onClick={() =>
                                handleAddProduct({
                                    id: id,
                                    name: name,
                                    price: price,
                                })
                            }
                        >
                            Add to cart
                        </Button>
                    </Styled.TextWrapper>
                </Styled.Slide>
            ))}
        </Styled.SwiperWrapper>
    );
};

export default ProductsList;
