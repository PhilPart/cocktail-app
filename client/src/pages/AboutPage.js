import React from 'react';
import { makeStyles, Typography, Grid, Box, Paper } from '@material-ui/core';
import { Search, Star, Add } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(4),
        textAlign: 'center',
    },
    title: {
        marginBottom: theme.spacing(3),
        fontWeight: 'bold',
    },
    featureContainer: {
        padding: theme.spacing(3),
    },
    featureIcon: {
        fontSize: '4rem',
        marginBottom: theme.spacing(2),
        color: theme.palette.primary.main,
    },
    featureTitle: {
        marginBottom: theme.spacing(2),
        fontWeight: 'bold',
    },
    featureDescription: {
        color: theme.palette.text.secondary,
    },
}));

const AboutPage = () => {
    const classes = useStyles();

    const features = [
        {
            icon: <Search />,
            title: 'Search Cocktails',
            description: 'Find your favorite cocktails using our powerful search feature.',
        },
        {
            icon: <Star />,
            title: 'Discover Popular Cocktails',
            description: 'Explore a curated collection of popular and trending cocktails.',
        },
        {
            icon: <Add />,
            title: 'Add Your Own Cocktails',
            description: 'Contribute to our community by sharing your own cocktail recipes.',
        },
    ];

    return (
        <Box className={classes.root}>
            <Typography variant="h4" className={classes.title}>
                About Our Website
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {features.map((feature, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper elevation={3} className={classes.featureContainer}>
                            <span className={classes.featureIcon}>{feature.icon}</span>
                            <Typography variant="h6" className={classes.featureTitle}>
                                {feature.title}
                            </Typography>
                            <Typography variant="body1" className={classes.featureDescription}>
                                {feature.description}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AboutPage;

