import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { auth, provider } from '../../firebase';

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../globalStyles";
import { lightTheme, darkTheme } from "../theme";

import '../Login/Login.css';

const Login = () => {

    const [theme, setTheme] = useState('light');
    const themeToggler = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light')
    }

    const signIn = () => {
        auth.signInWithPopup(provider)
            .catch(err => alert(err.message));
    }

    return (

        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <>
                <GlobalStyles />
                <div className="login">
                    <button className="login__toggle" onClick={themeToggler}>Toggle Dark Mode</button>
                    <div className="login__logo">
                        <img src="https://image.freepik.com/free-vector/messages-concept-illustration_114360-583.jpg" alt="" />

                        <h1>Epistle</h1>
                    </div>
                    <Button onClick={signIn} className="login__signin">Sign-In</Button>
                </div>
            </>
        </ThemeProvider>
    )
}

export default Login;