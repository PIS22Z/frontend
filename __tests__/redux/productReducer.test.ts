import axios from 'axios';

import { Product } from '../../src/models/product.model';
import productReducer, { addProduct, removeProduct, startOrder } from '../../src/redux/reducers/productSlice'

jest.spyOn(axios, 'put').mockImplementation(() => Promise.resolve({}));

describe('productSlice', () => {
  const testProduct: Product = {
    id: '0',
    name: 'test-name',
    price: 333,
  }

  const initialState = {
    products: [],
    orderId: '',
  }

  const testState = {
    products: [
      {...testProduct, count: 2}
    ],
    orderId: 'testId',
  };

  it('should return default state when an empty action passed', () => {
    const order = productReducer(undefined, {type: ''});
    expect(order).toEqual(initialState);
  });

  it('should start an order', async () => {
    const id = 'testId';
    const order = productReducer(initialState, {type: startOrder, payload: {id}});
    expect(order.orderId).toEqual(id);
  });

  it('should add new product', () => {
    let order = productReducer(initialState, {type: startOrder, payload: {id: 'testId'}})
    order = productReducer(initialState, {type: addProduct, payload: testProduct});
    expect(order.products.length).toEqual(1);
    expect(order.products[0].count).toEqual(1);

    order = productReducer(order, {type: addProduct, payload: testProduct});
    expect(order.products.length).toEqual(1);
    expect(order.products[0].count).toEqual(2);
  });

  it('should remove product', () => {
    let order = productReducer(testState, {type: removeProduct, payload: testProduct});
    expect(order.products.length).toEqual(1);
    expect(order.products[0].count).toEqual(1);

    order = productReducer(order, {type: removeProduct, payload: testProduct});
    expect(order.products.length).toEqual(0);
  })

})
