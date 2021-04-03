import React from 'react';
import CartContextProvider from "./src/components/CartContext";

export const wrapPageElement = ({ element, props }) => {
    return (<CartContextProvider>{element}</CartContextProvider>)
}