import axios from 'axios';
import {parseJwt} from "./helpers";

const {
    REACT_APP_COCKTAIL_SERVICE_PORT
} = process.env

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.accessToken) {
        return {
            Authorization: "Bearer " + user.accessToken,
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        };
    } else {
        return {};
    }
}

export const registerUser = async (username, email, password) => {
    try {
        const response = await cocktailServiceAPI.post(`/auth/signup`, {username, email, password});
        return response.data.message;
    } catch (error) {
        if (error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Please try again later.')
        }
    }
};

export const logoutUser = () => {
    localStorage.removeItem("user");
};

export const loginUser = async (username, password) => {
    try {
        const response = await cocktailServiceAPI.post(`/auth/signin`, {username, password});

        const user = response.data;

        if (user.accessToken) {
            localStorage.setItem("user", JSON.stringify(user));
        }

        return user;
    } catch (error) {
        if (error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Please try again later.')
        }
    }
};

export const getCocktail = async (cocktailId) => {
    try {
        const response = await cocktailServiceAPI.get(`/api/v1/cocktails/${cocktailId}`, {headers: authHeader()});
        return response.data;
    } catch (error) {
        if (error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Error fetching data. Please try again later.')
        }
    }
};

export const getGlasses = async () => {
    try {
        const response = await cocktailServiceAPI.get(`/api/v1/cocktails/glasses`, {headers: authHeader()});
        return response.data;
    } catch (error) {
        if (error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Error fetching data. Please try again later.')
        }
    }
};

export const getIngredients = async () => {
    try {
        const response = await cocktailServiceAPI.get(`/api/v1/cocktails/ingredients`, {headers: authHeader()});
        return response.data;
    } catch (error) {
        if (error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Error fetching data. Please try again later.')
        }
    }
};

export const getFilteredCocktails = async (page, query) => {
    try {
        const response = await cocktailServiceAPI.post(`/api/v1/cocktails/query?page=${page}`,
            query,
            {headers: authHeader()});
        return response.data;
    } catch (error) {
        if (error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Error fetching data. Please try again later.')
        }
    }
};

export const getFilteredPendingCocktails = async (page, query) => {
    try {
        const response = await cocktailServiceAPI.post(`/api/v1/cocktails/query?page=${page}&status=PENDING`,
            query,
            {headers: authHeader()});
        return response.data;
    } catch (error) {
        if (error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Error fetching data. Please try again later.')
        }
    }
};

export const createCocktail = async (cocktailData) => {
    try {
        const response = await cocktailServiceAPI.post(`/api/v1/cocktails`,
            cocktailData,
            {headers: authHeader()});
        return response.data;
    } catch (error) {
        if (error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Error creating data. Please try again later.')
        }
    }
};

export const updateCocktail = async (cocktailId, cocktailData) => {
    try {
        const response = await cocktailServiceAPI.put(`/api/v1/cocktails/${cocktailId}`,
            cocktailData,
            {headers: authHeader()});
        return response.data;
    } catch (error) {
        if (error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Error updating data. Please try again later.')
        }
    }
};

export const deleteCocktail = async (cocktailId) => {
    try {
        const response = await cocktailServiceAPI.delete(`/api/v1/cocktails/${cocktailId}`,
            null,
            {headers: authHeader()});
        return response.data;
    } catch (error) {
        if (error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Error deleting data. Please try again later.')
        }
    }
};

export const approveCocktail = async (cocktailId) => {
    try {
        const response = await cocktailServiceAPI.put(`/api/v1/cocktails/${cocktailId}/approve`,
            null,
            {headers: authHeader()});
        return response.data;
    } catch (error) {
        if (error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Error approving data. Please try again later.')
        }
    }
};

export const cocktailServiceAPI = axios.create({
    baseURL: `http://localhost:${REACT_APP_COCKTAIL_SERVICE_PORT}`
})

cocktailServiceAPI.interceptors.request.use(function (config) {
    if (config.headers.Authorization) {
        const token = config.headers.Authorization.split(' ')[1]
        const data = parseJwt(token)
        if (Date.now() > data.exp * 1000) {
            logoutUser();
            window.location.href = "/login"
        }
    }
    return config
}, function (error) {
    return Promise.reject(error)
})