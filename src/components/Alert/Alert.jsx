import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function Alert(props) {

    return (
        <Modal show={props.args.alertOpen} onHide={() => props.closeAlert({type: 'closeAlert'})} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>{props.args.alertTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {props.args.alertBody}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.closeAlert({type: 'closeAlert'})}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    )
}