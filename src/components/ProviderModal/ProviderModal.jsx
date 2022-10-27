import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { alertReducer, innitialAlert } from '../../reducers/alertModal/alertModal';
import { ClipLoader } from 'react-spinners';
import './ProviderModal.scss'
import { useReducer } from 'react';
import { useState } from 'react';
import Alert from '../Alert/Alert';
import useCategory from '../../hooks/useCategory'
import { phoneMask } from '../../services/Masks';
import axios from 'axios';
import baseUrl from '../../configs/Url';

export function ProviderModal(props) {
    const [alertModal, handleAlert] = useReducer(alertReducer, innitialAlert)
    const [loading, setLoading] = useState(false)
    const [categories] = useCategory()

    const handleSaveProvider = async () => {

        if (props.provider.provider_name == '') {
            handleAlert({ type: 'openAlert', title: 'Atenção', body: 'O campo nome deve ser preenchido' })
            return
        }

        if (props.provider.provider_category == '') {
            handleAlert({ type: 'openAlert', title: 'Atenção', body: 'Uma categoria de produtos deve ser selecionada' })
            return
        }

        if (props.provider.provider_name.length > 50) {
            handleAlert({ type: 'openAlert', title: 'Atenção', body: 'O campo nome não pode possuír mais de 50 caracteres' })
            return
        }

        if (props.provider.provider_email.length > 80) {
            handleAlert({ type: 'openAlert', title: 'Atenção', body: 'O campo email não pode possuír mais de 80 caracteres' })
            return
        }

        if (props.provider.provider_site.length > 80) {
            handleAlert({ type: 'openAlert', title: 'Atenção', body: 'O campo site não pode possuír mais de 80 caracteres' })
            return
        }

        setLoading(true)

        const payload = {
            providerName: props.provider.provider_name,
            providerTelephone: props.provider.provider_telephone,
            providerEmail: props.provider.provider_email,
            providerCategory: props.provider.provider_category,
            providerSite: props.provider.provider_site
        }

        // SE ESTIVER VAZIO A CHAVE SE TRATA DE UM INSERT, CASO NÃO ESTEJA É UM UPDATE
        if (props.provider.provider_key == '') {
            const response = await axios.post(`${baseUrl.backendApi}/provider/create`, payload).catch(error => {
                console.log(error)
                handleAlert({ type: 'openAlert', title: 'Erro', body: `Ocorreu um erro ao salvar o produto - ${error.message}` })
                setLoading(false)
                return
            })

            setLoading(false)
            props.handleClose()
            return
        }

        payload.providerKey = props.provider.provider_key

        const response = await axios.put(`${baseUrl.backendApi}/provider/update`, payload).catch(error => {
            console.log(error)
            handleAlert({ type: 'openAlert', title: 'Erro', body: `Ocorreu um erro ao salvar o produto - ${error.message}` })
            setLoading(false)
            return
        })

        setLoading(false)
        props.handleClose()
    }

    return (
        <>
            <Alert args={alertModal} closeAlert={handleAlert} />

            <Modal show={props.modalStatus} onHide={props.handleClose} size='lg' dialogClassName="ExpenseModal">
                <Modal.Body>
                    <div className="grid-form">
                        <Form.Group>
                            <Form.Label>Nome do fornecedor</Form.Label>
                            <Form.Control
                                type="text"
                                value={props.provider.provider_name}
                                onChange={e => props.setProvider(prevState => {
                                    return { ...prevState, provider_name: e.target.value }
                                })}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control
                                value={props.provider.provider_telephone}
                                onChange={e => props.setProvider(prevState => {
                                    return { ...prevState, provider_telephone: phoneMask(e.target.value) }
                                })}
                            />
                        </Form.Group>
                    </div>

                    <div className="grid-form">
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                value={props.provider.provider_email}
                                onChange={e => props.setProvider(prevState => {
                                    return { ...prevState, provider_email: e.target.value }
                                })}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Categoria de produtos</Form.Label>
                            <Form.Select
                                value={props.provider.provider_category}
                                onChange={e => props.setProvider(prevState => {
                                    return { ...prevState, provider_category: e.target.value }
                                })}
                            >
                                <option value="">Escolha uma categoria</option>
                                {categories.map(category => <option key={category.category_key} value={category.category_key}>{category.category_description}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </div>

                    <Form.Group>
                        <Form.Label>Site</Form.Label>
                        <Form.Control
                            type="text"
                            value={props.provider_site}
                            onChange={e => props.setProvider(prevState => {
                                return { ...prevState, provider_site: e.target.value }
                            })}
                        />
                    </Form.Group>



                </Modal.Body>

                <Modal.Footer>
                    <div className="buttons">
                        <ClipLoader loading={loading} color={'#000'} size={30} />
                        <Button onClick={handleSaveProvider}>Salvar</Button>
                        <Button onClick={props.handleClose}>Fechar</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}