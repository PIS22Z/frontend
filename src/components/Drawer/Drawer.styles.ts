import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 70px 30px;
`;

export const MenuWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
`;

export const Item = styled.span`
    display: flex;
    align-items: center;
    gap: 10px;
    color: black;
`;

export const ItemLink = styled(Link)`
    text-decoration: none;
`;
