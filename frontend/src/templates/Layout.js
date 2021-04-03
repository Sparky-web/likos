import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

import "../css/General.css"
import SEO from "./SEO";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#ff6b35",
            contrastText: "#FFFFFF"
        },
        secondary: {
            main: "#2C365E",
        },
        type: "light"
    },
    typography: {}
});

function Layout(props) {
    return (
        <React.StrictMode>
            <SEO />
            <ThemeProvider theme={theme}>

                <header><Navbar/></header>
                <main>
                    {props.children}
                </main>
                <footer><Footer/></footer>

            </ThemeProvider>
        </React.StrictMode>
    );
}

export default Layout;