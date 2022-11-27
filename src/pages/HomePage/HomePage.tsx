import Drawer from '../../components/Drawer';
import ProductsList from '../../components/ProductsList';
import * as Styled from './Homepage.styles';

const HomePage = () => {
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
