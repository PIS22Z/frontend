import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router';

import Loader from '../../components/Loader';
import * as Styled from './KitchenPage.styles';

type ResponseKitchen = {
    id: string;
    restaurantId: string;
    userId: string;
    items: {
        productId: string;
        productName: string;
        productPhotoUrl: string;
        productPrice: number;
        quantity: number;
    }[];
    amount: number;
    deliveryDetails: {
        address: string;
    };
    status: string;
};

const KitchenPage = () => {
    const {
        data: kitchenResponse,
        isLoading,
        refetch,
    } = useQuery('getOrders', () =>
        axios.get('/api/orders').then((response) => response)
    );
    const { restaurantId } = useParams<{ restaurantId: string }>();
    const { mutateAsync: mutateAccept } = useMutation(
        'acceptOrder',
        (id: string) => axios.put(`/api/orders/${id}/accept`),
        { onSuccess: () => refetch() }
    );
    const { mutateAsync: mutateReject } = useMutation(
        'rejectOrder',
        (id: string) => axios.put(`/api/orders/${id}/reject`),
        { onSuccess: () => refetch() }
    );
    const { mutateAsync: mutateReady } = useMutation(
        'readyOrder',
        (id: string) => axios.put(`/api/orders/${id}/ready`),
        { onSuccess: () => refetch() }
    );

    useEffect(() => {
        const ordersInterval = setInterval(() => {
            refetch();
        }, 5000);

        return () => clearInterval(ordersInterval);
    }, []);

    const handleAcceptOrder = (id: string) => {
        mutateAccept(id);
    };

    const handleRejectOrder = (id: string) => {
        mutateReject(id);
    };

    const handleReadyOrder = (id: string) => {
        mutateReady(id);
    };

    return !isLoading ? (
        <Styled.TableWrapper>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Address</TableCell>
                            <TableCell align="right">Order</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="center">Accept</TableCell>
                            <TableCell align="center">Reject</TableCell>
                            <TableCell align="center">
                                Ready to deliver
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {kitchenResponse?.data
                            .filter(
                                (val: ResponseKitchen) =>
                                    val.restaurantId === restaurantId
                            )
                            .filter(
                                (val: ResponseKitchen) =>
                                    val.status === 'PAID' ||
                                    val.status === 'ACCEPTED' ||
                                    val.status === 'READY_TO_DELIVER'
                            )
                            .map((row: ResponseKitchen) => (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.deliveryDetails.address}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.items.map(
                                            (item) =>
                                                `${item.productName} X ${item.quantity}`
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.status}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            disabled={row.status !== 'PAID'}
                                            onClick={() =>
                                                handleAcceptOrder(row.id)
                                            }
                                        >
                                            Accept Order
                                        </Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            disabled={row.status !== 'PAID'}
                                            onClick={() =>
                                                handleRejectOrder(row.id)
                                            }
                                        >
                                            Reject Order
                                        </Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            disabled={row.status !== 'ACCEPTED'}
                                            onClick={() =>
                                                handleReadyOrder(row.id)
                                            }
                                        >
                                            Order ready
                                        </Button>
                                    </TableCell>
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

export default KitchenPage;
