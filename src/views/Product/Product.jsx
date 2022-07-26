import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useReducer } from 'react'
import './Product.scss'
import { Form } from 'react-bootstrap';
import { innitialState, reducer } from '../../reducers/productRegister/productRegister';

export default function Product() {

    const [modalStatus, setModalStatus] = useState(false)

    const handleClose = () => {
        setModalStatus(false)
    }

    const handleShow = () => {
        setModalStatus(true)
    }

    const [state, dispatch] = useReducer(reducer, innitialState)

    return (
        <div className="Product">
            {/*
                MODAL PARA CADASTRO DE PRODUTOS    
            */}
            <Modal show={modalStatus} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastro de produtos</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Código do produto</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o código"
                                value={state.productCode}
                                onChange={e => { dispatch({ type: 'changeCode', value: e.target.value }) }}
                            />
                            <Form.Text className="text-muted">Código de identificação do produto</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Descrição do produto</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite a descrição"
                                value={state.productDescription}
                                onChange={e => dispatch({ type: 'changeDescription', value: e.target.value })}
                            />
                        </Form.Group>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-around'
                        }}>
                            <Form.Group className="mb-3" style={{ width: '49%' }}>
                                <Form.Label>Valor de venda a vista</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0.00"
                                    max="10000.00"
                                    step="0.01"
                                    value={state.productCashPaymentValue}
                                    onChange={e => dispatch({ type: 'changeCashPaymentValue', value: e.target.value })}
                                />
                                <Form.Text className="text-muted">Valor que o produto será vendido</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" style={{ width: '49%' }}>
                                <Form.Label>Valor de venda a prazo</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0.00"
                                    max="10000.00"
                                    step="0.01"
                                    value={state.productDeferredPaymentValue}
                                    onChange={e => dispatch({ type: 'changeDeferredPaymentValue', value: e.target.value })}
                                />
                            </Form.Group>
                        </div>

                        <Form.Group className="mb-3" style={{ width: '49%' }}>
                            <Form.Label>Valor de compra</Form.Label>
                            <Form.Control
                                type="number"
                                min="0.00"
                                max="10000.00"
                                step="0.01"
                                value={state.productPurchaseValue}
                                onChange={e => dispatch({ type: 'changePurchaseValue', value: e.target.value })}
                            />
                            <Form.Text className="text-muted">Valor que o produto foi comprado do fornecedor</Form.Text>
                        </Form.Group>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-around'
                        }}>
                            <Form.Group className="mb-3" style={{ width: '49%' }}>
                                <Form.Label>Categoria</Form.Label>
                                <Form.Select
                                    value={state.productCategory}
                                    onChange={e => dispatch({ type: 'changeCategory', value: e.target.value })}
                                >
                                    <option value="">Calçados</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" style={{ width: '49%' }}>
                                <Form.Label>Subcategoria</Form.Label>
                                <Form.Select
                                    value={state.productSubcategory}
                                    onChange={e => dispatch({ type: 'changeSubcategory', value: e.target.value })}
                                >
                                    <option value="">Sapatilhas</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success" onClick={e => dispatch({ type: 'clearFields' })}>Limpar campos</Button>
                    <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                    <Button variant="primary" onClick={handleClose}>Salvar</Button>
                </Modal.Footer>
            </Modal>
            {/*
                FIM DO MODAL PARA CADASTRO DE PRODUTOS    
            */}
            
            <div className="buttons">
                <button onClick={handleShow}>Novo produto</button>
            </div>

            <div className="products-list">

            </div>
        </div>
    )
}