import React from "react";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import { act, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";


import DeliveryPage from '../../src/pages/DeliveryPage';

jest.mock('axios');

jest.useFakeTimers();
const mockedAxiosGet = jest.spyOn(axios, 'get');
const mockedAxiosPut = jest.spyOn(axios, 'put');

type Order = {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantAddress: string;
  deliveryRate: number;
  deliveryDetails: {
      address: string;
  };
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const Wrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>
          {children}
    </QueryClientProvider>
  )
}

describe('Delivery page', () => {
  afterEach(() => {
    jest.resetAllMocks();
  })

  const testOrder: Order = {
    id: 'Id',
    restaurantId: 'restaurantId',
    restaurantName: 'restaurantName',
    restaurantAddress: 'restaurantAddress',
    deliveryRate: 2,
    deliveryDetails: {
        address: 'address',
    },
  }

  it('should accept order', async () => {
    mockedAxiosGet.mockResolvedValue({data: {...testOrder, status: ''}});
    mockedAxiosPut.mockResolvedValue({data: testOrder});

    await act(async () => {
      render(
        <Wrapper>
          <DeliveryPage/>
        </Wrapper>
      )
    });

    await waitFor(async () => {
      screen.getAllByRole('button').find(e => e.textContent?.match(/accept/i));
    }, {timeout: 5500});

    const btn_accept = screen.getAllByRole('button').find(e => e.textContent?.match(/accept/i));
    await act(async () => btn_accept ? await userEvent.click((btn_accept)) : fail("Element not found"));

    expect(mockedAxiosPut).lastCalledWith(expect.stringMatching(/(.*?)accept/d), expect.any(Object));

  });

  it('should reject order', async () => {
    mockedAxiosGet.mockResolvedValue({data: {...testOrder, status: ''}});
    mockedAxiosPut.mockResolvedValue({data: testOrder});

    await act(async () => {
      render(
        <Wrapper>
          <DeliveryPage/>
        </Wrapper>
      )
    });

    await waitFor(async () => {
      screen.getAllByRole('button').find(e => e.textContent?.match(/reject/i));
    }, {timeout: 5500});
    expect(mockedAxiosGet).toBeCalledTimes(1);

    const btn_reject = screen.getAllByRole('button').find(e => e.textContent?.match(/reject/i));
    await act(async () => btn_reject ? await userEvent.click((btn_reject)) : fail("Element not found"));



    expect(mockedAxiosGet).toBeCalledTimes(2);

  });

  it('should start delivery', async () => {
    mockedAxiosGet.mockResolvedValue({data: {...testOrder, status: 'COURIER_ASSIGNED'}});
    mockedAxiosPut.mockResolvedValue({data: testOrder});

    await act(async () => {
      render(
        <Wrapper>
          <DeliveryPage/>
        </Wrapper>
      )
    });

    await waitFor(async () => {
      screen.getAllByRole('button').find(e => e.textContent?.match(/accept/i));
    }, {timeout: 5500});

    let btn = screen.getAllByRole('button').find(e => e.textContent?.match(/accept/i));
    await act(async () => btn ? await userEvent.click((btn)) : fail("Element not found"));



    btn = (await screen.findAllByRole('button')).find(e => e.textContent?.match(/start/i));
    await act(async () => btn ? await userEvent.click((btn)) : fail("Element not found"));


    expect(mockedAxiosPut).lastCalledWith(expect.stringMatching(/(.*?)start/d), expect.any(Object));

  });

  it('should finish delivery', async () => {
    const jsdomAlert = window.alert;
    window.alert = () => {null};
    mockedAxiosGet.mockResolvedValue({data: {...testOrder, status: 'DELIVERY_IN_PROGRESS'}});
    mockedAxiosPut.mockResolvedValue({data: testOrder});

    await act(async () => {
      render(
        <Wrapper>
          <DeliveryPage/>
        </Wrapper>
      )
    });

    await waitFor(async () => {
      screen.getAllByRole('button').find(e => e.textContent?.match(/accept/i));
    }, {timeout: 5500});

    let btn = screen.getAllByRole('button').find(e => e.textContent?.match(/accept/i));
    await act(async () => btn ? await userEvent.click((btn)) : fail("Element not found"));

    btn = (await screen.findAllByRole('button')).find(e => e.textContent?.match(/finish/i));
    await act(async () => btn ? await userEvent.click((btn)) : fail("Element not found"));


    expect(mockedAxiosPut).lastCalledWith(expect.stringMatching(/(.*?)finish/d), expect.any(Object));
    window.alert = jsdomAlert;
  });

});