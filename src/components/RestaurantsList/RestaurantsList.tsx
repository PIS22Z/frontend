import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import Loader from '../Loader';
import * as Styled from './RestaurantsList.styles';

export type Restaurant = {
    id: string;
    name: string;
    logoUrl: string;
    description: string;
    street: string;
    number: string;
    city: string;
};

const RestaurantsList = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const navigate = useNavigate();
    const { data: restaurantsResponse, isLoading } = useQuery(
        'restaurants',
        () => axios.get('/api/restaurants').then((response) => response)
    );
    useEffect(() => {
        if (restaurantsResponse) setRestaurants(restaurantsResponse.data);
    }, [restaurantsResponse]);

    const handleRowClick = (id: string) => navigate(`/restaurant/${id}`);

    return !isLoading ? (
        <Styled.TableWrapper>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Street</TableCell>
                            <TableCell align="right">Number</TableCell>
                            <TableCell align="right">City</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {restaurants.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                                onClick={() => handleRowClick(row.id)}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">
                                    {row.description}
                                </TableCell>
                                <TableCell align="right">
                                    {row.street}
                                </TableCell>
                                <TableCell align="right">
                                    {row.number}
                                </TableCell>
                                <TableCell align="right">{row.city}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Styled.TableWrapper>
    ) : (
        <Loader />
    );
};

export default RestaurantsList;
