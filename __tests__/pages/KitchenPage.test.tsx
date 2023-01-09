import React from "react";
import axios from "axios";
import { act, render, screen } from "@testing-library/react";
import { UseMutationResult, UseQueryResult } from "react-query";
import * as reactQuery from "react-query";


import KitchenPage from '../../src/pages/KitchenPage';
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";

jest.mock('axios');
jest.mock('react-query');

const mockedAxiosPut = jest.spyOn(axios, 'put');
const mockedQuery = jest.spyOn(reactQuery, 'useQuery');
const mockedMutation = jest.spyOn(reactQuery, 'useMutation');

type ResponseKitchen = {
  id: string;
  restaurantId: string;
  userId: string;
  items: {
      productId: string;
      productName: string;
      productPhotoUrl: string;
      productPrice: number;
      quantity: number;
  }[];
  amount: number;
  deliveryDetails: {
      address: string;
  };
  status: string;
};

const restaurantId = 'testRestaurant';

const Wrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <MemoryRouter initialEntries={[`/kitchen/${restaurantId}`]}>
      <Routes>
        <Route path="/kitchen/:restaurantId" element={
            <>
            {children}
            </>
        } />
      </Routes>
    </MemoryRouter>
  )
};

describe("Kitchen page", () => {

  const mockResponse: ResponseKitchen = {
    id: 'id',
    restaurantId: restaurantId,
    userId: 'testUser',
    items: [
      {
        productId: 'id',
        productName: 'testName',
        productPhotoUrl: '',
        productPrice: 2,
        quantity: 1,
      },
    ],
    amount: 0,
    deliveryDetails: {
      address: "",
    },
    status: 'PAID',
  };

  const queryResponse: UseQueryResult<unknown, unknown> = {
    data: {data: [mockResponse]},
    isLoading: false,
    error: null,
    isError: false,
    isIdle: false,
    isLoadingError: false,
    isRefetchError: false,
    isSuccess: true,
    status: "success",
    dataUpdatedAt: 0,
    errorUpdatedAt: 0,
    failureCount: 0,
    errorUpdateCount: 0,
    isFetched: false,
    isFetchedAfterMount: false,
    isFetching: false,
    isPlaceholderData: false,
    isPreviousData: false,
    isRefetching: false,
    isStale: false,
    refetch: jest.fn(),
    remove: jest.fn()
  }

  const mutationResponse: UseMutationResult<unknown, unknown> = {
    data: undefined,
    error: null,
    isError: false,
    isIdle: false,
    isLoading: false,
    isSuccess: true,
    status: "success",
    mutate: jest.fn(),
    reset: jest.fn(),
    context: undefined,
    failureCount: 0,
    isPaused: false,
    variables: undefined,
    mutateAsync: jest.fn(),
  }

  beforeEach(() => {
    mockedQuery.mockReturnValue(queryResponse);
    mockedMutation.mockReturnValue(mutationResponse);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('order ready btn disabled if status is paid', async () => {
    await act(async () => {
      render(
        <Wrapper>
          <KitchenPage/>
        </Wrapper>
      )
    });

    const btn = screen.getAllByRole('button').find(e => e.textContent?.match(/ready/i))!;
    expect(btn).toBeDisabled();

  });

  it('should reject order', async () => {
    const refetchMock = jest.fn();
    mockedAxiosPut.mockResolvedValue(new Promise(() => {}));
    mockedQuery.mockReturnValue({...queryResponse, refetch: refetchMock});
    mockedMutation.mockImplementation((mutationKey, mutationFn, options) => {
      return {...mutationResponse, mutateAsync: () => {
        if(options?.onSuccess) options.onSuccess({}, {}, {});
        return mutationFn!(restaurantId);
      }};
    });

    await act(async () => {
      render(
        <Wrapper>
          <KitchenPage/>
        </Wrapper>
      )
    });

    const btn = screen.getAllByRole('button').find(e => e.textContent?.match(/reject/i))!;
    expect(refetchMock).toBeCalledTimes(0);
    expect(mockedAxiosPut).toBeCalledTimes(0);

    await act(async () => {
      await userEvent.click(btn);
    });
    expect(refetchMock).toBeCalledTimes(1);
    expect(mockedAxiosPut).lastCalledWith(expect.stringContaining(`/api/orders/${restaurantId}/reject`));
  });

  it('should make order ready', async () => {
    const refetchMock = jest.fn();
    mockedAxiosPut.mockResolvedValue(new Promise(() => {}));
    mockedQuery.mockReturnValue({...queryResponse,
      data: {data: [{...mockResponse, status: 'ACCEPTED'}]},
      refetch: refetchMock
    });
    mockedMutation.mockImplementation((mutationKey, mutationFn, options) => {
      return {...mutationResponse, mutateAsync: () => {
        if(options?.onSuccess) options.onSuccess({}, {}, {});
        return mutationFn!(restaurantId);
      }};
    });

    await act(async () => {
      render(
        <Wrapper>
          <KitchenPage/>
        </Wrapper>
      )
    });

    const btn = screen.getAllByRole('button').find(e => e.textContent?.match(/ready/i))!;
    expect(btn).toBeEnabled();
    expect(refetchMock).toBeCalledTimes(0);
    expect(mockedAxiosPut).toBeCalledTimes(0);

    await act(async () => {
      await userEvent.click(btn);
    });

    expect(refetchMock).toBeCalledTimes(1);
    expect(mockedAxiosPut).lastCalledWith(expect.stringContaining(`/api/orders/${restaurantId}/ready`));

    const btn_accept = screen.getAllByRole('button').find(e => e.textContent?.match(/accept/i))!;
    const btn_reject = screen.getAllByRole('button').find(e => e.textContent?.match(/reject/i))!;

    expect(btn_accept).toBeDisabled();
    expect(btn_reject).toBeDisabled();

  });

});