import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../actions/authActions';
import {Button, makeStyles, Snackbar, TextField, Typography} from '@material-ui/core';
import {AccountCircle, Lock} from '@material-ui/icons';
import {useNavigate} from 'react-router-dom';
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 400,
        margin: '0 auto',
    },
    title: {
        marginBottom: theme.spacing(3),
        textAlign: 'center',
    },
    input: {
        marginBottom: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));

const LoginForm = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const classes = useStyles();
    const navigate = useNavigate();

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const error = useSelector((state) => state.auth.error);

    useEffect(() => {
        if (error) {
            setOpenErrorSnackbar(true);
        } else if (isAuthenticated) {
            navigate('/cocktails');
        }
    }, [error, isAuthenticated, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(username, password));
        setUsername('');
        setPassword('');
    };

    const handleErrorSnackbarClose = () => {
        setOpenErrorSnackbar(false);
    };

    return (
        <>
            <form className={classes.form} onSubmit={handleLogin}>
                <Typography variant="h4" className={classes.title}>Login</Typography>
                <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={classes.input}
                    required
                    InputProps={{
                        startAdornment: <AccountCircle/>,
                    }}
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={classes.input}
                    required
                    InputProps={{
                        startAdornment: <Lock/>,
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    Login
                </Button>
            </form>
            <Snackbar open={openErrorSnackbar} autoHideDuration={5000} onClose={handleErrorSnackbarClose}>
                <Alert onClose={handleErrorSnackbarClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </>
    );
};

export default LoginForm;