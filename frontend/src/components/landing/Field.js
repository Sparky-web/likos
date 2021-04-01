import {TextField} from "@material-ui/core";

import React from "react";

function Field(props) {
    const {formik, name, label, type} = props

    return (
        <TextField
            {...props}
            className={"w100 textField mt-3"}
            type={type || "number"} error={Boolean(formik.errors[name])}
            helperText={formik.errors[name]}
            inputProps={formik.getFieldProps(name)} label={label}/>
    )
}

export default Field;