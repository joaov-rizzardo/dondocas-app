import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ClipLoader } from 'react-spinners';
import './Confirm.scss'

export default function Confirm(props) {

    return (
        <Modal show={props.confirm.confirmOpen} onHide={() => props.handleConfirm({ type: 'closeConfirm' })} size='lg' dialogClassName='Confirm'>
            <Modal.Header closeButton>
                <Modal.Title>{props.confirm.confirmTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {props.confirm.confirmBody}
            </Modal.Body>

            <Modal.Footer>
                <ClipLoader loading={props.confirm.confirmLoading} color={'#000'} size={30} />
                <Button onClick={props.confirm.confirmCallback}>Sim</Button>
                <Button onClick={e => props.handleConfirm({ type: 'closeConfirm' })}>Não</Button>
            </Modal.Footer>
        </Modal>
    )
}