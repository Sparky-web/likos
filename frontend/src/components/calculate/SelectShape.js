import React from "react";
import {StaticImage} from "gatsby-plugin-image";
import Paper from "@material-ui/core/Paper";

const SelectType = ({formik}) => {
    const shapes = React.useRef([
        {
            name: "Квадрат (фланец)",
            value: "square",
            image: <StaticImage
                className={"image"}
                alt={"Квадрат"}
                src={"../../images/calculate-square.png"}
                objectFit={"cover"}
                placeholder={"blur"}
            />
        },
        {
            name: "Круг (фланец)",
            value: "circle",
            image: <StaticImage
                className={"image"}
                alt={"Круг"}
                src={"../../images/calculate-circle.png"}
                objectFit={"cover"}
                placeholder={"blur"}
            />
        },
        {
            name: "Косынка",
            value: "triangle",
            image: <StaticImage
                className={"image"}
                alt={"Косынка"}
                src={"../../images/calculate-triangle.png"}
                objectFit={"cover"}
                placeholder={"blur"}
            />
        },
        {
            name: "Другое",
            value: "other",
            image: <StaticImage
                className={"image"}
                alt={"Другое"}
                src={"../../images/calculate-other.jpg"}
                objectFit={"contain"}
                placeholder={"blur"}
            />
        }
    ])

    return (
        <div className="calculate__select">
            {shapes.current.map(el => (
                <Paper onClick={() => formik.setFieldValue("shape", el.value)}
                       key={el.value}
                       elevation={el.value === formik.values.shape ? 3 : 0}>
                    {el.image}
                    <h4>{el.name}</h4>
                </Paper>))}
        </div>
    )
}

export default SelectType