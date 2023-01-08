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
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router';

import Loader from '../../components/Loader';
import * as Styled from './KitchenPage.styles';

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

    const handleAcceptOffer = (id: string) => {
        mutateAccept(id);
    };

    const handleRejectOffer = (id: string) => {
        mutateReject(id);
    };

    const handleReadyOffer = (id: string) => {
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
                                (val: any) => val.restaurantId === restaurantId
                            )
                            .filter(
                                (val: any) =>
                                    val.status === 'PAID' ||
                                    val.status === 'ACCEPTED' ||
                                    val.status === 'READY_TO_DELIVER'
                            )
                            .map((row: any) => (
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
                                            (item: any) =>
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
                                                handleAcceptOffer(row.id)
                                            }
                                        >
                                            Accept offer
                                        </Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            disabled={row.status !== 'PAID'}
                                            onClick={() =>
                                                handleRejectOffer(row.id)
                                            }
                                        >
                                            Reject offer
                                        </Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            disabled={row.status !== 'ACCEPTED'}
                                            onClick={() =>
                                                handleReadyOffer(row.id)
                                            }
                                        >
                                            Offer ready
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
