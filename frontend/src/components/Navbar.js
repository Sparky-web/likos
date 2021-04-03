import React, {useContext, useState} from 'react';
import {CartContext} from "./CartContext";
import {Link} from "gatsby";
import Badge from "@material-ui/core/Badge";

function Navbar() {

    const [isOpened, setIsOpened] = useState(false)
    const open = () => setIsOpened(!isOpened)

    const {cart} = useContext(CartContext)


    return (
        <nav className={["navbar", isOpened && "navbar__container__opened"].join(" ")}>
            <div className="navbar__container">
                <div className="navbar__logo">
                    ЛИКОС
                </div>
                <div className={["navbar__menu-container", "navbar__menu", isOpened && "navbar__opened"].join(" ")}>
                    <Link to="/">
                        <button className="btn">
                            ГЛАВНАЯ
                        </button>
                    </Link>
                    <Link to="/calculate">
                        <button className="btn">
                            РАСЧИТАТЬ СТОИМОСТЬ
                        </button>
                    </Link>
                    <Link to="/contacts">
                        <button className="btn">
                            КОНТАКТЫ
                        </button>
                    </Link>
                    <Link to="/gallery">
                        <button className="btn">
                            О нас
                        </button>
                    </Link>

                    <Link to={"/cart"}>
                        <button className={"btn"}>
                            <Badge color={"primary"} badgeContent={cart?.data?.length}>
                                <img src="https://img.icons8.com/material/24/ffffff/shopping-cart--v1.png"
                                     alt={"Корзина"}/>
                            </Badge>
                        </button>
                    </Link>
                </div>
                <button onKeyDown={open} onClick={open} className={"btn navbar__open"}>
                    <img src="https://img.icons8.com/material-sharp/24/FFFFFF/menu--v3.png" alt={""}/>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
