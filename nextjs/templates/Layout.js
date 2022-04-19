import React from 'react';
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

import {createTheme, ThemeProvider} from '@mui/material/styles';

// import SEO from "./SEO";

const theme = createTheme({
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
            {/* <SEO /> */}
            <ThemeProvider theme={theme}>
                {/* <header><Navbar/></header> */}
                <main>
                    {props.children}
                </main>
                {/* <footer><Footer/></footer> */}
            </ThemeProvider>
        </React.StrictMode>
    );
}

export default Layout;