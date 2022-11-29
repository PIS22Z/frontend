import { Button } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

import productImg from '../../assets/productExample.jpg';
import { Product } from '../../models/product.model';
import { addProduct } from '../../redux/reducers/productSlice';
import * as Styled from './ProductsList.styles';

const productsMock = [
    {
        id: 1,
        name: 'Hawaiian pizza',
        price: 20,
    },
    {
        id: 2,
        name: 'Random Burger',
        price: 14,
    },
    {
        id: 3,
        name: 'Kebab',
        price: 10,
    },
    {
        id: 4,
        name: 'Pepperoni pizza',
        price: 24,
    },
    {
        id: 5,
        name: 'Chicken soup',
        price: 5,
    },
];

const ProductsList = () => {
    const [products, setProducts] = useState<Product[]>(productsMock);
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');

    const handleAddProduct = (product: Product) => {
        dispatch(addProduct(product));
    };

    const handleSearchChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (e.target.value.length < searchValue.length) {
            setSearchValue('');
            setProducts(productsMock);
        } else {
            setSearchValue(e.target.value);
            setProducts(
                products.filter((product) =>
                    product.name
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                )
            );
        }
    };

    return (
        <>
            <Styled.TextField
                label="Search"
                variant="filled"
                value={searchValue}
                onChange={handleSearchChange}
            />

            <Styled.SwiperWrapper
                spaceBetween={10}
                slidesPerView={1.2}
                freeMode={true}
                modules={[FreeMode]}
            >
                {products.map(({ id, name, price }) => (
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
        </>
    );
};

export default ProductsList;
