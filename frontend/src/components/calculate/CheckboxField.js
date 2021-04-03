import {Checkbox, FormControlLabel} from "@material-ui/core";
import React from "react";

function CheckboxField(props) {
    const {formik, name, label} = props
    return (
        <FormControlLabel
            className={"w100 mt-3"}
            control={<Checkbox
                color={"primary"}
                name={name}
                onChange={formik.handleChange}
                checked={formik.values[name]}
            />}
            label={label}
        />
    )
}

export default CheckboxField
