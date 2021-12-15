import firebaseApp from 'configs/firebase-config';

export const create_discussion = async (auth, title, description) => {
	try {
		const new_discussion = {
			user_id: auth.uid,
			user_name: auth.displayName,
			user_picture: auth.photoURL,
			title: title,
			description: description,
		};

		await firebaseApp.database().ref('/discussions/').push(new_discussion);
	} catch (err) {
		throw err;
	}
};

export const add_comment = async (discussion_id, comment, user, user_id) => {
	var comments = (await firebaseApp.database().ref(`/discussions/${discussion_id}/comments/`).once('value')).val() || [];

	const new_comment = {
		user_id: user_id,
		user_picture: user.photoUrl,
		user_name: user.displayName,
		discussion_id: discussion_id,
		text: comment,
	};

	console.log({ new_comment });

	comments.push(new_comment);

	await firebaseApp.database().ref(`/discussions/${discussion_id}/comments/`).set(comments);
};

export const get_discussions = async (id) => {
	const following = (await firebaseApp.database().ref(`/users/${id}/following/`).once('value')).val() || [];

	const discussions = (await firebaseApp.database().ref(`/discussions/`).once('value')).val() || [];

	var user_discussions = Object.keys(discussions).map((key) => {
		const discussion = discussions[key];
		if (discussion.user_id === id || following.indexOf(discussion.user_id) >= 0) return { ...discussion, discussion_id: key };
		else return null;
	});

	user_discussions = user_discussions.filter((dis) => !!dis);

	return user_discussions;
};
