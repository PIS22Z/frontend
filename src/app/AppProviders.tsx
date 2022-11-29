import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../redux/store';

type Props = {
    children: JSX.Element;
};

const AppProviders = ({ children }: Props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>{children}</Provider>
        </BrowserRouter>
    );
};
export default AppProviders;
