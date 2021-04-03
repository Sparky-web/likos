import React, {createContext, useRef, useState} from 'react';

export const AppContext = createContext(null)

export function AppProvider(props) {
    const [items, setItems] = useState([])
    const orderRef = useRef()
    const tableRef = useRef()
    const formRef = useRef()

    return (
        <AppContext.Provider value={{items, setItems, orderRef, tableRef, formRef}}>
            {props.children}
        </AppContext.Provider>
    );
}
