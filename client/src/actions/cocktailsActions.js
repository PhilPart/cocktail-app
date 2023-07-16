import * as api from "../services/api";
import {
    createCocktail,
    getCocktail,
    getFilteredCocktails,
    getFilteredPendingCocktails,
    getGlasses,
    getIngredients,
    updateCocktail
} from "../services/api";

export const fetchFilteredCocktails = (page, query) => {
    return async (dispatch) => {
        try {
            dispatch({type: 'FETCH_COCKTAILS_REQUEST'});
            const response = await getFilteredCocktails(page, query);
            console.log(response)
            dispatch({type: 'FETCH_COCKTAILS_SUCCESS', payload: response});
        } catch (error) {
            dispatch({type: 'FETCH_COCKTAILS_FAILURE', payload: error.message});
        }
    };
};

export const fetchFilteredPendingCocktails = (page, query) => {
    return async (dispatch) => {
        try {
            dispatch({type: 'FETCH_COCKTAILS_REQUEST'});
            const response = await getFilteredPendingCocktails(page, query);
            dispatch({type: 'FETCH_COCKTAILS_SUCCESS', payload: response});
        } catch (error) {
            dispatch({type: 'FETCH_COCKTAILS_FAILURE', payload: error.message});
        }
    };
};

export const resetCocktails = () => {
    return {
        type: 'RESET_COCKTAILS',
    };
};

export const getCocktailById = (cocktailId) => {
    return async (dispatch) => {
        try {
            const response = await getCocktail(cocktailId);
            dispatch({type: 'FETCH_COCKTAIL_SUCCESS', payload: response});
        } catch (error) {
            dispatch({type: 'FETCH_COCKTAIL_FAILURE', payload: error.message});
        }
    };
};

export const fetchGlasses = () => {
    return async (dispatch) => {
        try {
            const response = await getGlasses();
            dispatch({type: 'FETCH_GLASSES_SUCCESS', payload: response});
        } catch (error) {
            dispatch({type: 'FETCH_GLASSES_FAILURE', payload: error.message});
        }
    };
};

export const fetchIngredients = () => {
    return async (dispatch) => {
        try {
            const response = await getIngredients();
            dispatch({type: 'FETCH_INGREDIENTS_SUCCESS', payload: response});
        } catch (error) {
            dispatch({type: 'FETCH_INGREDIENTS_FAILURE', payload: error.message});
        }
    };
};

export const addCocktail = (cocktail) => {
    return async (dispatch) => {
        try {
            await createCocktail(cocktail);
            dispatch({type: 'ADD_COCKTAIL_SUCCESS'});
        } catch (error) {
            dispatch({type: 'ADD_COCKTAIL_FAILURE', payload: error.message});
        }
    };
};

export const editCocktail = (cocktailId, cocktail) => {
    return async (dispatch) => {
        try {
            const response = await updateCocktail(cocktailId, cocktail);
            dispatch({type: 'EDIT_COCKTAIL_SUCCESS', payload: response.data});
        } catch (error) {
            dispatch({type: 'EDIT_COCKTAIL_FAILURE', payload: error.message});
        }
    };
};

export const deleteCocktail = (cocktailId) => {
    return async (dispatch) => {
        try {
            await api.deleteCocktail(cocktailId);
            dispatch({type: 'DELETE_COCKTAIL_SUCCESS'});
        } catch (error) {
            dispatch({type: 'DELETE_COCKTAIL_FAILURE', payload: error.message});
        }
    };
};

export const approveCocktail = (cocktailId) => {
    return async (dispatch) => {
        try {
            await api.approveCocktail(cocktailId);
            dispatch({type: 'APPROVE_COCKTAIL_SUCCESS'});
        } catch (error) {
            dispatch({type: 'APPROVE_COCKTAIL_FAILURE', payload: error.message});
        }
    };
};
