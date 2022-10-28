import { faBagShopping, faEnvelope, faGlobe, faPen, faPhone, faTrash, faTruck, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useEffect, useState, useReducer } from 'react'
import { Form } from 'react-bootstrap'
import { ProviderModal } from '../../components/ProviderModal/ProviderModal'
import baseUrl from '../../configs/Url'
import { alertReducer, innitialAlert } from '../../reducers/alertModal/alertModal';
import Alert from '../../components/Alert/Alert';
import Confirm from '../../components/Confirm/Confirm';
import { confirmReducer, innitialConfirm } from '../../reducers/ConfirmModal/ConfirmModal';
import './Provider.scss'
import useCategory from '../../hooks/useCategory'

export function Provider() {

    const [modal, setModal] = useState(false)
    const [confirm, handleConfirm] = useReducer(confirmReducer, innitialConfirm)
    const [alertModal, handleAlert] = useReducer(alertReducer, innitialAlert)
    const [updateProviders, setUpdateProviders] = useState(false)
    const [providers, setProviders] = useState([])
    const [providerFilter, setProviderFilter] = useState({
        provider_name: '',
        provider_category: ''
    })

    const [categories] = useCategory()

    async function handleGetProviders() {
        const response = await axios.get(`${baseUrl.backendApi}/provider/get`).catch(error => {
            console.log(error)
            handleAlert({ type: 'openAlert', title: 'Erro', body: `Erro ao buscar fornecedores - ${error.message}` })
            return
        })

        setProviders(response.data)
    }

    useEffect(() => {
        handleGetProviders()
    }, [updateProviders])

    const [provider, setProvider] = useState({
        provider_key: "",
        provider_name: "",
        provider_telephone: "",
        provider_email: "",
        provider_category: "",
        provider_site: ""
    })

    const handleClose = () => {
        setProvider({
            provider_key: "",
            provider_name: "",
            provider_telephone: "",
            provider_email: "",
            provider_category: "",
            provider_site: ""
        })
        setModal(false)
    }

    function handleEditProvider(providerData) {
        setProvider({
            provider_key: providerData.provider_key,
            provider_name: providerData.provider_name,
            provider_telephone: providerData.provider_telephone,
            provider_email: providerData.provider_email,
            provider_category: providerData.provider_category,
            provider_site: providerData.provider_site
        })

        setModal(true)
    }

    function handleInactivateProvider(provider_key){
        handleConfirm({type: 'openConfirm', title: 'Atenção', body: 'Tem certeza que deseja remover o produto da venda?', callback: async () => {
            const response = await axios.put(`${baseUrl.backendApi}/provider/inactivate`, {providerKey: provider_key}).catch(error => {
                console.log(error)
                handleAlert({type: 'openAlert', title: 'Erro', body: `Ocorreu um erro ao excluir o fornecedor`})
                handleConfirm({type: 'closeConfirm'})
                return
            })

            handleConfirm({type: 'closeConfirm'})
            handleAlert({type: 'openAlert', title: 'Sucesso', body: 'O fornecedor foi excluído com sucesso'})
            setUpdateProviders(prevState => !prevState)
        }})
    }

    return (
        <main className="Provider">

            <Confirm confirm={confirm} handleConfirm={handleConfirm}/>

            <Alert args={alertModal} closeAlert={handleAlert} />

            <ProviderModal setUpdateProviders={setUpdateProviders} provider={provider} setProvider={setProvider} modalStatus={modal} handleClose={handleClose} />

            <section className="provider-filter">
                <button onClick={e => setModal(true)}>Nova despesa</button>
                <Form.Group>
                    <Form.Label>Nome do fornecedor</Form.Label>
                    <Form.Control
                        type="text"
                        value={providerFilter.provider_name}
                        onChange={e => setProviderFilter(prevState => {
                            return { ...prevState, provider_name: e.target.value }
                        })}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Categoria de produtos</Form.Label>
                    <Form.Select
                        value={providerFilter.provider_category}
                        onChange={e => setProviderFilter(prevState => {
                            return { ...prevState, provider_category: e.target.value }
                        })}
                    >
                        <option value="">Todas as categorias</option>
                        {categories.map(category => <option key={category.category_key} value={category.category_key}>{category.category_description}</option>)}
                    </Form.Select>
                </Form.Group>
            </section>

            <section className="provider-list">
                {providers.filter(provider => {
                    if((providerFilter.provider_name == '' || provider.provider_name.includes(providerFilter.provider_name)) && (providerFilter.provider_category == '' || provider.provider_category == providerFilter.provider_category)){
                        return provider
                    }
                }).map(provider => {
                    return (
                        <div key={provider.provider_key} className="provider-item">
                            <div className="item-header">
                                <div className="icon">
                                    <FontAwesomeIcon icon={faTruck} />
                                </div>

                                <div className="buttons">
                                    <button onClick={e => handleEditProvider(provider)}><FontAwesomeIcon icon={faPen} /></button>
                                    <button onClick={e => handleInactivateProvider(provider.provider_key)}><FontAwesomeIcon icon={faTrash} /></button>
                                </div>
                            </div>

                            <div className="item-body">
                                <div className="item-information">
                                    <span className="icon"><FontAwesomeIcon icon={faUser} /></span>
                                    <span className="information" title={provider.provider_name}>{provider.provider_name}</span>
                                </div>

                                <div className="item-information">
                                    <span className="icon"><FontAwesomeIcon icon={faPhone} /></span>
                                    <span className="information" title={provider.provider_telephone ?? 'Não informado'}>{provider.provider_telephone ?? 'Não informado'}</span>
                                </div>

                                <div className="item-information">
                                    <span className="icon"><FontAwesomeIcon icon={faEnvelope} /></span>
                                    <span className="information" title={provider.provider_email ?? 'Não informado'}>{provider.provider_email ?? 'Não informado'}</span>
                                </div>

                                <div className="item-information">
                                    <span className="icon"><FontAwesomeIcon icon={faGlobe} /></span>
                                    <span className="information" title={provider.provider_site ?? 'Não informado'}>{provider.provider_site ?? 'Não informado'}</span>
                                </div>

                                <div className="item-information">
                                    <span className="icon"><FontAwesomeIcon icon={faBagShopping} /></span>
                                    <span className="information" title={provider.provider_category_description}>{provider.provider_category_description}</span>
                                </div>

                            </div>
                        </div>
                    )
                })}

            </section>

        </main>
    )
}