import React from "react";
import axios from "axios";
import * as reactRouterDom from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import { act, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";


import PaymentPage from '../../src/pages/PaymentPage';

jest.mock('axios');
jest.mock('react-router-dom')

const mockedAxiosPost = jest.spyOn(axios, 'post');
const mockedNav = jest.spyOn(reactRouterDom, 'useNavigate');
const mockedParams = jest.spyOn(reactRouterDom, 'useParams');


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
};

describe("Payment page", () => {
  beforeEach(() => {
    mockedNav.mockReturnValue(jest.fn());
    mockedNav.mockReturnValue(jest.fn());
    mockedParams.mockReturnValue('testId');

    mockedAxiosPost.mockResolvedValue({});

  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('card number input should be interactive', async () => {
    render(
      <Wrapper>
        <PaymentPage/>
      </Wrapper>
    )

    const textBox = screen.getByLabelText(/card/i);
    expect(textBox.textContent).toEqual('');

    act(() => {
      userEvent.type(textBox, '1');
      userEvent.tab();
    });

    expect(textBox).toHaveDisplayValue('1');

  });

  it('expire date input should be interactive', async () => {
    render(
      <Wrapper>
        <PaymentPage/>
      </Wrapper>
    )

    const textBox = screen.getByLabelText(/date/i);
    expect(textBox.textContent).toEqual('');

    act(() => {
      userEvent.type(textBox, '1');
      userEvent.tab();
    });

    expect(textBox).toHaveDisplayValue('1');

  });

  it('CVV input should be interactive', async () => {
    render(
      <Wrapper>
        <PaymentPage/>
      </Wrapper>
    )

    const textBox = screen.getByLabelText(/CVV/i);
    expect(textBox.textContent).toEqual('');

    act(() => {
      userEvent.type(textBox, '1');
      userEvent.tab();
    });

    expect(textBox).toHaveDisplayValue('1');

  });

  it('should redirect to status page', async () => {
    const nav = jest.fn();
    mockedNav.mockReturnValue(nav);

    render(
      <Wrapper>
        <PaymentPage/>
      </Wrapper>
    )

    const btn = screen.getByRole('button');

    await act(async () => {
      await userEvent.click(btn);
    });

    expect(nav).lastCalledWith(expect.stringMatching(/status\//d));

  });

});