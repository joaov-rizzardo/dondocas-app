import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import './SaleModal.scss'
import ProductAdd from '../ProductAdd/ProductAdd';
import { useEffect, useReducer, useState } from 'react';
import { innitialSale, saleReducer } from '../../reducers/Sale/Sale';
import axios from 'axios';
import baseUrl from '../../configs/Url';
import Alert from '../Alert/Alert';
import { alertReducer, innitialAlert } from '../../reducers/alertModal/alertModal';

export default function SaleModal(props) {

    const [addProductStatus, setAddProductStatus] = useState(false)

    const handleCloseAddProduct = () => {
        setAddProductStatus(false)
    }

    const handleOpenAddProduct = () => {
        setAddProductStatus(true)
    }

    const [sale, handleSale] = useReducer(saleReducer, innitialSale)

    const [paymentForms, setPaymentForms] = useState([])

    const handleGetPaymentForms = async () => {
        const response = await axios.get(`${baseUrl.backendApi}/payment/get`)
            .catch(error => handleAlert({ type: 'openAlert', title: 'Erro', body: `Erro ao se comunicar com o servidor - ${error.message}` }))

        setPaymentForms(response.data)
    }

    useEffect(() => {
        handleGetPaymentForms()
    }, [])

    const handleChangePaymentForm = payment_key => {

        const paymentForm = paymentForms.find(form => {
            if (form.payment_key == payment_key) {
                return form
            }
        })

        handleSale({type: 'changePaymentForm', form: paymentForm})
    }

    const [alert, handleAlert] = useReducer(alertReducer, innitialAlert)


    return (
        <>
            <Alert args={alert} closeAlert={handleAlert} />

            <ProductAdd saleProducts={sale.products} handleSale={handleSale} handleClose={handleCloseAddProduct} show={addProductStatus} />

            <Modal show={props.modalStatus} onHide={props.handleClose} size='xl' dialogClassName="SaleModal">
                <Modal.Body>
                    <fieldset>
                        <legend>Dados do cliente</legend>
                        <div className="flex-group">
                            <Form.Group className="mb-3">
                                <Form.Label>Nome do cliente</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Digite o nome"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="(99) 99999-9999"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Cliente não identificado</Form.Label>
                                <Form.Check type="switch" />
                            </Form.Group>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Dados de pagamento</legend>
                        <Form.Group className="mb-3">
                            <Form.Label>Forma de pagamento</Form.Label>
                            <Form.Select
                                value={sale.payment_form.payment_key}
                                onChange={e => { handleChangePaymentForm(e.target.value) }}>
                                <option>Selecione uma forma de pagamento</option>
                                {paymentForms.map(form => {
                                    return (<option key={form.payment_key} value={form.payment_key}>{form.payment_description}</option>)
                                })}
                            </Form.Select>
                        </Form.Group>
                    </fieldset>

                    <fieldset>
                        <legend>Produtos</legend>
                        <table className='table-items'>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Descrição</th>
                                    <th>Tamanho</th>
                                    <th>Cor</th>
                                    <th>Quantidade</th>
                                    <th>Valor</th>
                                    <th><button onClick={handleOpenAddProduct} className="add-product"><FontAwesomeIcon icon={faPlus} /></button></th>
                                </tr>
                            </thead>

                            <tbody>
                                {sale.products.map(product => {
                                    return (
                                        <tr key={product.product_key}>
                                            <td>{product.product_code}</td>
                                            <td>{product.product_description}</td>
                                            <td>37</td>
                                            <td>Vermelho</td>
                                            <td><input step="1" type="number" value={product.quantity} onChange={e => {
                                                if (e.target.value == '0') {
                                                    handleAlert({ type: 'openAlert', title: 'Atenção!', body: 'A quantidade de itens não pode ser igual a zero!' })
                                                } else {
                                                    handleSale({ type: 'changeQuantity', product_key: product.product_key, quantity: e.target.value })
                                                }
                                            }} /></td>
                                            <td>R$ {product.amount}</td>
                                            <td><button><FontAwesomeIcon icon={faTrash} /></button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </fieldset>

                </Modal.Body>

                <Modal.Footer>

                    <div className="total-sale">
                        <h3>Total da venda: R$ {sale.products.length == 0 ? '0,00' : sale.products.reduce((value, product) => {
                            return value + product.amount
                        }, 0)}</h3>
                    </div>

                    <div className="buttons">
                        <Button>Salvar</Button>
                        <Button onClick={props.handleClose}>Fechar</Button>
                    </div>

                </Modal.Footer>
            </Modal>
        </>
    )
}