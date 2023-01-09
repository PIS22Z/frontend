import React from "react";
import axios from "axios";
import { Provider } from "react-redux";
import * as reactRouterDom from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import { act, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { configureStore, PreloadedState } from "@reduxjs/toolkit";

import productReducer from '../../src/redux/reducers/productSlice';
import { Product } from "../../src/models/product.model";
import ProductsPage from '../../src/pages/ProductsPage';

jest.mock('axios');
jest.mock('react-router-dom')

const mockedAxiosGet = jest.spyOn(axios, 'get');
const mockedAxiosPost = jest.spyOn(axios, 'post');
const mockedAxiosPut = jest.spyOn(axios, 'put');
const mockedNav = jest.spyOn(reactRouterDom, 'useNavigate');
const mockedParams = jest.spyOn(reactRouterDom, 'useParams');

const testProducts: Product[] = [
  {
    id: '1',
    name: 'testName',
    price: 4,
  }
]

const testState = {
  products: [
    {...testProducts[0], count: 2},
  ],
  orderId: 'testId',
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const Wrapper = ({children}: {children: React.ReactNode}) => {
  type state = {
    products?: {
      products: {
          id: string;
          name: string;
          price: number;
          count: number;
      }[];
      orderId: string;
  } | undefined;
  }
  const preloadedState: PreloadedState<state> = {products: testState};
  const store = configureStore({
    reducer: { products: productReducer },
    preloadedState,
  })

  return (
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          {children}
        </Provider>
    </QueryClientProvider>
  )
}

describe('Product page', () => {
  const testAddress = 'testAddress';

  beforeEach(() => {
    mockedNav.mockReturnValue(jest.fn());
    mockedParams.mockReturnValue('testId');

    mockedAxiosGet.mockResolvedValue({data: testProducts});
    mockedAxiosPost.mockResolvedValue({data: {id: 'testId'}});
    mockedAxiosPut.mockResolvedValue({data: {id: 'testId'}});

  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should contain product data', async () => {
    await act(async () => {
      render(
        <Wrapper>
          <ProductsPage/>
        </Wrapper>
      )
    });

    expect(await screen.findByText(testProducts[0].name)).toBeInTheDocument();
    expect(screen.getByText(testProducts[0].price)).toBeInTheDocument();
    expect(screen.getByText(2)).toBeInTheDocument();
    expect(screen.getByText(/Price: 8.00 PLN/i)).toBeInTheDocument();

  });

  it('address input should be interactive', async () => {
    await act(async () => {
      render(
        <Wrapper>
          <ProductsPage/>
        </Wrapper>
      )
    });
    const textBox = await screen.findByLabelText(/address/i);
    expect(textBox.textContent).toEqual('');

    act(() => {
      userEvent.type(textBox, testAddress);
      userEvent.tab();
    });

    expect(textBox).toHaveDisplayValue(testAddress);

  });

  it('finalize btn disabled if address is empty', async () => {
    await act(async () => {
      render(
        <Wrapper>
          <ProductsPage/>
        </Wrapper>
      )
    });
    const btns = await screen.findAllByRole('button');
    const btn = btns.find(e => e.textContent?.match(/Finalize/i))!;

    expect(btn).toBeDisabled();
  });

  it('should add product', async () => {
    await act(async () => {
      render(
        <Wrapper>
          <ProductsPage/>
        </Wrapper>
      )
    });

    expect(await screen.findByText(testProducts[0].name)).toBeInTheDocument();
    expect(screen.getByText(testProducts[0].price)).toBeInTheDocument();
    expect(screen.getByText(2)).toBeInTheDocument();
    expect(screen.getByText(/Price: 8.00 PLN/i)).toBeInTheDocument();

    const btn = screen.getAllByRole('button').find(e => e.textContent?.match(/add/i))!;
    act(() => {
      userEvent.click(btn);
    });

    expect(screen.getByText(testProducts[0].name)).toBeInTheDocument();
    expect(screen.getByText(testProducts[0].price)).toBeInTheDocument();
    expect(screen.getByText(3)).toBeInTheDocument();
    expect(screen.getByText(/Price: 12.00 PLN/i)).toBeInTheDocument();

  });


  it('should remove product', async () => {
    await act(async () => {
      render(
        <Wrapper>
          <ProductsPage/>
        </Wrapper>
      )
    });

    expect(await screen.findByText(testProducts[0].name)).toBeInTheDocument();
    expect(screen.getByText(testProducts[0].price)).toBeInTheDocument();
    expect(screen.getByText(2)).toBeInTheDocument();
    expect(screen.getByText(/Price: 8.00 PLN/i)).toBeInTheDocument();

    const btn = screen.getAllByRole('button').find(e => e.textContent?.match(/remove/i))!;
    act(() => {
      userEvent.click(btn);
    });

    expect(screen.getByText(testProducts[0].name)).toBeInTheDocument();
    expect(screen.getByText(testProducts[0].price)).toBeInTheDocument();
    expect(screen.getByText(1)).toBeInTheDocument();
    expect(screen.getByText(/Price: 4.00 PLN/i)).toBeInTheDocument();

  });

  it('should remove product if count is 0', async () => {
    await act(async () => {
      render(
        <Wrapper>
          <ProductsPage/>
        </Wrapper>
      )
    });

    expect(await screen.findByText(testProducts[0].name)).toBeInTheDocument();
    const btn = screen.getAllByRole('button').find(e => e.textContent?.match(/remove/i))!;

    act(() => {
      userEvent.click(btn);
      userEvent.click(btn);
    });

    expect(screen.getByText(testProducts[0].name)).toBeInTheDocument();
    expect(screen.getByText(testProducts[0].price)).toBeInTheDocument();
    expect(screen.getByText(0)).toBeInTheDocument();
    expect(screen.getByText(/Price: 0.00 PLN/i)).toBeInTheDocument();

  });

  it('should redirect back to restaurants', async () => {
    const nav = jest.fn();
    mockedNav.mockReturnValue(nav);

    await act(async () => {
      render(
        <Wrapper>
          <ProductsPage/>
        </Wrapper>
      )
    });

    expect(await screen.findByText(testProducts[0].name)).toBeInTheDocument();
    const btn = screen.getAllByRole('button').find(e => e.textContent?.match(/back/i))!;

    act(() => {
      userEvent.click(btn);
    });

    expect(nav).lastCalledWith(`/`);

  });

  it('should redirect to finalize', async () => {
    const nav = jest.fn();
    mockedNav.mockReturnValue(nav);

    await act(async () => {
      render(
        <Wrapper>
          <ProductsPage/>
        </Wrapper>
      )
    });

    const textBox = await screen.findByLabelText(/address/i);
    const btn = screen.getAllByRole('button').find(e => e.textContent?.match(/Finalize/i))!;

    await act(async () => {
      userEvent.type(textBox, testAddress);
      userEvent.tab();
      await userEvent.click(btn);
    });

    expect(nav).lastCalledWith(expect.stringMatching(/payment\//d));
  });


});

