import * as Yup from "yup";

export const thickness = [
    {thickness: 2, price: 1},
    {thickness: 3, price: 1},
    {thickness: 4, price: 1},
    {thickness: 5, price: 1},
    {thickness: 6, price: 1},
    {thickness: 8, price: 1},
    {thickness: 10, price: 1},
    {thickness: 12, price: 1},
    {thickness: 14, price: 1},
    {thickness: 16, price: 1},
    {thickness: 18, price: 1},
    {thickness: 20, price: 1},
    {thickness: 22, price: 1},
    {thickness: 25, price: 1},
    {thickness: 30, price: 1},
    {thickness: 32, price: 1},
    {thickness: 35, price: 1},
    {thickness: 40, price: 1},
    {thickness: 45, price: 1},
    {thickness: 50, price: 1},
]
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
    metalPrice: 70519,
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
