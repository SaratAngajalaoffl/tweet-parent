import { createContext, useState, useContext } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const SnackbarContext = createContext();

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const SnackbarProvider = ({ children }) => {
	const [open, setOpen] = useState();
	const [message, setmessage] = useState('');
	const [severety, setseverety] = useState('');
	const [duration, setduration] = useState(0);

	const openSnackbar = (msg, type = 'error', time = 3000) => {
		setduration(time);
		setseverety(type);
		setmessage(msg);
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	return (
		<SnackbarContext.Provider value={{ openSnackbar }}>
			<Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
				<Alert onClose={handleClose} severity={severety}>
					{message}
				</Alert>
			</Snackbar>
			{children}
		</SnackbarContext.Provider>
	);
};
const types = {
	SNACKBAR_ERROR: 'error',
	SNACKBAR_WARNING: 'warning',
	SNACKBAR_INFO: 'info',
	SNACKBAR_SUCCESS: 'success',
};

const useSnackbar = () => {
	const { openSnackbar } = useContext(SnackbarContext);

	return openSnackbar;
};

export { SnackbarProvider, types };

export default useSnackbar;
