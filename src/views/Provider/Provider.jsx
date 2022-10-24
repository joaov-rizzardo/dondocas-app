import { faBagShopping, faEnvelope, faGlobe, faPen, faPhone, faTrash, faTruck, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form } from 'react-bootstrap'

import './Provider.scss'

export function Provider(){
    return (
        <main className="Provider">
            <section className="provider-filter">
                <button>Nova despesa</button>
                <Form.Group>
                    <Form.Label>Nome do fornecedor</Form.Label>
                    <Form.Control 
                        type="text"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Material vendido</Form.Label>
                    <Form.Select>
                        <option value="">Todos</option>
                    </Form.Select>
                </Form.Group>
            </section>

            <section className="provider-list">
                <div className="provider-item">
                    <div className="item-header">
                        <div className="icon">
                            <FontAwesomeIcon icon={faTruck} />
                        </div>

                        <div className="buttons">
                            <button><FontAwesomeIcon icon={faPen}/></button>
                            <button><FontAwesomeIcon icon={faTrash}/></button>
                        </div>
                    </div>

                    <div className="item-body">
                        <div className="item-information">
                            <span className="icon"><FontAwesomeIcon icon={faUser}/></span>
                            <span className="information">Bauduco</span>
                        </div>

                        <div className="item-information">
                            <span className="icon"><FontAwesomeIcon icon={faPhone}/></span>
                            <span className="information">(11) 99999-9999</span>
                        </div>

                        <div className="item-information">
                            <span className="icon"><FontAwesomeIcon icon={faEnvelope}/></span>
                            <span className="information">teste@hotmail.com</span>
                        </div>

                        <div className="item-information">
                            <span className="icon"><FontAwesomeIcon icon={faGlobe}/></span>
                            <span className="information">www.google.com.br</span>
                        </div>

                        <div className="item-information">
                            <span className="icon"><FontAwesomeIcon icon={faBagShopping}/></span>
                            <span className="information">Calçados</span>
                        </div>
                        
                    </div>
                </div>
            </section>

        </main>
    )
}