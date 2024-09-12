import ReactDOM from 'react-dom/client';
import Approuter from '@routes/AppRouter';
// snackbar
import { SnackbarProvider } from '@components/common/index.js';
// styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '@styles/active.css';
// axios
import './services/axios-global.js';
// redux
import { Provider } from 'react-redux'; // provider for store to composition
import { PersistGate } from 'redux-persist/integration/react'; // provider for persistor to composition the app, should be added after the redux proiver
import { store, persistor } from '@store/index';
import './index.css';
ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<PersistGate
			persistor={persistor}
			loading={null}>
			<SnackbarProvider>
				<Approuter />
			</SnackbarProvider>
		</PersistGate>
	</Provider>
);
