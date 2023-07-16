const initialState = {
    glasses: [],
    ingredients: [],
    cocktails: [],
    total: 0,
    cocktail: null,
    loading: false,
    error: null,
    page: 0,
};

const cocktailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RESET_COCKTAILS':
            return {
                ...state,
                cocktails: [],
                page: 0
            };
        case 'FETCH_COCKTAIL_SUCCESS':
            return {
                ...state,
                cocktail: action.payload,
                error: null,
            };
        case 'FETCH_COCKTAIL_FAILURE':
            return {
                ...state,
                cocktail: null,
                error: action.payload,
            };
        case 'FETCH_COCKTAILS_SUCCESS':
            return {
                ...state,
                cocktails: [...state.cocktails, ...action.payload.cocktails],
                page: state.page + 1,
                total: action.payload.total,
                loading: false,
                error: null,
            };
        case 'FETCH_COCKTAILS_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'FETCH_COCKTAILS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
                total: 0,
            };
        case 'FETCH_GLASSES_SUCCESS':
            return {
                ...state,
                glasses: action.payload,
            };
        case 'FETCH_GLASSES_FAILURE':
            return {
                ...state,
                error: action.payload,
            };
        case 'FETCH_INGREDIENTS_SUCCESS':
            return {
                ...state,
                ingredients: action.payload,
            };
        case 'FETCH_INGREDIENTS_FAILURE':
            return {
                ...state,
                error: action.payload,
            };
        case 'ADD_COCKTAIL_SUCCESS':
            return {
                ...state,
            };
        case 'ADD_COCKTAIL_FAILURE':
            return {
                ...state,
                error: action.payload,
            };
        case 'EDIT_COCKTAIL_SUCCESS':
            const updatedCocktails = state.cocktails.map(cocktail => {
                if (cocktail.id === action.payload.id) {
                    return action.payload;
                } else {
                    return cocktail;
                }
            });
            return {
                ...state,
                cocktails: updatedCocktails,
                cocktail: action.payload
            };
        case 'EDIT_COCKTAIL_FAILURE':
            return {
                ...state,
                error: action.payload,
            };
        case 'DELETE_COCKTAIL_SUCCESS':
            return {
                ...state,
                cocktails: state.cocktails.filter(cocktail => cocktail.id !== action.payload),
            };
        case 'DELETE_COCKTAIL_FAILURE':
            return {
                ...state,
                error: action.payload,
            };
        case 'APPROVE_COCKTAIL_SUCCESS':
            return {
                ...state,
            };
        case 'APPROVE_COCKTAIL_FAILURE':
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default cocktailsReducer;