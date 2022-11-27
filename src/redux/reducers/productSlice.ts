import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Product } from '../../models/product.model';

type InitialStateType = {
    products: Product[];
};

const initialState: InitialStateType = {
    products: [],
};

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        removeProduct: (
            state,
            { payload }: PayloadAction<{ productId: number }>
        ) => {
            state.products = state.products.filter(
                (product) => product.id !== payload.productId
            );
        },
        addProduct: (state, { payload }: PayloadAction<Product>) => {
            state.products = [...state.products, payload];
        },
    },
});

export const { removeProduct, addProduct } = productSlice.actions;

export default productSlice.reducer;
