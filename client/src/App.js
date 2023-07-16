import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import NavigationMenu from './components/NavigationMenu';
import CocktailsPage from './pages/CocktailsPage';
import CocktailPage from './pages/CocktailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from "./pages/AboutPage";
import AddCocktailPage from "./pages/AddCocktailPage";
import HomePage from "./pages/HomePage";
import PendingCocktailsPage from "./pages/PendingCocktailsPage";
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import {CssBaseline} from '@material-ui/core';
import EditCocktailPage from "./pages/EditCocktailPage";

const theme = createTheme({
    palette: {
        primary: {
            main: '#ff5722',
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Provider store={store}>
                <Router>
                    <NavigationMenu/>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/cocktails" element={<CocktailsPage/>}/>
                        <Route path="/cocktails/:id" element={<CocktailPage/>}/>
                        <Route path="/cocktails/:id/edit" element={<EditCocktailPage/>}/>
                        <Route path="/add-cocktail" element={<AddCocktailPage/>}/>
                        <Route path="/pending-cocktails" element={<PendingCocktailsPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/about" element={<AboutPage/>}/>
                    </Routes>
                </Router>
            </Provider>
        </ThemeProvider>
    );
};

export default App;
