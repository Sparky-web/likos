import React from 'react';
import Button from "@material-ui/core/Button";

function Results({results: resultTable, addToCart, reset}) {

    return (
        <div className={"calculate__results"}>
            {resultTable.calculations ? (<>
                <p>* Вы можете скачать расчеты на странице корзины</p>
                <ResultTable resultTable={resultTable}/>
                <div className="d-flex mt-3">
                    <Button color={"primary"} variant={"contained"}
                            onClick={() => addToCart(resultTable)}>В корзину</Button>
                    <Button className={"ml-3"} onClick={reset}>Сбросить</Button>
                </div>
            </>) : <p>Что-то пошло не так</p>}
        </div>
    );
}

export function ResultTable({resultTable, shouldDisplayAll}) {
    return (
        <div className={"calculate__results-table"}>
            <table id="calculations">
                <thead>
                <tr>
                    {!shouldDisplayAll && <th colSpan={"2"}>{resultTable.calculations.name}</th>}
                    {shouldDisplayAll && <>
                        <th>Параметр</th>
                        <th>Значение</th>
                    </>}
                </tr>
                </thead>
                <tbody>
                {resultTable.calculations.data.map((el, i) => (<tr key={i}>
                    <td>{el.name}</td>
                    <td>{el.data}</td>
                </tr>))}
                {shouldDisplayAll && resultTable.inputData.data.map((el, i) => (<tr key={i}>
                    <td>{el.name}</td>
                    <td>{el.data}</td>
                </tr>))}
                </tbody>
            </table>
            <table id="input">
                <tbody>
                </tbody>
            </table>
        </div>
    )
}

export default Results;