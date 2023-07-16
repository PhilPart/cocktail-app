import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    makeStyles,
    Snackbar,
    Typography,
} from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
    fetchFilteredPendingCocktails,
    fetchGlasses,
    fetchIngredients,
    resetCocktails,
} from '../actions/cocktailsActions';
import {useLocation} from 'react-router-dom';
import jwtDecode from "jwt-decode";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: theme.spacing(2),
        backgroundColor: '#f5f5f5',
    },
    container: {
        display: 'flex',
        maxWidth: '80%',
    },
    cardsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: theme.spacing(2),
    },
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: theme.spacing(2),
    },
    card: {
        width: 280,
        boxShadow: theme.shadows[2],
        borderRadius: theme.spacing(1),
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
            boxShadow: theme.shadows[4],
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    cardMedia: {
        height: 200,
        objectFit: 'cover',
        borderTopLeftRadius: theme.spacing(1),
        borderTopRightRadius: theme.spacing(1),
    },
    cardContent: {
        padding: theme.spacing(2),
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    cardText: {
        marginBottom: theme.spacing(1),
        flexGrow: 1,
    },
    viewDetailsButton: {
        marginTop: 'auto',
    },
    loaderContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(2),
    },
    endMessage: {
        textAlign: 'center',
        margin: theme.spacing(2),
    },
    formTitle: {
        marginBottom: theme.spacing(1),
        fontWeight: 'bold',
    },
    selectFormControl: {
        minWidth: 200,
        marginBottom: theme.spacing(2),
    },
}));

const PendingCocktailsPage = () => {
    const dispatch = useDispatch();
    const cocktails = useSelector((state) => state.cocktails.cocktails);
    const total = useSelector((state) => state.cocktails.total);
    const glasses = useSelector((state) => state.cocktails.glasses);
    const ingredients = useSelector((state) => state.cocktails.ingredients);
    const user = useSelector((state) => state.auth.user);
    const [formValues] = useState({
        searchQuery: '',
        selectedGlasses: [],
        selectedIngredients: [],
    });
    let isAdmin = false;
    if (user) {
        const accessToken = user.accessToken;
        isAdmin = accessToken && jwtDecode(accessToken).rol.includes('ADMIN');
    }
    const [page, setPage] = useState(0);
    const [loading] = useState(false);
    const classes = useStyles();
    const location = useLocation();
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const error = useSelector((state) => state.cocktails.error);

    useEffect(() => {
        if (error) {
            setOpenErrorSnackbar(true);
        }
    }, [error]);

    useEffect(() => {
        dispatch(resetCocktails());
    }, [dispatch, location]);

    useEffect(() => {
        if (glasses.length === 0) {
            dispatch(fetchGlasses());
        }
        if (ingredients.length === 0) {
            dispatch(fetchIngredients());
        }
    }, [dispatch]);

    useEffect(() => {
        const filteredValues = removeEmptyValues(formValues);
        dispatch(fetchFilteredPendingCocktails(page, filteredValues));
    }, [dispatch, page]);

    const removeEmptyValues = (formValues) => {
        const filteredValues = {...formValues};
        for (const key in filteredValues) {
            if (filteredValues.hasOwnProperty(key)) {
                const value = filteredValues[key];
                if (value === undefined || value === '' || value.length === 0) {
                    filteredValues[key] = null;
                }
            }
        }
        return filteredValues;
    };

    const handleErrorSnackbarClose = () => {
        setOpenErrorSnackbar(false);
    };

    const handleLoadMore = () => {
        if (!loading) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const hasMore = total > cocktails.length;
    const hasCocktails = cocktails.length > 0;

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                {isAdmin ? (
                    <>
                        {hasCocktails ? (
                            <div className={classes.cardsContainer}>
                                <InfiniteScroll
                                    dataLength={cocktails.length}
                                    next={handleLoadMore}
                                    hasMore={hasMore}
                                    loader={
                                        <div className={classes.loaderContainer}>
                                            <CircularProgress/>
                                        </div>
                                    }
                                    endMessage={
                                        <Typography variant="body2" className={classes.endMessage}>
                                            No more cocktails to load.
                                        </Typography>
                                    }
                                >
                                    <div className={classes.cardContainer}>
                                        {cocktails.map((cocktail) => (
                                            <Card key={cocktail.id} className={classes.card}>
                                                <CardMedia
                                                    component="img"
                                                    alt={cocktail.name}
                                                    image={cocktail.image || 'placeholder.jpg'}
                                                    title={cocktail.name}
                                                    className={classes.cardMedia}
                                                />
                                                <CardContent className={classes.cardContent}>
                                                    <Typography
                                                        variant="h6"
                                                        component="h2"
                                                        className={classes.cardText}
                                                    >
                                                        {cocktail.name}
                                                    </Typography>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        className={classes.viewDetailsButton}
                                                        href={`/cocktails/${cocktail.id}`}
                                                    >
                                                        View Details
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </InfiniteScroll>
                            </div>
                        ) : (
                            <Typography variant="h4" className={classes.endMessage}>
                                No more cocktails to load.
                            </Typography>
                        )}
                    </>
                ) : (
                    <Typography variant="body1">You are not authorized to access this page.</Typography>
                )}
            </div>
            <Snackbar open={openErrorSnackbar} autoHideDuration={5000} onClose={handleErrorSnackbarClose}>
                <Alert onClose={handleErrorSnackbarClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default PendingCocktailsPage;