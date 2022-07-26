import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react'
import './Product.scss'
import { Form } from 'react-bootstrap';

export default function Product() {

    const [modalStatus, setModalStatus] = useState(false)

    const handleClose = () => {
        setModalStatus(false)
    }

    const handleShow = () => {
        setModalStatus(true)
    }

    return (
        <div className="Product">

            <Modal show={modalStatus} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastro de produtos</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Código do produto</Form.Label>
                            <Form.Control type="text" placeholder="Digite o código" />
                            <Form.Text className="text-muted">Código de identificação do produto</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Descrição do produto</Form.Label>
                            <Form.Control type="text" placeholder="Digite a descrição" />
                        </Form.Group>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-around'
                        }}>
                            <Form.Group className="mb-3" style={{ width: '49%' }}>
                                <Form.Label>Valor de venda a vista</Form.Label>
                                <Form.Control type="number" min="0.00" max="10000.00" step="0.01" />
                                <Form.Text className="text-muted">Valor que o produto será vendido</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" style={{ width: '49%' }}>
                                <Form.Label>Valor de venda a prazo</Form.Label>
                                <Form.Control type="number" min="0.00" max="10000.00" step="0.01" />
                            </Form.Group>
                        </div>

                        <Form.Group className="mb-3" style={{ width: '49%' }}>
                            <Form.Label>Valor de compra</Form.Label>
                            <Form.Control type="number" min="0.00" max="10000.00" step="0.01" />
                            <Form.Text className="text-muted">Valor que o produto foi comprado do fornecedor</Form.Text>
                        </Form.Group>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-around'
                        }}>
                            <Form.Group className="mb-3" style={{ width: '49%' }}>
                                <Form.Label>Categoria</Form.Label>
                                <Form.Select>
                                    <option value="">Calçados</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" style={{ width: '49%' }}>
                                <Form.Label>Subcategoria</Form.Label>
                                <Form.Select>
                                    <option value="">Sapatilhas</option>
                                </Form.Select>
                            </Form.Group>

                        </div>


                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                    <Button variant="primary" onClick={handleClose}>Salvar</Button>
                </Modal.Footer>
            </Modal>

            <div className="buttons">
                <button onClick={handleShow}>Novo produto</button>
            </div>

            <div className="products-list">

            </div>
        </div>
    )
}