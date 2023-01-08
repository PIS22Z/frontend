import { CircularProgress } from '@mui/material';

import * as Styled from './Loader.styles';

type Props = {
    description?: string;
};

const Loader = ({ description }: Props) => {
    return (
        <Styled.LoaderWrapper>
            <CircularProgress />
            {description && <span>{description}</span>}
        </Styled.LoaderWrapper>
    );
};

export default Loader;
