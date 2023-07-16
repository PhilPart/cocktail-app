import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCocktail, fetchGlasses, fetchIngredients } from '../actions/cocktailsActions';
import {Button, TextField, Grid, Typography, makeStyles, IconButton, MenuItem, Snackbar} from '@material-ui/core';
import { AddCircle, Delete } from '@material-ui/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        padding: theme.spacing(2),
    },
    form: {
        maxWidth: 600,
        margin: '0 auto',
    },
    title: {
        marginBottom: theme.spacing(3),
        textAlign: 'center',
    },
    textField: {
        marginBottom: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
    },
    ingredientRow: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
    },
    instructionRow: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
    },
    instructionText: {
        flexGrow: 1,
    },
    deleteButton: {
        marginLeft: theme.spacing(1),
    },
}));

const AddCocktailPage = () => {
    const [name, setName] = useState('');
    const [glass, setGlass] = useState('');
    const [image, setImage] = useState('');
    const [ingredients, setIngredients] = useState([{ ingredient: '', amount: '' }]);
    const [instruction, setInstruction] = useState('');
    const dispatch = useDispatch();
    const classes = useStyles();
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const error = useSelector((state) => state.cocktails.error);
    const glasses = useSelector((state) => state.cocktails.glasses);
    const ingredientList = useSelector((state) => state.cocktails.ingredients);

    useEffect(() => {
        if (error) {
            setOpenErrorSnackbar(true);
        }
    }, [error]);

    useEffect(() => {
        dispatch(fetchGlasses());
        dispatch(fetchIngredients());
    }, [dispatch]);

    const handleIngredientChange = (index, field, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index][field] = value;
        setIngredients(updatedIngredients);
    };

    const handleErrorSnackbarClose = () => {
        setOpenErrorSnackbar(false);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { ingredient: '', amount: '' }]);
    };

    const handleDeleteIngredient = (index) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients.splice(index, 1);
        setIngredients(updatedIngredients);
    };

    const handleInstructionChange = (value) => {
        setInstruction(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const cocktailIngredients = ingredients.map((ingredient) => ({
            ingredient: ingredient.ingredient,
            amount: ingredient.amount,
        }));

        const newCocktail = {
            name,
            glass,
            image,
            instruction: instruction,
            cocktailIngredients,
        };

        dispatch(addCocktail(newCocktail));

        setName('');
        setGlass('');
        setImage('');
        setIngredients([{ ingredient: '', amount: '' }]);
        setInstruction('');
    };

    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Typography variant="h4" className={classes.title}>
                    Add Cocktail
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            fullWidth
                            className={classes.textField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Glass"
                            value={glass}
                            onChange={(e) => setGlass(e.target.value)}
                            fullWidth
                            className={classes.textField}
                            select
                        >
                            {glasses.map((glass) => (
                                <MenuItem key={glass.id} value={glass.id}>
                                    {glass.name} - {glass.size}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Image URL"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            fullWidth
                            className={classes.textField}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Ingredients</Typography>
                        {ingredients.map((ingredient, index) => (
                            <div key={index} className={classes.ingredientRow}>
                                <TextField
                                    label="Ingredient"
                                    value={ingredient.ingredient}
                                    onChange={(e) =>
                                        handleIngredientChange(index, 'ingredient', e.target.value)
                                    }
                                    required
                                    fullWidth
                                    select
                                >
                                    {ingredientList.map((ingredient) => (
                                        <MenuItem key={ingredient.id} value={ingredient.id}>
                                            {ingredient.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    type="number"
                                    label="Amount"
                                    value={ingredient.amount}
                                    onChange={(e) =>
                                        handleIngredientChange(index, 'amount', e.target.value)
                                    }
                                    required
                                    fullWidth
                                />
                                <IconButton
                                    onClick={() => handleDeleteIngredient(index)}
                                    className={classes.deleteButton}
                                    color="primary"
                                >
                                    <Delete />
                                </IconButton>
                            </div>
                        ))}
                        <IconButton onClick={handleAddIngredient} color="primary">
                            <AddCircle />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Instructions</Typography>
                        <ReactQuill
                            value={instruction}
                            onChange={handleInstructionChange}
                            className={classes.instructionText}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            Add Cocktail
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Snackbar open={openErrorSnackbar} autoHideDuration={5000} onClose={handleErrorSnackbarClose}>
                <Alert onClose={handleErrorSnackbarClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default AddCocktailPage;
