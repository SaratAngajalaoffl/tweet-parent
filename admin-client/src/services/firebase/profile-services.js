import firebaseApp from 'configs/firebase-config';

export const setNameAndPicture = async (id, name, picture) => {
	try {
		await firebaseApp.database().ref(`users/${id}/displayName`).set(name);
		await firebaseApp.database().ref(`users/${id}/photoUrl`).set(picture);
	} catch (err) {
		console.log(err);
	}
};

export const getUserData = async (id) => {
	try {
		const data = await firebaseApp.database().ref(`/users/${id}/`).once('value');
		return data.val();
	} catch (err) {
		console.log(err);
	}
};

export const getSuggestedUsers = async (id) => {
	try {
		const following = (await firebaseApp.database().ref(`/users/${id}/following/`).once('value')).val() || [];
		const users = (await firebaseApp.database().ref(`/users/`).once('value')).val();

		var suggested_users = Object.keys(users).map((user_id) => {
			if (user_id !== id && following.indexOf(user_id) === -1) return { ...users[user_id], id: user_id, isFollowing: false };
			else return null;
		});

		suggested_users = suggested_users.filter((user) => user).slice(0, 6);

		return suggested_users;
	} catch (err) {
		console.log(err);
	}
};

export const addToFollowers = async (id, user_id) => {
	try {
		var following = (await firebaseApp.database().ref(`/users/${id}/following/`).once('value')).val() || [];

		following.push(user_id);

		await firebaseApp.database().ref(`/users/${id}/following/`).set(following);
	} catch (err) {
		console.log(err);
	}
};

export const uploadImage = (image, ininame) => {
	return new Promise(async (resolve, reject) => {
		try {
			let name = ininame || image.name;
			const ref = firebaseApp.storage().ref().child(name).put(image);
			ref.on(
				'state_changed',
				() => {},
				() => {},
				() => {
					firebaseApp
						.storage()
						.ref()
						.child(name)
						.getDownloadURL()
						.then((url) => {
							resolve(url);
						});
				}
			);
		} catch (err) {
			reject(err);
		}
	});
};
