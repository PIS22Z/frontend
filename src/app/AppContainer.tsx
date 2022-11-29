import App from './App';
import AppProviders from './AppProviders';

const AppContainer = () => {
    return (
        <AppProviders>
            <App />
        </AppProviders>
    );
};

export default AppContainer;
