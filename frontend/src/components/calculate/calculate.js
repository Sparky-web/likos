import {thickness} from "./formHelpers";

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const getThicknessPrice = (_thickness) => {
    for (let i = 0; i < thickness.length; i++) {
        if (thickness[i].thickness === _thickness) return thickness[i]
        else if (_thickness < thickness[i].thickness) return thickness[i]
    }
}

const getName = (name) => {
    if (name === "circle") return "Фланец (круг)"
    else if (name === "square") return "Фланец (квадрат)"
    else if (name === "triangle") return "Косынка"
    else if (name === "other") return "Другое"
}

export default function calculate(values) {
    let {shape, x, y, boltAmount, bolt, thickness, amount, metalPrice, holeWide} = values

    const thicknessPrice = getThicknessPrice(thickness)

    const pricePerMeter = thicknessPrice.cuttingPrice
    const holePrice = thicknessPrice.holePrice
    const junkPrice = 12
    const density = 7850

    x = x * 0.001
    y = y * 0.001
    holeWide = holeWide * 0.001
    thickness = thickness * 0.001
    bolt = bolt * 0.001
    metalPrice = metalPrice * 0.001


    const holeP = values.shouldAddHole ? holeWide * Math.PI : 0
    const holeS = values.shouldAddHole ? Math.PI * ((holeWide / 2) ** 2) : 0

    const boltsP = bolt * Math.PI * boltAmount;
    const boltS = Math.PI * ((bolt / 2) ** 2) * boltAmount

    let totalPrice, _metalPrice, cuttingPrice, pricePerKg, weight, sizes;

    if (shape === "square") {
        const p = 2 * (x + y)
        const s = x * y

        weight = s * thickness * density

        _metalPrice = weight * metalPrice
        cuttingPrice = (p + holeP + boltsP) * pricePerMeter + (1 + boltAmount + (holeP ? 1 : 0)) * holePrice
        const _junkPrice = (boltS + holeS) * thickness * density * junkPrice

        totalPrice = _metalPrice + cuttingPrice - _junkPrice;
        pricePerKg = totalPrice / weight
        sizes = `${values.x} x ${values.y} x ${values.thickness} мм.`

    } else if (shape === "circle") {
        const s = Math.PI * ((x / 2) ** 2)
        const p = Math.PI * x

        weight = Math.round(s * thickness * density)
        const allS = (x ** 2)
        const allWeight = allS * thickness * density

        _metalPrice = Math.round(allWeight * metalPrice)
        const _junkPrice = (allWeight - weight - (holeS + boltS) * thickness * density) * junkPrice
        cuttingPrice = Math.round((p + holeP + boltsP) * pricePerMeter + (1 + boltAmount + (values.shouldAddHole ? 1 : 0)) * holePrice)

        totalPrice = Math.round(_metalPrice + cuttingPrice - _junkPrice)
        pricePerKg = totalPrice / weight

        sizes = `${values.x} мм. (диаметр) x ${values.thickness} мм.`

    } else if (shape === "triangle") {
        const p = x + y + Math.sqrt(x ** 2 + y ** 2)
        const s = (x * y) / 2

        weight = s * thickness * density
        _metalPrice = weight * metalPrice
        cuttingPrice = p * pricePerMeter + holePrice

        totalPrice = _metalPrice + cuttingPrice

        pricePerKg = totalPrice / weight

        sizes = `Катеты: ${values.x} мм., ${values.y} мм.; толщина: ${values.thickness} мм.`
    } else if (shape === "other") {
        cuttingPrice = values.length * pricePerMeter + values.holesAmount * holePrice
        totalPrice = cuttingPrice
    }

    return {
        ...values,
        id: values.id || random(0, 99999),
        _metalPrice: Math.round(_metalPrice),
        pricePerKg: Math.round(pricePerKg),
        cuttingPricePerUnit: Math.round(cuttingPrice),
        cuttingPrice: Math.round(cuttingPrice * amount),
        weight: weight?.toFixed(1),
        pricePerUnit: Math.round(totalPrice),
        totalPrice: Math.round(totalPrice * amount),
        sizes,
        actualName: getName(shape)
    }
}