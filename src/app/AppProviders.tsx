import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '../redux/store';

type Props = {
    children: JSX.Element;
};

const queryClient = new QueryClient();

const AppProviders = ({ children }: Props) => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Provider store={store}>{children}</Provider>
            </BrowserRouter>
        </QueryClientProvider>
    );
};
export default AppProviders;
