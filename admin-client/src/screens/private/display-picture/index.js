import './main.css';
import './util.css';

import React, { useState } from 'react';
import { Avatar, Box, makeStyles, Grid } from '@material-ui/core';

import firebaseApp from 'configs/firebase-config';
import { uploadImage } from 'services/firebase/profile-services';

const useStyles = makeStyles(() => ({
	title: { textAlign: 'center', marginBottom: 100 },
	avatar: {
		height: 200,
		width: 200,
		cursor: 'pointer',
	},
}));

function UserDetailsScreen() {
	const classes = useStyles();

	const [displayName, setDisplayName] = useState('');
	const [imuri, setImuri] = useState('');

	const HandleAdd = async (e) => {
		const im = e.target.files[0];
		try {
			if (!!im) setImuri(await uploadImage(im, `${firebaseApp.auth().currentUser.uid}`));
		} catch (err) {
			console.log(err);
		}
	};

	const HandleSave = async () => {
		firebaseApp.auth().currentUser.updateProfile({
			displayName: displayName,
			photoURL: imuri,
		});
		window.location.reload();
	};

	return (
		<div>
			<div className='limiter'>
				<div className='container-login100' style={{ backgroundImage: 'url("assets/bg-01.jpg")' }}>
					<div className='wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54'>
						<h3 className={classes.title}>Add Details</h3>
						<Box alignItems='center' display='flex' flexDirection='column'>
							<input id='avatarselector' style={{ display: 'none' }} type='file' onChange={HandleAdd} accept='images/*' />
							<Avatar
								className={classes.avatar}
								src={imuri}
								alt='A'
								sizes={100}
								onClick={() => {
									document.querySelector('#avatarselector').click();
								}}
							/>
							<div style={{ height: 100 }} />
							<div className='wrap-input100 validate-input' data-validate='Password is required'>
								<input onChange={(e) => setDisplayName(e.target.value)} value={displayName} className='input100' type='text' placeholder='Full Name' />
								<span className='focus-input100' />
							</div>
						</Box>
						<div className='text-right p-t-8 p-b-31'></div>
						<div className='container-login100-form-btn'>
							<div className='wrap-login100-form-btn'>
								<div className='login100-form-bgbtn' />
								<button className='login100-form-btn' onClick={HandleSave}>
									Save
								</button>
							</div>
						</div>
						<Grid style={{ padding: '20px' }} container justifyContent='center'>
							<Grid item>
								<button onClick={HandleSave} className='txt2'>
									Skip
								</button>
							</Grid>
						</Grid>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserDetailsScreen;
