import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Checkbox,
    Chip,
    CircularProgress,
    FormControl,
    FormControlLabel,
    Input,
    InputLabel,
    makeStyles,
    MenuItem,
    Select, Snackbar,
    TextField,
    Typography,
} from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';

import {fetchFilteredCocktails, fetchGlasses, fetchIngredients, resetCocktails,} from '../actions/cocktailsActions';
import {useLocation} from 'react-router-dom';
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
    filtersContainer: {
        width: 300,
        position: 'sticky',
        top: 0,
        alignSelf: 'flex-start',
        marginRight: theme.spacing(2),
        padding: theme.spacing(2),
        backgroundColor: '#ffffff',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: theme.spacing(1),
    },
    cardsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: theme.spacing(2),
        maxWidth: 'calc(100% - 300px)',
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

const CocktailsPage = () => {
    const dispatch = useDispatch();
    const cocktails = useSelector((state) => state.cocktails.cocktails);
    const total = useSelector((state) => state.cocktails.total);
    const glasses = useSelector((state) => state.cocktails.glasses);
    const ingredients = useSelector((state) => state.cocktails.ingredients);
    const [formValues, setFormValues] = useState({
        searchQuery: '',
        selectedGlasses: [],
        selectedIngredients: [],
    });
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
        dispatch(fetchFilteredCocktails(page, filteredValues));
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

    const handleSearch = (e) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            searchQuery: e.target.value,
        }));
    };

    const handleGlassFilter = (e) => {
        const {value, checked} = e.target;
        setFormValues((prevValues) => {
            if (checked) {
                return {
                    ...prevValues,
                    selectedGlasses: [...prevValues.selectedGlasses, value],
                };
            } else {
                return {
                    ...prevValues,
                    selectedGlasses: prevValues.selectedGlasses.filter((glass) => glass !== value),
                };
            }
        });
    };

    const handleIngredientFilter = (e) => {
        const {value, checked} = e.target;
        setFormValues((prevValues) => {
            if (checked) {
                return {
                    ...prevValues,
                    selectedIngredients: [...prevValues.selectedIngredients, value],
                };
            } else {
                return {
                    ...prevValues,
                    selectedIngredients: prevValues.selectedIngredients.filter(
                        (ingredient) => ingredient !== value
                    ),
                };
            }
        });
    };

    const handleClearFilters = () => {
        setFormValues({
            searchQuery: '',
            selectedGlasses: [],
            selectedIngredients: [],
        });
        setPage(0);
        dispatch(resetCocktails());
        dispatch(fetchFilteredCocktails(0, {}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPage(0);
        dispatch(resetCocktails());
        dispatch(fetchFilteredCocktails(0, removeEmptyValues(formValues)));
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
                <div className={classes.filtersContainer}>
                    <Typography variant="h6" gutterBottom>
                        Filters
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Typography variant="subtitle1" className={classes.formTitle}>
                            Search by Name
                        </Typography>
                        <TextField
                            label="Search by Name"
                            value={formValues.searchQuery}
                            onChange={handleSearch}
                            fullWidth
                        />

                        <FormControl className={classes.selectFormControl}>
                            <InputLabel>Filter by Glass</InputLabel>
                            <Select
                                multiple
                                value={formValues.selectedGlasses}
                                onChange={handleGlassFilter}
                                input={<Input/>}
                                renderValue={(selected) => (
                                    <div>
                                        {selected.map((value) => (
                                            <Chip
                                                key={value}
                                                label={glasses.find((glass) => glass.id === value)?.name}
                                            />
                                        ))}
                                    </div>
                                )}
                            >
                                {glasses.map((glass) => (
                                    <MenuItem key={glass.id} value={glass.id}>
                                        <FormControlLabel
                                            key={glass.id}
                                            control={
                                                <Checkbox
                                                    checked={formValues.selectedGlasses.includes(glass.id.toString())}
                                                    onChange={handleGlassFilter}
                                                    value={glass.id.toString()}
                                                />
                                            }
                                            label={glass.name}
                                        />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl className={classes.selectFormControl}>
                            <InputLabel>Filter by Ingredient</InputLabel>
                            <Select
                                multiple
                                value={formValues.selectedIngredients}
                                onChange={handleIngredientFilter}
                                input={<Input/>}
                                renderValue={(selected) => (
                                    <div>
                                        {selected.map((value) => (
                                            <Chip
                                                key={value}
                                                label={ingredients.find((ingredient) => ingredient.id === value)?.name}
                                            />
                                        ))}
                                    </div>
                                )}
                            >
                                {ingredients.map((ingredient) => (
                                    <MenuItem key={ingredient.id} value={ingredient.id}>
                                        <FormControlLabel
                                            key={ingredient.id}
                                            control={
                                                <Checkbox
                                                    checked={formValues.selectedIngredients.includes(ingredient.id.toString())}
                                                    onChange={handleIngredientFilter}
                                                    value={ingredient.id.toString()}
                                                />
                                            }
                                            label={ingredient.name}
                                        />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button type="submit" variant="contained" color="primary">
                            Apply
                        </Button>

                        {formValues.searchQuery ||
                        formValues.selectedGlasses.length > 0 ||
                        formValues.selectedIngredients.length > 0 ? (
                            <Button
                                className={classes.clearButton}
                                onClick={handleClearFilters}
                            >
                                Clear Filters
                            </Button>
                        ) : null}
                    </form>
                </div>
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
                                            image={cocktail.image}
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
            </div>
            <Snackbar open={openErrorSnackbar} autoHideDuration={5000} onClose={handleErrorSnackbarClose}>
                <Alert onClose={handleErrorSnackbarClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CocktailsPage;
