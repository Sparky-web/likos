import React from 'react';
import Layout from "../templates/Layout";
import NewCalculator from "../components/calculate"
import "../css/Calculate.css"

function Calculate(props) {
    return (
        <Layout>
            <section className={"calculate"}>
                <h1 className={"calculate__paddings"}>Рассчитайте стоимость резки</h1>
                <NewCalculator/>
            </section>
        </Layout>
    );
}

export default Calculate;