import styled from '@emotion/styled';
import { TextField as TextFieldMui } from '@mui/material';

export const Container = styled.section`
    padding: 60px 40px;
`;

export const Title = styled.span`
    margin-top: 30px;
    font-weight: 700;
    font-size: 34px;
    line-height: 41px;
    font-family: 'Satisfy', cursive;
`;

export const TextField = styled(TextFieldMui)`
    margin-top: 40px;
    && label {
        color: rgba(0, 0, 0, 0.6);
        font-weight: bold;
    }
    div {
        border-radius: 20px;
        ::before,
        ::after {
            display: none;
        }
    }
`;
