import RestaurantsList from '../../components/RestaurantsList';
import * as Styled from './Homepage.styles';

const HomePage = () => {
    return (
        <Styled.Container>
            <Styled.Title>
                Delicious
                <br />
                food for you
            </Styled.Title>

            <RestaurantsList />
        </Styled.Container>
    );
};

export default HomePage;
