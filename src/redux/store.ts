import { configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/productSlice';

export const store = configureStore({
    reducer: { products: productReducer },
});

export type StoreState = ReturnType<typeof store.getState>;
