import React, { useEffect, useState } from 'react';
import firebaseApp from 'configs/firebase-config';
import AuthRoutes from './auth-routes';
import PrivateRoutes from './private-routes';

function MainRoutingHandler() {
	const [auth, setAuth] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		firebaseApp.auth().onAuthStateChanged((auth) => {
			setAuth(auth);
			setLoading(false);
		});
	}, []);

	if (loading)
		return (
			<div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<h1>Loading...</h1>
			</div>
		);

	if (!auth) return <AuthRoutes />;

	return <PrivateRoutes />;
}

export default MainRoutingHandler;
