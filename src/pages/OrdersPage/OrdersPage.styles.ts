import styled from '@emotion/styled';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button } from '@mui/material';

export const Container = styled.section`
    padding: 60px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Title = styled.span`
    font-weight: 600;
    font-size: 18px;
    text-align: center;
`;

export const Image = styled.img`
    width: 100px;
    margin-top: 80px;
`;

export const ImageTitle = styled.span`
    font-weight: bold;
    font-size: 28px;
    margin-left: 10px;
    margin-top: 20px;
`;

export const ImageDesc = styled.span`
    font-size: 17px;
    color: gray;
    margin-top: 5px;
    margin-left: 20px;
`;

export const BackArrow = styled(ArrowBackIosIcon)`
    align-self: baseline;
`;

export const StartButton = styled(Button)`
    margin-top: 100px;
`;
