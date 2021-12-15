import { BrowserRouter as Router } from 'react-router-dom';
import MainRoutingHandler from 'services/routing';
import LoadingProvider from 'utils/loading';
import { SnackbarProvider } from 'utils/snackbar';

const App = () => {
	return (
		<Router>
			<SnackbarProvider>
				<LoadingProvider>
					<MainRoutingHandler />
				</LoadingProvider>
			</SnackbarProvider>
		</Router>
	);
};

export default App;
