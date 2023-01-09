import React from "react";
import axios from "axios";
import * as reactRouterDom from 'react-router-dom';
import { act, render, screen } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from "react-query";
import RestaurantsList from '../../src/components/RestaurantsList';
import { Restaurant } from "../../src/components/RestaurantsList/RestaurantsList";
import userEvent from "@testing-library/user-event";

jest.mock('axios');
jest.mock('react-router-dom')

const mockedAxiosGet = jest.spyOn(axios, 'get');
const mockedNav = jest.spyOn(reactRouterDom, 'useNavigate');

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


describe("restaurants list component", () => {
    const restaurantsMock: Restaurant[] = [
      {
        id: '0',
        name: 'testRest',
        logoUrl: '',
        description: 'desc',
        street: 'street',
        number: '0',
        city: 'city',
      },
      {
        id: '1',
        name: 'testRest1',
        logoUrl: '',
        description: 'desc1',
        street: 'street2',
        number: '1',
        city: 'city',
      },
      {
        id: '2',
        name: 'testRest2',
        logoUrl: '',
        description: 'desc2',
        street: 'street2',
        number: '3',
        city: 'city2',
      }
    ]

  beforeEach(() => {
    mockedNav.mockReturnValue(jest.fn());
    mockedAxiosGet.mockResolvedValue({data: restaurantsMock});
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render all elements', async () => {
    render(
      <Wrapper>
        <RestaurantsList/>
      </Wrapper>
    );

    await screen.findByText(restaurantsMock[0].name);
    const restaurants = await screen.findAllByRole('row');
    expect(restaurants.length).toEqual(restaurantsMock.length + 1);
  });

  it('should contain restaurant data', async () => {
    render(
      <Wrapper>
        <RestaurantsList/>
      </Wrapper>
    );

    expect(screen.findByText(restaurantsMock[0].name)).toBeInTheDocument;
    expect(screen.findByText(restaurantsMock[0].description)).toBeInTheDocument;
    expect(screen.findByText(restaurantsMock[0].street)).toBeInTheDocument;
    expect(screen.findByText(restaurantsMock[0].number)).toBeInTheDocument;
    expect(screen.findByText(restaurantsMock[0].city)).toBeInTheDocument;
  });

  it('should redirect to restaurant page', async () => {
    const nav = jest.fn();
    mockedNav.mockReturnValue(nav);

    render(
      <Wrapper>
        <RestaurantsList/>
      </Wrapper>
    );

    await screen.findByText(restaurantsMock[0].name);
    const restaurants = await screen.findAllByRole('row');

    act(() => {
      userEvent.click(restaurants[1])
    });

    expect(nav).lastCalledWith(`/restaurant/${restaurantsMock[0].id}`);
  });
});
