import Field from "../landing/Field";
import React from "react";
import CheckboxField from "./CheckboxField";

const Additional = ({formik}) => {
    const {shape, shouldAddHole, shouldAddBolts, shouldConsiderMetalPrice} = formik.values

    return (
        <div>
            <Field formik={formik} type={"number"} name={"amount"} label={"Количество (шт.)"}/>
            {["circle", "square"].includes(shape) && <>
                <CheckboxField formik={formik} name={"shouldAddBolts"} label={"Добавить отверстия под болты"}/>

                {shouldAddBolts && <div className={"two-cols gap16px"}>
                    <Field formik={formik} type={"number"} name={"bolt"} label={"Диаметр отверстий (мм)"}/>
                    <Field formik={formik} type={"number"} name={"boltAmount"} label={"Кол-во отверстий"}/>
                </div>}
            </>}

            {shape !== "other" && <>
                <CheckboxField formik={formik} name={"shouldConsiderMetalPrice"} label={"У меня свой метал"}/>
                {shouldConsiderMetalPrice && <Field className="mt-3" formik={formik} type={"number"} name={"metalPrice"}
                                                    label={"Цена металла (руб/тонна)"}/>}

            </>}

            {["circle", "square"].includes(shape) && <>
                <CheckboxField formik={formik} name={"shouldAddHole"}
                               label={"Добавить внутреннуее отверстие под трубу"}/>
                {shouldAddHole && <Field formik={formik} name={"holeWide"} label={"Диаметр отверстия (мм)"}/>}
            </>}


        </div>
    )
}

export default Additional
