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

            <ProductsList />
        </Styled.Container>
    );
};

export default HomePage;
