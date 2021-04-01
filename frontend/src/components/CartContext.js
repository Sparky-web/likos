import React, {createContext, useEffect, useRef, useState} from 'react';
import Cookies from "universal-cookie";
import axios from "axios";

export const CartContext = createContext({});

const CartContextProvider = (props) => {
    const [cart, setCart] = useState(null)
    const [isError, setIsError] = useState(false)


    const updateCart = async () => {
        setIsError(false)
        try {
            const cookies = new Cookies()
            let id = cookies.get("id")

            if (!id) {
                const {data: {id: newId}} = await axios.post(`${process.env.GATSBY_BACKEND_URL}/carts`, {data: []})
                cookies.set("id", newId, {path: "/"})
                await updateCart()
                return;
            }
            const {data} = await axios.get(`${process.env.GATSBY_BACKEND_URL}/carts/${id}`)
                .catch(err => {
                    if (err.response) {
                        if (err.response.status === 404) return {}
                        else throw new Error(err)
                    }
                })

            if (!data) {
                cookies.remove("id", {path: "/"})
                await updateCart()
                return;
            }

            setCart(data)
        } catch (e) {
            setIsError(true)
            console.log(e)
        }
    }
    const updateCartOnce = useRef(updateCart)

    const updateData = async (data) => {
        const cuttingSum = data.reduce((acc, cur) => acc + cur.calculations.data.find(el => el.name === "Стоимость резки").rawValue, 0)
        const sum = data.reduce((acc, cur) => acc + cur.calculations.data.find(el => el.name === "Стоимость").rawValue, 0)

        const {data: res} = await axios.put(`${process.env.GATSBY_BACKEND_URL}/carts/${cart.id}`, {
            data, cuttingSum: cuttingSum, sum: sum, metalSum: sum - cuttingSum
        })

        setCart(res)
    }
    const addItemToCart = async (item) => {
        setIsError(false)
        try {
            await updateCart()
            const data = [...cart.data, item]

            await updateData(data)

        } catch (e) {
            setIsError(true)
            console.error(e)
            throw e
        }
    }
    const deleteItem = async (item) => {
        setIsError(false)
        try {
            await updateCart()
            const data = cart.data.filter((e, i) => i !== item)

            await updateData(data)
        } catch (e) {
            console.error(e)
            throw e
        }
    }
    const clearCart = async () => {
        await updateData([])
    }

    useEffect(() => {
        updateCartOnce.current()
    }, [])

    return (
        <CartContext.Provider value={{
            cart, addItemToCart, isError, deleteItem, clearCart
        }}>
            {props.children}
        </CartContext.Provider>
    );
}
export default CartContextProvider;
