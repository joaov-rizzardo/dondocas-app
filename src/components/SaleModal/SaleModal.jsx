import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import './SaleModal.scss'

export default function SaleModal(props) {
    return (
        <Modal show={props.modalStatus} onHide={props.handleClose} size='xl' dialogClassName="SaleModal">
            <Modal.Body closeButton>
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
                        <Form.Select>
                            <option value="">Selecione uma forma de pagamento</option>
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
                                <th><button className="add-product"><FontAwesomeIcon icon={faPlus} /></button></th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr>
                                <td>01</td>
                                <td>Sapatilha teste</td>
                                <td>37</td>
                                <td>Vermelho</td>
                                <td>2</td>
                                <td>R$ 23,50</td>
                                <td><button><FontAwesomeIcon icon={faTrash} /></button></td>
                            </tr>

                        </tbody>
                    </table>
                </fieldset>

            </Modal.Body>

            <Modal.Footer>

                <div className="total-sale">
                    <h3>Total da venda: R$ 23,54</h3>
                </div>

                <div className="buttons">
                    <Button>Salvar</Button>
                    <Button onClick={props.handleClose}>Fechar</Button>
                </div>

            </Modal.Footer>
        </Modal>
    )
}