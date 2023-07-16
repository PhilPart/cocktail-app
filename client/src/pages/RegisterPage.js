import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../actions/authActions';
import {Button, makeStyles, Snackbar, TextField, Typography} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import {AccountCircle, Email, Lock} from '@material-ui/icons';

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

const RegistrationForm = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const classes = useStyles();

    const error = useSelector((state) => state.auth.error);

    useEffect(() => {
        if (error) {
            setOpenErrorSnackbar(true);
        }
    }, [error]);

    const handleRegistration = (e) => {
        e.preventDefault();
        dispatch(register(username, email, password));
        setUsername('');
        setPassword('');
        setEmail('');

        setOpenErrorSnackbar(true);
    };

    const handleSuccessSnackbarClose = () => {
        setOpenSuccessSnackbar(false);
    };

    const handleErrorSnackbarClose = () => {
        setOpenErrorSnackbar(false);
    };

    return (
        <>
            <form className={classes.form} onSubmit={handleRegistration}>
                <Typography variant="h4" className={classes.title}>
                    Registration
                </Typography>
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
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={classes.input}
                    required
                    InputProps={{
                        startAdornment: <Email/>,
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
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                    Register
                </Button>
            </form>
            <Snackbar
                open={openSuccessSnackbar}
                autoHideDuration={5000}
                onClose={handleSuccessSnackbarClose}
            >
                <Alert onClose={handleSuccessSnackbarClose} severity="success">
                    Registration Successful!
                </Alert>
            </Snackbar>
            <Snackbar open={openErrorSnackbar} autoHideDuration={5000} onClose={handleErrorSnackbarClose}>
                <Alert onClose={handleErrorSnackbarClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </>
    );
};

export default RegistrationForm;
