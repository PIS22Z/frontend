import styled from '@emotion/styled';
import { Badge as BadgeMui, Button } from '@mui/material';
import { Paper as PaperMui } from '@mui/material';

export const Container = styled.section`
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const Title = styled.span`
    font-weight: bold;
    font-size: 20px;
`;

export const Text = styled.span``;

export const Paper = styled(PaperMui)`
    position: relative;
    display: flex;
    justify-content: space-between;
    gap: 15px;
    padding: 10px;
`;

export const Badge = styled(BadgeMui)`
    position: absolute;
    top: 0;
    right: 0;
`;

export const SubmitButton = styled(Button)`
    margin-top: 50px;
`;
