import { Button } from '@mui/material';
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
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Loader from '../../components/Loader';
import { Product } from '../../models/product.model';
import {
    addProduct,
    removeProduct,
    startOrder,
} from '../../redux/reducers/productSlice';
import { RootState } from '../../redux/store';
import * as Styled from './ProductsPage.styles';

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const dispatch = useDispatch();
    const { products: selectedProducts } = useSelector(
        (state: RootState) => state.products
    );
    const productsPriceSum = selectedProducts.reduce(
        (sum, val) => sum + val.count * val.price,
        0
    );
    const navigate = useNavigate();
    const { restaurantId } = useParams<{ restaurantId: string }>();

    const { data: restaurantsResponse, isLoading } = useQuery(
        'restaurants',
        () =>
            axios
                .get(`/api/restaurants/${restaurantId}/products`)
                .then((response) => response)
    );
    const { data: orderResponse } = useQuery(
        'orderDraft',
        () =>
            axios
                .post('/api/orders', {
                    userId: uuidv4(),
                    items: [],
                    restaurantId: restaurantId,
                })
                .then((response) => response),
        {
            staleTime: Infinity,
        }
    );

    useEffect(() => {
        if (!restaurantsResponse) return;
        setProducts(restaurantsResponse.data);
    }, [restaurantsResponse]);

    useEffect(() => {
        if (!orderResponse) return;

        dispatch(startOrder({ id: orderResponse.data.id }));
    }, [orderResponse]);

    const handleAddProduct = (product: Product) => {
        dispatch(addProduct(product));
    };

    const handleFinalizeOrder = () => {
        navigate(`/payment/${orderResponse?.data.id}`);
    };

    const handleRemoveProduct = (id: string) => {
        dispatch(removeProduct({ id: id }));
    };

    return !isLoading ? (
        <Styled.TableWrapper>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Product name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Count</TableCell>
                            <TableCell align="right">Add product</TableCell>
                            <TableCell align="right">Remove product</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="right"
                                >
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">
                                    {selectedProducts.find(
                                        (prod) => prod.id === row.id
                                    )
                                        ? selectedProducts.find(
                                              (prod) => prod.id === row.id
                                          )?.count
                                        : 0}
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        onClick={() =>
                                            handleAddProduct({
                                                id: row.id,
                                                name: row.name,
                                                price: row.price,
                                            })
                                        }
                                    >
                                        Add
                                    </Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        onClick={() =>
                                            handleRemoveProduct(row.id)
                                        }
                                    >
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Paper sx={{ p: 3 }}>
                <span>{`Price: ${productsPriceSum} PLN`}</span>
            </Paper>
            <Styled.ButtonsWrapper>
                <Button variant="contained" onClick={() => navigate('/')}>
                    Back to restaurants
                </Button>
                <Button variant="contained" onClick={handleFinalizeOrder}>
                    Finalize order
                </Button>
            </Styled.ButtonsWrapper>
        </Styled.TableWrapper>
    ) : (
        <Loader />
    );
};

export default ProductsPage;
