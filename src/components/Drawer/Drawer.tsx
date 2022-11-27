import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Button, Divider, Drawer as DrawerMui } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import * as Styled from './Drawer.styles';

const Drawer = () => {
    const [active, setActive] = useState(false);

    return (
        <>
            <MenuIcon onClick={() => setActive(true)} />
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
