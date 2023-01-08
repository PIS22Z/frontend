import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { Product } from '../../models/product.model';

type InitialStateType = {
    products: (Product & { count: number })[];
    orderId: string;
};

const initialState: InitialStateType = {
    products: [],
    orderId: '',
};

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        startOrder: (state, { payload }: PayloadAction<{ id: string }>) => {
            state.orderId = payload.id;
        },

        removeProduct: (state, { payload }: PayloadAction<{ id: string }>) => {
            const foundProduct = state.products.find(
                (product) => product.id === payload.id
            );
            if (!foundProduct) return;

            axios.put(`/api/orders/${state.orderId}/remove`, {
                productId: payload.id,
                quantity: 1,
            });

            if (foundProduct.count >= 2) {
                state.products = state.products.map((product) =>
                    product.id === payload.id
                        ? {
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              count: product.count - 1,
                          }
                        : product
                );
            } else
                state.products = state.products.filter(
                    (product) => product.id !== payload.id
                );
        },

        addProduct: (state, { payload }: PayloadAction<Product>) => {
            const foundProduct = state.products.find(
                (product) => product.id === payload.id
            );

            if (foundProduct) {
                axios.put(`/api/orders/${state.orderId}/add`, {
                    productId: payload.id,
                    quantity: 1,
                });
                state.products = state.products.map((product) =>
                    product.id === payload.id
                        ? {
                              id: payload.id,
                              name: payload.name,
                              price: payload.price,
                              count: product.count + 1,
                          }
                        : product
                );
            } else {
                axios.put(`/api/orders/${state.orderId}/add`, {
                    productId: payload.id,
                    quantity: 1,
                });
                state.products = [
                    ...state.products,
                    {
                        id: payload.id,
                        name: payload.name,
                        price: payload.price,
                        count: 1,
                    },
                ];
            }
        },
    },
});

export const { removeProduct, addProduct, startOrder } = productSlice.actions;

export default productSlice.reducer;
