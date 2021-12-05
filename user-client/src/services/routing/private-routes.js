import firebaseApp from 'configs/firebase-config';
import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import DashboardScreen from 'screens/private/dashboard';
import UserDetailsScreen from 'screens/private/display-picture';
import { setNameAndPicture } from 'services/firebase/profile-services';

function PrivateRoutes() {
	const [showPictureUpload, setShowPictureUpload] = useState(false);

	useEffect(() => {
		firebaseApp.auth().onAuthStateChanged((auth) => {
			if (!auth.photoURL || !auth.displayName) setShowPictureUpload(true);
			else {
				setNameAndPicture(auth.uid, auth.displayName, auth.photoURL);
				setShowPictureUpload(false);
			}
		});
	}, []);

	if (showPictureUpload) return <UserDetailsScreen />;

	return (
		<Switch>
			<Route exact path='*' component={DashboardScreen} />
		</Switch>
	);
}

export default PrivateRoutes;
