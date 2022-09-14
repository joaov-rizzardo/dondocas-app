import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faBullseye } from '@fortawesome/free-solid-svg-icons';
import './SaleModal.scss'
import ProductAdd from '../ProductAdd/ProductAdd';
import { useEffect, useReducer, useState } from 'react';
import { innitialSale, saleReducer } from '../../reducers/Sale/Sale';
import axios from 'axios';
import baseUrl from '../../configs/Url';
import Alert from '../Alert/Alert';
import { alertReducer, innitialAlert } from '../../reducers/alertModal/alertModal';
import Confirm from '../Confirm/Confirm';
import { confirmReducer, innitialConfirm } from '../../reducers/ConfirmModal/ConfirmModal';
import { ClipLoader } from 'react-spinners';
import InputMask from "react-input-mask";
import { getFormatedDateTime } from '../../services/FormatDate';

export default function SaleModal(props) {
    
    const [loading, setLoading] = useState(false)

    const [alert, handleAlert] = useReducer(alertReducer, innitialAlert)

    const [confirm, handleConfirm] = useReducer(confirmReducer, innitialConfirm)

    const [addProductStatus, setAddProductStatus] = useState(false)

    const handleCloseAddProduct = () => {
        setAddProductStatus(false)
    }

    const handleOpenAddProduct = () => {
        setAddProductStatus(true)
    }

    const [sale, handleSale] = useReducer(saleReducer, innitialSale)

    //----------------------------------------------------------------------------------------------------
    //                             FUNÇÕES PARA BUSCAR AS FORMAS DE PAGAMENTO
    //----------------------------------------------------------------------------------------------------

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

        let paymentForm = {}

        if (payment_key == '') {
            paymentForm = {
                payment_key: '',
                payment_type: 'V',
                payment_discount_percent: 0
            }
        } else {
            paymentForm = paymentForms.find(form => {
                if (form.payment_key == payment_key) {
                    return form
                }
            })
        }

        handleSale({ type: 'changePaymentForm', form: paymentForm })
    }


    //----------------------------------------------------------------------------------------------------
    //                                  FUNÇÕES PARA BUSCAR AS CORES
    //----------------------------------------------------------------------------------------------------

    const [colors, setColors] = useState([])

    const handleGetColors = async () => {
        const response = await axios.get(`${baseUrl.backendApi}/colors/get`)
            .catch(error => handleAlert({ type: 'openAlert', title: 'Error', body: `Erro ao se comunicar com o servidor - ${error.message}` }))

        setColors(response.data)
    }

    useEffect(() => {
        handleGetColors()
    }, [])

    //----------------------------------------------------------------------------------------------------
    //                                  FUNÇÕES PARA BUSCAR OS TAMANHOS
    //----------------------------------------------------------------------------------------------------

    const [sizes, setSizes] = useState([])

    const handleGetSizes = async () => {
        const response = await axios.get(`${baseUrl.backendApi}/sizes/get`)
            .catch(error => handleAlert({ type: 'openAlert', title: 'Error', body: `Erro ao se comunicar com o servidor - ${error.message}` }))

        setSizes(response.data)
    }

    useEffect(() => {
        handleGetSizes()
    }, [])

    // FUNÇÃO PARA REMOVER PRODUTO DA VENDA
    const handleRemoveProduct = id => {
        handleConfirm({type: 'openConfirm', title: 'Atenção', body: 'Tem certeza que deseja remover o produto da venda?', callback: () => {
            handleSale({type: 'removeProduct', id: id})
            handleConfirm({type: 'closeConfirm'})
        }})
    }

    // FUNÇÃO PARA EFETIVAR A VENDAS
    const handleCreateSale = async () => {
        // REALIZANDO AS VALIDAÇÕES NECESSÁRIAS

        // VALIDAÇÃO DOS DADOS DE CLIENTE
        if (!sale.client.unidentified) {
            if (sale.client.client_name == '') {
                handleAlert({ type: 'openAlert', title: 'Atenção', body: 'Necessário preencher o nome do cliente caso possua identificação' })
                return false
            }
        }

        // VALIDAÇÃO DOS DADOS DE PAGAMENTO
        if (sale.payment_form.payment_key == '') {
            handleAlert({ type: 'openAlert', title: 'Atenção', body: 'Nenhuma forma de pagamento foi selecionada' })
            return false
        }

        // VALIDAÇÃO DOS PRODUTOS
        if (sale.products.length == 0) {
            handleAlert({ type: 'openAlert', title: 'Atenção', body: 'Nenhuma produto foi adicionado na venda' })
            return false
        }

        let stopCondition = false

        for (let product of sale.products) {

            // VERIFICA AS QUANTIDADES DO PRODUTO
            if (product.quantity == 0 || product.quantity == '') {
                handleAlert({ type: 'openAlert', title: 'Atenção', body: `O produto ${product.product_description} possuí quantidade igual a zero, ou vazia` })
                stopCondition = true
                break
            }

            // VERIFICA O VALOR DO PRODUTO
            if (product.amount == 0 || product.amount == '') {
                handleAlert({ type: 'openAlert', title: 'Atenção', body: `O produto ${product.product_description} possuí valor igual a zero` })
                stopCondition = true
                break
            }

            // VERIFICA SE FOI PREENCHIDO O TAMANHO DO PRODUTO
            if (product.size == '') {
                handleAlert({ type: 'openAlert', title: 'Atenção', body: `Informe o tamanho do produto ${product.product_description}` })
                stopCondition = true
                break
            }

            // VERIFICA SE FOI PREENCHIDO O TAMANHO DO PRODUTO
            if (product.color == '') {
                handleAlert({ type: 'openAlert', title: 'Atenção', body: `Informe a cor do produto ${product.product_description}` })
                stopCondition = true
                break
            }
        }

        // SE CAIR EM ALGUMA DAS VALIDAÇÕES DO LAÇO, INTERROMPE A EXECUÇÃO DO PROCESSO
        if (stopCondition) {
            return false
        }

        const saleAmount = sale.products.reduce((amount, product) => {
            return amount + product.amount
        }, 0)

        const saleCost = sale.products.reduce((cost, product) => {
            return cost + (product.product_purchase_value * product.quantity)
        }, 0)

        const products = sale.products.map(product => {
            return {
                product_code: product.product_code,
                product_description: product.product_description,
                category_key: product.category_key,
                subcategory_key: product.subcategory_key,
                color_key: product.color,
                size_key: product.size,
                product_unit_cost: product.product_purchase_value,
                product_quantity: product.quantity,
                product_unit_amount: product.unit_price
            }
        })

        const payload = {
            client : {
                client_name: sale.client.client_name,
                client_telephone: sale.client.client_telephone,
                unidentified_client: sale.client.unidentified
            },
            payment_key : sale.payment_form.payment_key,
            sale_net_amount:  saleAmount - ((saleAmount * sale.payment_form.payment_discount_percent)/100),
            sale_gross_amount : saleAmount,
            sale_cost: saleCost,
            sale_date: getFormatedDateTime(props.saleDate) ?? '',
            products: products
        }
        
        setLoading(true)

        const response = await axios.post(`${baseUrl.backendApi}/sale/create`, payload)
        .catch(error => {
            setLoading(false)
            handleAlert({type: 'openAlert', title: 'Erro', body: `Não foi possível se comunicar com o servidor - ${error.message}`})
            return
        })

        if(response.data.status == 'success'){
            handleAlert({type: 'openAlert', title: 'Sucesso', body: `Venda concluída com sucesso`})
            handleSale({type: 'clearSale'})
            props.setUpdateSale(prevState => !prevState)
        }else {
            handleAlert({type: 'openAlert', title: 'Erro', body: `Erro desconhecido`})
        }

        setLoading(false)
    }
    
    return (
        <>
            <Alert args={alert} closeAlert={handleAlert} />

            <Confirm confirm={confirm} handleConfirm={handleConfirm}/>

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
                                    value={sale.client.client_name}
                                    onChange={e => handleSale({ type: 'changeClientName', value: e.target.value })}
                                    disabled={sale.client.unidentified ? 'disabled' : ''}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control
                                    as={InputMask}
                                    mask="(99) 99999-9999"
                                    placeholder="(99) 99999-9999"
                                    value={sale.client.client_telephone}
                                    onChange={e => handleSale({ type: 'changeClientTelephone', value: e.target.value })}
                                    disabled={sale.client.unidentified ? 'disabled' : ''}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Cliente não identificado</Form.Label>
                                <Form.Check
                                    type="switch"
                                    value={sale.client.unidentified}
                                    onChange={e => handleSale({ type: 'changeClientUnidentified', value: e.target.checked })} />
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
                                <option value=''>Selecione uma forma de pagamento</option>
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
                                        <tr key={product.id}>
                                            <td>{product.product_code}</td>
                                            <td>{product.product_description}</td>
                                            <td>
                                                <Form.Select
                                                    value={product.size}
                                                    onChange={e => handleSale({ type: 'changeSize', id: product.id, size: e.target.value })}
                                                >
                                                    <option value="">Selecione um tamanho</option>
                                                    {sizes.filter(size => {
                                                        if (size.category_key == product.category_key) {
                                                            return size
                                                        }
                                                    }).map(size => { return (<option key={size.size_key} value={size.size_key}>{size.size_description}</option>) })}
                                                </Form.Select>
                                            </td>
                                            <td>
                                                <Form.Select
                                                    value={product.color}
                                                    onChange={e => handleSale({ type: 'changeColor', color: e.target.value, id: product.id })}
                                                >
                                                    <option value="">Selecione uma cor</option>
                                                    {colors.map(color => {
                                                        return (<option key={color.color_key} value={color.color_key}>
                                                            {color.color_description}
                                                        </option>)
                                                    })}
                                                </Form.Select >
                                            </td>
                                            <td><Form.Control step="1" type="number" value={product.quantity} onChange={e => {
                                                if (e.target.value == '0') {
                                                    handleAlert({ type: 'openAlert', title: 'Atenção!', body: 'A quantidade de itens não pode ser igual a zero!' })
                                                } else {
                                                    handleSale({ type: 'changeQuantity', id: product.id, quantity: e.target.value })
                                                }
                                            }} /></td>
                                            <td>R$ {product.amount}</td>
                                            <td><button onClick={e => handleRemoveProduct(product.id)}><FontAwesomeIcon icon={faTrash} /></button></td>
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
                        <ClipLoader loading={loading} color={'#000'} size={30} />
                        <Button onClick={handleCreateSale}>Salvar</Button>
                        <Button onClick={() => handleSale({type: 'clearSale'})}>Limpar campos</Button>
                        <Button onClick={props.handleClose}>Fechar</Button>
                    </div>

                </Modal.Footer>
            </Modal>
        </>
    )
}