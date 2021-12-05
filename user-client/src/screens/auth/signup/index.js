import './main.css';
import './util.css';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import FacebookIcon from '@material-ui/icons/Facebook';
import GoogleIcon from '@material-ui/icons/GTranslate';
import GithubIcon from '@material-ui/icons/GitHub';

import useSnackbar, { types } from 'utils/snackbar';
import { handle_email_password_signup, handle_facebook_login, handle_github_login, handle_gmail_login } from 'services/firebase/login-services';

function SignupScreen() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const openSnackbar = useSnackbar();

	const handleNormalSignup = async () => {
		try {
			await handle_email_password_signup(email, password);
			openSnackbar('User Signed Up Successfully!', types.SNACKBAR_SUCCESS);
		} catch (err) {
			openSnackbar(err.message);
		}
	};

	const handleGoogleLogin = async () => {
		try {
			await handle_gmail_login();
			openSnackbar('User Signed Up Successfully!', types.SNACKBAR_SUCCESS);
		} catch (err) {
			openSnackbar(err.message);
		}
	};

	const handleGithubLogin = async () => {
		try {
			await handle_github_login();
			openSnackbar('User Signed Up Successfully!', types.SNACKBAR_SUCCESS);
		} catch (err) {
			openSnackbar(err.message);
		}
	};

	const handleFacebookLogin = async () => {
		try {
			await handle_facebook_login();
			openSnackbar('User Signed Up Successfully!', types.SNACKBAR_SUCCESS);
		} catch (err) {
			openSnackbar(err.message);
		}
	};

	return (
		<div>
			<div className='limiter'>
				<div className='container-login100' style={{ backgroundImage: 'url("assets/bg-01.jpg")' }}>
					<div className='wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54'>
						<span className='login100-form-title p-b-49'>Sign Up</span>
						<div className='wrap-input100 validate-input m-b-23' data-validate='Email is required'>
							<span className='label-input100'>Email</span>
							<input onChange={(e) => setEmail(e.target.value)} value={email} className='input100' type='text' placeholder='Type your email' autoComplete='none' />
							<span className='focus-input100' />
						</div>
						<div className='wrap-input100 validate-input' data-validate='Password is required'>
							<span className='label-input100'>Password</span>
							<input onChange={(e) => setPassword(e.target.value)} value={password} className='input100' type='password' placeholder='Type your password' />
							<span className='focus-input100' />
						</div>
						<div className='text-right p-t-8 p-b-31'></div>

						<div className='container-login100-form-btn'>
							<div className='wrap-login100-form-btn'>
								<div className='login100-form-bgbtn' />
								<button className='login100-form-btn' onClick={handleNormalSignup}>
									Sign Up
								</button>
							</div>
						</div>
						<div className='txt1 text-center p-t-54 p-b-20'>
							<span>Or Sign Up Using</span>
						</div>
						<div className='flex-c-m'>
							<button onPress={handleFacebookLogin} className='login100-social-item bg1'>
								<FacebookIcon />
							</button>
							<button onPress={handleGithubLogin} className='login100-social-item bg2'>
								<GithubIcon />
							</button>
							<button onPress={handleGoogleLogin} className='login100-social-item bg3'>
								<GoogleIcon />
							</button>
						</div>
						<div className='flex-col-c p-t-155'>
							<span className='txt1 p-b-17'>Or Login Using</span>
							<Link to='/' className='txt2'>
								Login
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignupScreen;
