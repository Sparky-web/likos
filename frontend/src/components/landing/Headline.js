import React from 'react';
import {Link} from "gatsby"

function Headline() {
    return (
        <section className={"headline"}>
            <div className="container">
                <div className="headline__content">
                    <h1>Плазменная резка металла в Екатеринбурге, калькулятор стоимости резки прямо на сайте.</h1>
                    <div className="btn-group">
                        <Link to="/calculate">
                            <button className="btn btn-secondary">
                                РАСЧИТАТЬ СТОИМОСТЬ
                            </button>
                        </Link>
                        <Link to="#order">
                            <button className="btn btn-primary">
                                Связаться с нами
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Headline;
