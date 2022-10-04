import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';
import './ExpenseModal.scss'

export default function ExpenseModal(props) {
    return (
        <>
            <Modal show={props.modalStatus} onHide={props.handleClose} size='lg' dialogClassName="ExpenseModal">
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Select>
                            <option value=''>Selecione uma categoria</option>
                        </Form.Select>
                    </Form.Group>

                    <div className="grid-form">

                        <Form.Group className="mb-3">
                            <Form.Label>Valor da despesa</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o valor"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tipo de despesa</Form.Label>
                            <Form.Select>
                                <option value=''>Selecione um tipo</option>
                                <option value='F'>Fixo</option>
                                <option value='V'>Variável</option>
                            </Form.Select>
                        </Form.Group>
                    </div>

                    <Form.Group className="mb-3">
                            <Form.Label>Descrição da despesa</Form.Label>
                            <Form.Control
                                type="text"
                                as="textarea"
                                maxlength="200"
                                rows={3}
                            />
                        </Form.Group>

                </Modal.Body>

                <Modal.Footer>
                    <div className="buttons">
                        <ClipLoader loading={true} color={'#000'} size={30} />
                        <Button>Salvar</Button>
                        <Button>Limpar campos</Button>
                        <Button>Fechar</Button>
                    </div>

                </Modal.Footer>
            </Modal>
        </>
    )
}