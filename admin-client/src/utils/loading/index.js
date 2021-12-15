import React, { createContext, useContext, useEffect, useState } from 'react';

const LoadingContext = createContext();

function LoadingProvider({ children }) {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		console.log('Loading set to ', loading);
	}, [loading]);

	return (
		<LoadingContext.Provider value={setLoading}>
			{loading ? (
				<div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<h1>Loading...</h1>
				</div>
			) : (
				children
			)}
		</LoadingContext.Provider>
	);
}

export const useLoading = () => {
	return useContext(LoadingContext);
};

export default LoadingProvider;
