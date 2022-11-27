import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Product } from '../../models/product.model';

type InitialStateType = {
    products: (Product & { count: number })[];
};

const initialState: InitialStateType = {
    products: [],
};

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        removeProduct: (state, { payload }: PayloadAction<{ id: number }>) => {
            const foundProduct = state.products.find(
                (product) => product.id === payload.id
            );
            if (!foundProduct) return;
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
            const isProductInCart = state.products.find(
                (product) => product.id === payload.id
            );
            if (isProductInCart)
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
            else
                state.products = [
                    ...state.products,
                    {
                        id: payload.id,
                        name: payload.name,
                        price: payload.price,
                        count: 1,
                    },
                ];
        },
    },
});

export const { removeProduct, addProduct } = productSlice.actions;

export default productSlice.reducer;
