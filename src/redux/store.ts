import { configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/productSlice';

export const store = configureStore({
    reducer: { products: productReducer },
});

export type RootState = ReturnType<typeof store.getState>;
