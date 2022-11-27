import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Drawer from '../../components/Drawer';
import ProductsList from '../../components/ProductsList';
import { RootState } from '../../redux/store';
import * as Styled from './Homepage.styles';

const HomePage = () => {
    const { products: selectedProducts } = useSelector(
        (state: RootState) => state.products
    );

    return (
        <Styled.Container>
            <Drawer />
            <Styled.Title>
                Delicious
                <br />
                food for you
            </Styled.Title>
            <Styled.TextField label="Search" variant="filled" />
            <ProductsList />
        </Styled.Container>
    );
};

export default HomePage;
