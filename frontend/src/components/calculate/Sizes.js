import Field from "../landing/Field";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {thickness} from "./formHelpers";
import React from "react";

const Sizes = ({formik}) => {
    const {shape} = formik.values
    return (
        <div className="calculate__sizes">
            {["square", "circle", "triangle"].includes(shape) && <div className={"two-cols gap16px"}>
                <Field formik={formik} type={"number"} name={"x"}
                       label={shape === "circle" ? "Диаметр (мм)" : shape === "triangle" ? "Первый катет (мм)" : "Длинна (мм)"}/>
                {["square", "triangle"].includes(shape) && <Field formik={formik} type={"number"} name={"y"}
                                                                  label={shape === "triangle" ? "Второй катет (мм)" : "Ширина (мм)"}/>}
            </div>}

            {shape === "other" && <div className={"two-cols gap16px"}>
                <Field formik={formik} name={"length"} label={"Длинна резки (пог.м)"}/>
                <Field formik={formik} name={"holesAmount"} label={"Кол-во врезок (шт)"}/>
            </div>}

            <FormControl className={"w100 thickness"}>
                <InputLabel id={"calc-type"}>Толщина металла (мм)</InputLabel>
                <Select labelId={"calc-type"} className={"calculator__select"}
                        inputProps={formik.getFieldProps("thickness")}>
                    {
                        thickness.map(el => (
                            <MenuItem key={el.thickness} value={el.thickness}>
                                {el.thickness} мм
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    )
}

export default Sizes