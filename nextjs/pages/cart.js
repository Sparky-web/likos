import React, {useContext, useState} from 'react';
import Layout from "../templates/Layout";
import {CartContext} from "../components/CartContext";
import {ResultTable} from "../components/calculate/Results";
import Section from "../components/landing/Section";
import "../css/Cart.css"
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import LinearProgress from "@material-ui/core/LinearProgress";
import SEO from "../templates/SEO";
import {Link} from "gatsby"


function CartPage(props) {
    return (
        <div>
            <SEO/>
            <Layout><Cart/></Layout>
        </div>
    );
}

function Cart() {
    const {cart, isError, clearCart} = useContext(CartContext)

    const [data, setData] = useState({name: "", email: "", comment: ""})
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (e) => {
        e.persist()
        setData(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    const handleSubmit = async () => {
        setLoading(true)
        setError(false)
        try {
            const {data: [{url}]} = await axios.get(`${process.env.GATSBY_BACKEND_URL}/carts/${cart.id}/getPdf`)

            await axios.post(`${process.env.GATSBY_BACKEND_URL}/orders`, {
                email: data.email,
                name: data.name,
                comment: data.comment,
                order: `${process.env.GATSBY_BACKEND_URL}${url}`
            })

            handleClose()
            setSuccess(true)
        } catch (e) {
            console.error(e)
            setError(true)
        }
        setLoading(false)
    }

    const downloadOrder = async () => {
        const {data: [data]} = await axios.get(`${process.env.GATSBY_BACKEND_URL}/carts/${cart.id}/getPdf`)
        fetch(`${process.env.GATSBY_BACKEND_URL}${data.url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/pdf',
            },
        })
            .then((response) => response.blob())
            .then((blob) => {
                // Create blob link to download
                const url = window.URL.createObjectURL(
                    new Blob([blob]),
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    `${new Date().toLocaleString()}.pdf`,
                );

                // Append to html link element page
                document.body.appendChild(link);

                // Start download
                link.click();

                // Clean up and remove the link
                link.parentNode.removeChild(link);
            });
    }

    return (
        <Section>
            <h1>Корзина</h1>
            {cart && !!cart.data.length && <div className="cart__container">
                <div className={"cart__items"}>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell/>
                                    <TableCell>Название</TableCell>
                                    <TableCell align="right">Количество</TableCell>
                                    <TableCell align="right">Размеры</TableCell>
                                    <TableCell align="right">Стоимость</TableCell>
                                    <TableCell/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.data.map((el, i) => (
                                    <Row key={i} i={i} item={el}/>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className={"cart__checkout"}>
                    <h3>Сумма заказов</h3>

                    <div className="sum">
                        <p><b>Стоимость резки: </b>{cart.cuttingSum} ₽</p>
                        <p><b>Стоимость металла: </b>{cart.metalSum} ₽</p>
                        <p><b>Итого: </b>{cart.sum} ₽</p>
                    </div>
                    <div className="btns">
                        <Button size={"large"} onClick={() => handleClickOpen()} color={"primary"}
                                variant={"contained"}>Оставить заявку</Button>
                        <Button size={"large"} onClick={downloadOrder}>Скачать расчеты</Button>
                    </div>
                </div>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle id="form-dialog-title">Оставить заявку</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Наши специалисты получат ваш заказ и свяжутся с вами в ближайшее время.
                        </DialogContentText>
                        <TextField
                            margin="dense"
                            name={"name"}
                            value={data.name}
                            onChange={handleChange}
                            label="Ваше имя"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            name={"email"}
                            value={data.email}
                            onChange={handleChange}
                            label="Ваш Email"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            name={"comment"}
                            value={data.comment}
                            onChange={handleChange}
                            label="Сообщение (необязательно)"
                            type="text"
                            fullWidth
                            multiline
                            rows={4}
                        />

                        {loading && <LinearProgress/>}
                        {error &&
                        <Alert severity={"error"}>Произошла ошибка при отправке формы, попробуйте позже</Alert>}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Закрыть
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Отправить
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog className={"success"} open={success} onClose={() => setSuccess(false)}
                        aria-labelledby={"form-dialog-title"}>
                    <DialogTitle>Ваш заказ успешно отправлен!</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => {
                            clearCart()
                            setSuccess(false)
                        }}>Закрыть</Button>
                    </DialogActions>
                </Dialog>
            </div>}
            {isError && <Alert severity={"error"}>Произошла ошибка при загрузке корзины, попробуйте позже</Alert>}
            {!isError && !cart?.data?.length && <div>
                <Alert severity={"info"}>Ваша корзина пуста</Alert>
                <Link to={"/calculate"}><button className="btn btn-secondary mt-3">Добавить первый товар</button></Link>
            </div>}
        </Section>
    )
}

const Row = ({item, i}) => {
    const [isOpen, setIsOpen] = useState(false)
    const {deleteItem} = useContext(CartContext)

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {item.calculations.name}
                </TableCell>
                <TableCell align="right">{item.calculations.data.find(el => el.rawName === "amount")?.data}</TableCell>
                <TableCell align="right">{item.calculations.data.find(el => el.rawName === "sizes")?.data}</TableCell>
                <TableCell
                    align="right">{item.calculations.data.find(el => el.rawName === "totalPrice").data}</TableCell>
                <TableCell align="right">
                    <IconButton aria-label={"delete item"} size={"small"} onClick={() => deleteItem(i)}>
                        <DeleteIcon/>
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{padding: 0}} colSpan={6}>
                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                        <ResultTable resultTable={item} shouldDisplayAll={true}/>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export default CartPage;