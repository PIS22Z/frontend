import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';

export const SwiperWrapper = styled(Swiper)`
    margin-top: 60px;
    padding: 30px;
`;

export const Slide = styled(SwiperSlide)`
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    width: 200px !important;
    height: 270px;
    background-color: #ffffff;
    box-shadow: 0px 10px 23px -12px rgba(66, 68, 90, 1);
    justify-content: space-between;
    border-radius: 20px;
    img {
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
    }
`;

export const TextWrapper = styled.div`
    display: flex;
    gap: 15px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Name = styled.span`
    font-weight: bold;
    font-size: 22px;
`;

export const Price = styled.span`
    font-weight: bold;
    font-size: 17px;
`;
