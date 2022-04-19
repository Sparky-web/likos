import React from 'react';
import {thickness} from "./calculate/formHelpers";
import Section from "./landing/Section";

function Price(props) {
    return (
        <Section>
            <h1>Прайс-лист</h1>
            <table className={"calculate__results-table"}>
                <thead>
                <tr>
                    <td>Толщина металла</td>
                    <td>Цена резки за пог. м</td>
                    <td>Цена врезки</td>
                </tr>
                </thead>
                <tbody>
                {thickness.map((el, key) => <tr>
                    <td>{el.thickness} мм.</td>
                    <td>{el.cuttingPrice} руб.</td>
                    <td>{el.holePrice} руб.</td>
                </tr>)}
                </tbody>
            </table>

        </Section>
    );
}

export default Price;