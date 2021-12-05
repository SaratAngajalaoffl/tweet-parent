import { Button, ButtonBase, Grid, Hidden, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, Paper, TextField } from '@material-ui/core';
import firebaseApp from 'configs/firebase-config';
import React, { useEffect, useState } from 'react';
import { handle_logout } from 'services/firebase/login-services';
import { addToFollowers, getSuggestedUsers, getUserData } from 'services/firebase/profile-services';
import CreateIcon from '@material-ui/icons/Create';
import CreatePostDialog from './CreatePostDialog';
import CheckIcon from '@material-ui/icons/Check';
import { add_comment, get_discussions } from 'services/firebase/discussion-service';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import { get_detection } from 'services/detection/bullying-detection';
import useSnackbar, { types } from 'utils/snackbar';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		width: 200,
		height: 200,
	},
	discussion_avatar: {
		width: 50,
		height: 50,
	},
}));

function DashboardScreen() {
	const classes = useStyles();
	const [user, setUser] = useState(null);
	const [suggestedUsers, setSuggestedUsers] = useState([]);
	const [userData, setUserData] = useState(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [discussions, setDiscussions] = useState([]);
	const [expanded, setExpanded] = useState(null);
	const [comment, setComment] = useState('');
	const openSnackbar = useSnackbar();

	useEffect(() => {
		firebaseApp.auth().onAuthStateChanged((auth) => {
			setUser(auth);
		});
	}, []);

	useEffect(() => {
		(async () => {
			if (!!user) setUserData(await getUserData(user.uid));
		})();
	}, [user]);

	useEffect(() => {
		console.log({ userData });
	}, [userData]);

	useEffect(() => {
		(async () => {
			if (!!user) setSuggestedUsers(await getSuggestedUsers(user.uid));
		})();
	}, [user]);

	useEffect(() => {
		(async () => {
			if (!!user) setDiscussions(await get_discussions(user.uid));
		})();
	}, [user]);

	useEffect(() => {
		if (!expanded) setComment('');
	}, [expanded]);

	const handleFollowIconChange = (ind) => {
		var list = suggestedUsers;
		list[ind].isFollowing = true;
		console.log({ list });
		setSuggestedUsers([...list]);
	};

	const handleFollow = async (ind) => {
		try {
			await addToFollowers(user.uid, suggestedUsers[ind].id);
			handleFollowIconChange(ind);
		} catch (err) {
			console.log(err);
		}
	};

	const handleExpandClick = async (ind) => {
		if (expanded === ind) setExpanded(null);
		else setExpanded(ind);
	};

	const handleAddComment = async (discussion_id) => {
		try {
			const discussion_comment = comment;
			setComment('');
			openSnackbar(`Adding Comment!`, types.SNACKBAR_INFO, 5000);
			const { detection } = await get_detection(discussion_comment);
			openSnackbar(`Detection Returned by the model is ${detection}!`, types.SNACKBAR_INFO, 8000);
			await add_comment(discussion_id, discussion_comment, userData, user.uid);
			setDiscussions(await get_discussions(user.uid));
		} catch (err) {
			console.log(err.message);
		}
	};

	if (!user) return null;

	if (isDialogOpen) return <CreatePostDialog setIsDialogOpen={setIsDialogOpen} user={user} />;

	return (
		<div className='container-login100' style={{ backgroundImage: 'url("assets/bg-01.jpg")', width: '100%' }}>
			<Grid style={{ height: '98vh' }} container spacing={2}>
				<Hidden mdDown>
					<Grid style={{ display: 'flex' }} item xs={3}>
						<Paper style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'start' }} elevation={5}>
							<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
								<Avatar className={classes.avatar} src={user.photoURL} />
							</div>
							<h3 style={{ textAlign: 'center', padding: 40 }}>{user.displayName}</h3>
							<div style={{ flex: 1 }}>
								<h4 style={{ textAlign: 'start', padding: 20 }}>Suggested Users</h4>
								<List dense={false}>
									{suggestedUsers.length > 0 && (
										<>
											{suggestedUsers.map((suggested_user, ind) => (
												<ListItem style={{ width: '100%' }}>
													<ListItemAvatar>
														<Avatar src={suggested_user.photoUrl} />
													</ListItemAvatar>
													<ListItemText primary={suggested_user.displayName} />
													<ListItemSecondaryAction>
														{suggested_user.isFollowing ? (
															<CheckIcon style={{ color: 'blue' }} />
														) : (
															<Button variant='outlined' color='primary' onClick={() => handleFollow(ind)}>
																Follow
															</Button>
														)}
													</ListItemSecondaryAction>
												</ListItem>
											))}
										</>
									)}
								</List>
							</div>
							<Button variant='outlined' color='secondary' onClick={handle_logout}>
								Log Out
							</Button>
						</Paper>
					</Grid>
				</Hidden>
				<Grid style={{ display: 'flex' }} item xs={12} md={9}>
					<div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
						<Paper onClick={() => setIsDialogOpen(true)} style={{ margin: 10, marginTop: 0, flex: 1, backgroundColor: 'whitesmoke', display: 'flex', flexDirection: 'row', justifyContent: 'center' }} component={ButtonBase} elevation={5}>
							<CreateIcon />
							<Typography style={{ paddingLeft: 10 }} variant='button'>
								Create a new post
							</Typography>
						</Paper>
						<Paper style={{ margin: 10, marginBottom: 0, flex: 19, display: 'flex' }} component='div' elevation={5}>
							{discussions.length === 0 ? (
								<div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
									<h1>No Active Discussions</h1>
								</div>
							) : (
								<div style={{ width: '100%', padding: 20 }}>
									{discussions.map((discussion, ind) => (
										<Card className={classes.root}>
											<CardHeader
												action={
													<IconButton onClick={() => handleExpandClick(ind)} aria-expanded={expanded === ind} aria-label='show more'>
														{expanded === ind ? <CloseIcon /> : <ChatBubbleIcon />}
													</IconButton>
												}
												avatar={<Avatar aria-label='recipe' className={classes.discussion_avatar} src={discussion.user_picture} />}
												title={discussion.title}
												subheader={discussion.user_name}
											/>
											<CardContent>
												<Typography variant='body2' color='textSecondary' component='p'>
													{discussion.description}
												</Typography>
											</CardContent>
											<CardActions disableSpacing></CardActions>
											<Collapse in={expanded === ind} timeout='auto' unmountOnExit>
												<h3 style={{ padding: 20 }}>Comments</h3>
												<Card className={classes.root}>
													<CardHeader
														action={
															<IconButton onClick={() => handleAddComment(discussion.discussion_id)}>
																<SendIcon />
															</IconButton>
														}
														avatar={<Avatar aria-label='recipe' className={classes.discussion_avatar} src={userData.photoUrl} />}
														title={<TextField autoFocus label='Enter Comment Here...' variant='standard' fullWidth value={comment} onChange={(e) => setComment(e.target.value)} />}
													/>
												</Card>
												{discussion.comments?.map((comment) => (
													<Card className={classes.root}>
														<CardHeader avatar={<Avatar aria-label='recipe' className={classes.discussion_avatar} src={comment.user_picture} />} title={comment.user_name} subheader={comment.text} />
													</Card>
												))}
											</Collapse>
										</Card>
									))}
								</div>
							)}
						</Paper>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}

export default DashboardScreen;
