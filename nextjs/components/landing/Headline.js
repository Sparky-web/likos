import React from 'react';
import Link from 'next/link';

function Headline() {
    return (
        <section className={"headline"}>
            <div className="container">
                <div className="headline__content">
                    <h1>Плазменная резка металла в Екатеринбурге, калькулятор стоимости резки прямо на сайте.</h1>
                    <div className="btn-group">
                        <Link href="/calculate">
                            <button className="btn btn-secondary">
                                РАСЧИТАТЬ СТОИМОСТЬ
                            </button>
                        </Link>
                        <Link href="#order">
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
