import Drawer from '../../components/Drawer';
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
        </Styled.Container>
    );
};

export default HomePage;
