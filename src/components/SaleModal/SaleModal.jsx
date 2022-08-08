import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';

export default function SaleModal(props) {
    return (
        <Modal show={props.modalStatus} onHide={props.handleClose} size='xl' dialogClassName="">
            <Modal.Body closeButton>
                <Form.Group className="mb-3">
                    <Form.Label>Código do produto</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite o código"
                    />
                    <Form.Text className="text-muted">Código de identificação do produto</Form.Text>

                    <Form.Control
                        type="tel"
                        placeholder="Digite o código"
                    />  
                </Form.Group>
            </Modal.Body>

            <Modal.Footer>
                <Button>Salvar</Button>
                <Button onClick={props.handleClose}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    )
}