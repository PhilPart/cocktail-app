import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '150vh',
        padding: theme.spacing(4),
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    title: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginBottom: theme.spacing(4),
    },
    description: {
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: theme.spacing(4),
    },
    button: {
        color: '#FFFFFF',
        borderColor: '#FFFFFF',
        borderRadius: theme.spacing(4),
        padding: theme.spacing(2, 4),
        fontWeight: 'bold',
    },
    icon: {
        marginLeft: theme.spacing(1),
    },
}));

const Home = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h2" className={classes.title}>
                Welcome to Our Website
            </Typography>
            <Typography variant="h5" className={classes.description}>
                Discover the beauty of our amazing website. Explore, learn, and have fun!
            </Typography>
        </div>
    );
};

export default Home;
