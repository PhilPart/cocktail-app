import React from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import {logout} from "../actions/authActions";
import jwtDecode from "jwt-decode";

const useStyles = makeStyles({
    title: {
        flexGrow: 1,
    },
});

const NavigationMenu = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    let isAdmin = false;
    if (user?.accessToken) {
        const accessToken = user.accessToken;
        isAdmin = accessToken && jwtDecode(accessToken).rol.includes('ADMIN');
    }
    const classes = useStyles();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Button color="inherit" component={Link} to="/">
                        Cocktail App
                    </Button>
                </Typography>
                <Button color="inherit" component={Link} to="/about">
                    About
                </Button>
                {!user ? (
                    <>
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={Link} to="/register">
                            Register
                        </Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/cocktails">
                            Cocktails
                        </Button>
                        {isAdmin && (
                            <Button color="inherit" component={Link} to="/pending-cocktails">
                                Admin Page
                            </Button>
                        )}
                        <Button color="inherit" component={Link} to="/add-cocktail">
                            Add Cocktail
                        </Button>
                        <Button onClick={handleLogout} color="inherit" component={Link} to="/logout">
                            Logout
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavigationMenu;