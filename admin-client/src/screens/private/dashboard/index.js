import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    IconButton,
    makeStyles,
    Paper,
    Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    media: {
        marginLeft: '20%',
        width: '60%',
        height: 400,
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
    const [discussions, setDiscussions] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        (async () => {
            setDiscussions([
                {
                    _id: '61ba42a1c65c6006e836d11b',
                    pictures: [
                        'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbHBhcGVyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
                        'https://images.unsplash.com/photo-1533470192478-9897d90d5461?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbHBhcGVyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
                        'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
                    ],
                    title: 'Wallpapers Post 4',
                    body: 'My Collection of Abstract Wallpapers.',
                    bullyRating: 0.6,
                    owner: {
                        _id: '61ba41cbc65c6006e836d10c',
                        authId: 'VlBgJmeU7VfYTBDikIjNjUB6VeI3',
                        username: 'user1',
                        picture:
                            'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
                        following: [],
                        __v: 0,
                    },
                    liked: [],
                    __v: 0,
                },
            ]);
        })();
    }, []);

    return (
        <div className="container-login100" style={{ backgroundImage: 'url("assets/bg-01.jpg")', width: '100%' }}>
            <Grid style={{ height: '98vh' }} container spacing={2}>
                <Grid style={{ display: 'flex' }} item xs={12} md={12}>
                    <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                        <Paper style={{ margin: 10, marginBottom: 0, flex: 19, display: 'flex' }} component="div" elevation={5}>
                            <h1 style={{ position: 'fixed', top: 40, left: 40 }}>Admin Dashboard</h1>
                            {discussions.length === 0 ? (
                                <div
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <h1>No Active Discussions</h1>
                                </div>
                            ) : (
                                <div style={{ width: '100%', padding: 20, marginTop: 60 }}>
                                    {discussions.map((discussion, ind) => (
                                        <Card className={classes.root}>
                                            <CardHeader
                                                action={
                                                    <Button
                                                        onClick={() => {}}
                                                        variant="contained"
                                                        color="primary"
                                                        // aria-expanded={expanded === ind}
                                                        aria-label="show more"
                                                    >
                                                        Allow
                                                    </Button>
                                                }
                                                avatar={
                                                    <Avatar
                                                        aria-label="recipe"
                                                        className={classes.discussion_avatar}
                                                        src={discussion.owner.picture}
                                                    />
                                                }
                                                title={discussion.title}
                                                subheader={discussion.owner.username}
                                            />
                                            <CardContent>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {discussion.body}
                                                </Typography>
                                                <CardMedia className={classes.media} image={discussion.pictures[0]} />
                                            </CardContent>
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
