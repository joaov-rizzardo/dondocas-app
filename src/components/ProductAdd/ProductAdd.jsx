import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './ProductAdd.scss'
import { ClipLoader } from 'react-spinners';

export default function ProductAdd(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose} size='lg' dialogClassName="ProductAdd">

            <Modal.Header closeButton>
                <Modal.Title>Adicionar Produtos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="find">
                    <Form.Group className="mb-3">
                        <Form.Label>Código</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o código"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Select>
                            <option value="">Selecione a categoria</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Subategoria</Form.Label>
                        <Form.Select>
                            <option value="">Selecione a subcategoria</option>
                        </Form.Select>

                    </Form.Group>

                    <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </div>

                {
                    true ? <div className="product">
                        <table>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Descrição</th>
                                    <th>Valor de compra</th>
                                    <th>Preço a prazo</th>
                                    <th>Preço a vista</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr>
                                    <td>01</td>
                                    <td>Descrição teste</td>
                                    <td>R$ 23,50</td>
                                    <td>R$ 23,50</td>
                                    <td>R$ 23,50</td>
                                </tr>

                            </tbody>
                        </table>
                    </div> : ''
                }


            </Modal.Body>

            <Modal.Footer>

                <div className="buttons">
                    <ClipLoader loading={true} color={'#000'} size={30} />
                    <Button>Adicionar</Button>
                    <Button onClick={props.handleClose}>Fechar</Button>
                </div>

            </Modal.Footer>
        </Modal>
    )
}