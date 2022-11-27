import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Divider, Drawer as DrawerMui } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../../redux/store';
import * as Styled from './Drawer.styles';

const Drawer = () => {
    const [active, setActive] = useState(false);
    const { products } = useSelector((state: RootState) => state.products);
    const navigate = useNavigate();

    const handleBadgeClick = () => navigate('/orders');
    return (
        <>
            <Styled.MenuWrapper>
                <MenuIcon onClick={() => setActive(true)} />
                <Styled.Badge
                    badgeContent={products.length > 0 ? products.length : '0'}
                    color="primary"
                    onClick={handleBadgeClick}
                >
                    <ShoppingCartIcon />
                </Styled.Badge>
            </Styled.MenuWrapper>
            <DrawerMui open={active} onClose={() => setActive(false)}>
                <Styled.Wrapper>
                    <Styled.ItemLink to="/">
                        <Styled.Item>
                            <HomeOutlinedIcon /> Home
                        </Styled.Item>
                    </Styled.ItemLink>
                    <Divider />
                    <Styled.ItemLink to="/orders">
                        <Styled.Item>
                            <ShoppingBagOutlinedIcon /> Orders
                        </Styled.Item>
                    </Styled.ItemLink>
                    <Divider />
                    <Styled.ItemLink to="/history">
                        <Styled.Item>
                            <ListAltOutlinedIcon /> History
                        </Styled.Item>
                    </Styled.ItemLink>
                </Styled.Wrapper>
            </DrawerMui>
        </>
    );
};

export default Drawer;
