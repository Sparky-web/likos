import * as Yup from "yup";

export const thickness = [
    {thickness: 2, cuttingPrice: 28, holePrice: 7},
    {thickness: 3, cuttingPrice: 39, holePrice: 10},
    {thickness: 6, cuttingPrice: 68, holePrice: 16.8},
    {thickness: 8, cuttingPrice: 82, holePrice: 20.2},
    {thickness: 10, cuttingPrice: 90, holePrice: 22},
    {thickness: 12, cuttingPrice: 107, holePrice: 25.3},
    {thickness: 14, cuttingPrice: 113, holePrice: 26.6},
    {thickness: 16, cuttingPrice: 124, holePrice: 30},
    {thickness: 18, cuttingPrice: 130, holePrice: 30.7},
    {thickness: 20, cuttingPrice: 170, holePrice: 40},
    {thickness: 22, cuttingPrice: 192, holePrice: 44.4},
    {thickness: 25, cuttingPrice: 226, holePrice: 52.2},
    {thickness: 30, cuttingPrice: 260, holePrice: 60},
    {thickness: 32, cuttingPrice: 305, holePrice: 70.5},
    {thickness: 35, cuttingPrice: 373, holePrice: 86.1},
    {thickness: 40, cuttingPrice: 452, holePrice: 104.4},
    {thickness: 45, cuttingPrice: 542, holePrice: 125.2},
    {thickness: 50, cuttingPrice: 644, holePrice: 148.7},
].map(e => ({...e, cuttingPrice: Math.round(e.cuttingPrice * 1.2), holePrice: Math.round(e.holePrice * 1.2)}))


export const messages = {
    number: "Должно быть числом",
    moreThan0: "Должно быть больше нуля",
    required: "Обязательно для заполнения"
}
const yupInt = Yup.number().typeError(messages.number).moreThan(0, messages.moreThan0);
const yupDependOn = (values) => {
    return {
        name: "req",
        exclusive: false,
        params: {},
        message: messages.required,
        test: function (value) {
            // You can access the price field with `this.parent`.
            const t = this.parent.shape
            return !(values.includes(t) && !value);
        },
    }
}
export const initialValues = {
    shape: "",
    x: "",
    y: "",
    length: "",
    holesAmount: "",
    amount: 1,
    thickness: 2,
    autoAdd: false,
    bolt: 0,
    boltAmount: 0,
    holeWide: 0,
    trianglesAmount: 4,

    shouldAddHole: false,
    shouldAddBolts: false,
    shouldConsiderMetalPrice: false
}

export const getResultTable = (results) => {
    let resultTable = {
        calculations: {
            name: results.actualName,
            data: [
                {
                    name: "Количество",
                    data: `${results.amount} шт.`,
                    rawName: "amount",
                    rawValue: results.amount
                },
                {
                    name: "Стоимость",
                    data: `${results.totalPrice} ₽`,
                    rawName: "totalPrice",
                    rawValue: results.totalPrice
                },
                {
                    name: "Стоимость резки",
                    data: `${results.cuttingPrice} ₽`,
                    rawName: "cuttingPrice",
                    rawValue: results.cuttingPrice
                },
                {
                    name: "Цена изделия (за 1 шт.)",
                    data: `${results.pricePerUnit} ₽`,
                    rawName: "pricePerUnit",
                    rawValue: results.pricePerUnit
                },
                {
                    name: "Цена металла (за 1 шт.)",
                    data: `${results._metalPrice} ₽`,
                    rawName: "_metalPrice",
                    rawValue: results.metalPrice
                },
                {
                    name: "Цена резки (за 1 шт.)",
                    data: `${results.cuttingPricePerUnit} ₽`,
                    rawName: "cuttingPricePerUnit",
                    rawValue: results.cuttingPrice
                },
                {
                    name: "Вес изделия",
                    data: `${results.weight} кг.`,
                    rawName: "weight",
                    rawValue: results.weight
                },
                {
                    name: "Размеры изделия",
                    data: `${results.sizes}`,
                    rawName: "sizes",
                    rawValue: results.sizes
                },
            ]
        },
        inputData: {
            name: "Входные данные",
            data: [
                {
                    name: "Параметр 1",
                    data: `${results.x} мм.`,
                    rawName: "",
                    rawValue: results.length
                },
                {
                    name: "Параметр 2",
                    data: `${results.y} мм.`,
                    rawName: "",
                    rawValue: results.length
                },
                {
                    name: "Длинна реза",
                    data: `${results.length} пог. м.`,
                    rawName: "length",
                    rawValue: results.length
                },
                {
                    name: "Количество отверстий",
                    data: `${results.holesAmount} шт.`,
                    rawName: "holesAmount",
                    rawValue: results.holesAmount
                },
                {
                    name: "Количество отверстий под болты",
                    data: `${results.boltAmount} шт.`,
                    rawName: "boltAmount",
                    rawValue: results.boltAmount
                },
                {
                    name: "Диаметр отверстий под болты",
                    data: `${results.bolt} мм.`,
                    rawName: "bolt",
                    rawValue: results.bolt
                },
                {
                    name: "Диаметр внутреннего отверстия",
                    data: `${results.holeWide} мм.`,
                    rawName: "holeWide",
                    rawValue: results.holeWide
                },
                {
                    name: "Цена металла",
                    data: `${results.metalPrice} ₽/тонна`,
                    rawName: "metalPrice",
                    rawValue: results.metalPrice
                },
                {
                    name: "Толщина металла",
                    data: `${results.thickness} мм.`,
                    rawName: "thickness",
                    rawValue: results.thickness
                },
            ]
        }
    }
    if (results.shape === "other") {
        resultTable = {
            ...resultTable, inputData: {
                ...resultTable.inputData,
                data: resultTable.inputData.data.filter(el => el.name !== "Параметр 1" && el.name !== "Параметр 2")
            },
            calculations: {
                ...resultTable.calculations,
                data: resultTable.calculations.data.filter(el => !["Цена металла (за 1 шт.)", "Вес изделия", "Размеры изделия"].includes(el.name))
            }
        }
    } else {
        resultTable = {
            ...resultTable, inputData: {
                ...resultTable.inputData,
                data: resultTable.inputData.data.filter(el => el.name !== "Длинна реза" && el.name !== "Количество отверстий")
            }
        }
    }

    return resultTable
}

export const properties = {
    initialValues,
    validationSchema: Yup.object({
        x: yupInt.test(yupDependOn(["circle", "triangle", "square"])),
        y: yupInt.test(yupDependOn(["triangle", "square"])),
        amount: yupInt.required(messages.required),
        length: yupInt.test(yupDependOn(["other"])),
        holesAmount: yupInt.test(yupDependOn(["other"])),
        metalPrice: yupInt.test(yupDependOn(["circle", "triangle", "square", "other"]))
    })
}
