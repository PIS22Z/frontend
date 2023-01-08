import { CircularProgress } from '@mui/material';

import * as Styled from './Loader.styles';

const Loader = () => {
    return (
        <Styled.LoaderWrapper>
            <CircularProgress />
        </Styled.LoaderWrapper>
    );
};

export default Loader;
