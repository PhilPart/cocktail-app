import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useParams} from 'react-router-dom';
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    IconButton,
    makeStyles,
    Snackbar,
    Typography
} from '@material-ui/core';
import {approveCocktail, deleteCocktail, getCocktailById} from '../actions/cocktailsActions';
import ReactHtmlParser from 'react-html-parser';
import jwtDecode from 'jwt-decode';
import {Check as CheckIcon, Delete as DeleteIcon, Edit as EditIcon,} from '@material-ui/icons';
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: theme.spacing(2),
        backgroundColor: '#f5f5f5',
    },
    card: {
        maxWidth: 600,
        width: '100%',
        margin: theme.spacing(2),
        borderRadius: theme.spacing(1),
        boxShadow: theme.shadows[3],
    },
    cardContent: {
        padding: theme.spacing(2),
    },
    image: {
        width: '100%',
        height: 300,
        objectFit: 'cover',
        borderRadius: theme.spacing(1),
    },
    title: {
        marginBottom: theme.spacing(2),
    },
    glass: {
        marginBottom: theme.spacing(1),
    },
    ingredient: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    instructions: {
        marginBottom: theme.spacing(2),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(2),
    },
    button: {
        marginLeft: theme.spacing(1),
    },
    buttonGroup: {
        display: 'flex',
        marginTop: theme.spacing(2),
        alignItems: 'center',
        justifyContent: 'center',
    },
    approveButton: {
        marginRight: theme.spacing(1),
        backgroundColor: theme.palette.success.main,
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.success.dark,
        },
    },
    endMessage: {
        textAlign: 'center',
        margin: theme.spacing(2),
    },
}));

const CocktailPage = () => {
    const {id} = useParams();
    const cocktail = useSelector((state) => state.cocktails.cocktail);
    const user = useSelector((state) => state.auth.user);
    let isAdmin = false;
    if (user) {
        const accessToken = user.accessToken;
        isAdmin = accessToken && jwtDecode(accessToken).rol.includes('ADMIN');
    }
    const dispatch = useDispatch();
    const location = useLocation();
    const classes = useStyles();
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const error = useSelector((state) => state.cocktails.error);

    useEffect(() => {
        if (error) {
            setOpenErrorSnackbar(true);
        }
    }, [error]);

    useEffect(() => {
        dispatch(getCocktailById(id));
    }, [dispatch, id]);

    const handleErrorSnackbarClose = () => {
        setOpenErrorSnackbar(false);
    };

    const handleEdit = () => {
        const editUrl = `${location.pathname}/edit`;
        window.location.href = editUrl;
    };

    const handleDelete = () => {
        dispatch(deleteCocktail(id));
        window.location.href = '/pending-cocktails';
    };

    const handleApprove = () => {
        dispatch(approveCocktail(id));
        window.location.href = '/pending-cocktails';
    };

    return (
        <div className={classes.root}>
            {cocktail ? (
                <Card className={classes.card}>
                    {cocktail.image && (
                        <CardMedia
                            component="img"
                            alt={cocktail.name}
                            src={cocktail.image}
                            className={classes.image}
                        />
                    )}
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h4" className={classes.title}>
                            {cocktail.name}
                        </Typography>
                        {cocktail.glassName && cocktail.glassSize && (
                            <Typography variant="subtitle1" className={classes.glass}>
                                Glass: {cocktail.glassName} - {cocktail.glassSize} ml
                            </Typography>
                        )}
                        {cocktail.cocktailIngredients.length > 0 && (
                            <div>
                                <Typography variant="subtitle1">Ingredients:</Typography>
                                <div>
                                    {cocktail.cocktailIngredients.map((ingredient) => (
                                        <Chip
                                            key={ingredient.ingredient.id}
                                            label={`${ingredient.name} - ${ingredient.amount}`}
                                            className={classes.ingredient}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        {cocktail.instruction && (
                            <div className={classes.instructions}>
                                <Typography variant="subtitle1">Instructions:</Typography>
                                <Typography variant="body1">
                                    {ReactHtmlParser(cocktail.instruction)}
                                </Typography>
                            </div>
                        )}
                        {isAdmin && (
                            <CardContent className={classes.cardContent}>
                                <div className={classes.buttonGroup}>
                                    {cocktail.status === 'PENDING' && (
                                        <IconButton
                                            onClick={handleApprove}
                                            className={classes.approveButton}
                                        >
                                            <CheckIcon/>
                                        </IconButton>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<EditIcon/>}
                                        onClick={handleEdit}
                                        className={classes.button}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<DeleteIcon/>}
                                        onClick={handleDelete}
                                        className={classes.button}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        )}
                    </CardContent>
                </Card>
            ) : (
                <Typography variant="h4" className={classes.endMessage}>
                    Cocktail not found.
                </Typography>
            )}
            <Snackbar open={openErrorSnackbar} autoHideDuration={5000} onClose={handleErrorSnackbarClose}>
                <Alert onClose={handleErrorSnackbarClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CocktailPage;
