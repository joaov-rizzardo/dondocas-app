import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import Alert from '../Alert/Alert';
import { innitialAlert, alertReducer } from '../../reducers/alertModal/alertModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './ProductAdd.scss'
import { ClipLoader } from 'react-spinners';
import { useEffect, useReducer, useState } from 'react';
import baseUrl from '../../configs/Url';
import axios from 'axios';

export default function ProductAdd(props) {

    const [alert, handleAlert] = useReducer(alertReducer, innitialAlert)

    const [loading, setLoading] = useState(false)

    const [categories, setCategories] = useState([])

    const [subcategories, setSubcategories] = useState([])

    const [find, setFind] = useState({
        product_code: '',
        category_key: '',
        subcategory_key: ''
    })


    //==================================================================================================================
    //                              FUNÇÕES PARA BUSCAR AS CATEGORIAS E SUBCATEGORIAS
    //==================================================================================================================
    const handleGetCategories = async () => {
        const categoryResponse = await axios.get(`${baseUrl.backendApi}/category/get`)
            .catch(error => handleAlert({ type: 'openAlert', title: 'Erro', body: `Erro ao se comunicar com o servidor - ${error.message}` }))

        setCategories(categoryResponse.data)
    }

    const handleGetSubcategories = async () => {

        const subcategoryResponse = await axios.get(`${baseUrl.backendApi}/subcategory/get`)
            .catch(error => handleAlert({ type: 'openAlert', title: 'Erro', body: `Erro ao se comunicar com o servidor - ${error.message}` }))

        setSubcategories(subcategoryResponse.data)

    }

    useEffect(() => {
        handleGetCategories()
        handleGetSubcategories()
    }, [])


    //==================================================================================================================
    //                                      FUNÇÕES PARA BUSCAR OS PRODUTOS
    //==================================================================================================================

    const [products, setProducts] = useState([])

    const handleFindProduct = async () => {

        setLoading(true)
        if (find.product_code == '' || find.subcategory_key == '') {
            setLoading(false)
            handleAlert({ type: 'openAlert', title: 'Atenção', body: 'Preencha todos os campos para realizar a busca' })
            return
        }

        const response = await axios.get(`${baseUrl.backendApi}/product/get/${find.subcategory_key}/${find.product_code}`)
            .catch(error => {
                setLoading(false)
                handleAlert({ type: 'openAlert', title: 'Erro', body: `Erro ao se comunicar com o servidor - ${error.message}` })
            })
        

        // FLUXO SE NENHUM PRODUTO FOR ENCONTRADO
        if (response.data.length == 0) {
            setLoading(false)
            handleAlert({ type: 'openAlert', title: 'Atenção', body: 'Nenhum produto foi encontrado para essas especificações' })
            return
        }

        if (response) {
            setLoading(false)
        }

        setProducts(response.data)
    }


    // FUNÇÃO PARA ADICIONAR PRODUTOS NA VENDA
    const handleAddProduct = () => {

        // FLUXO SE NÃO EXISTIR NENHUM PRODUTO PARA SER INSERIDO
        if(products.length == 0){
            handleAlert({ type: 'openAlert', title: 'Atenção', body: `Nenhum produto para ser inserido` })
            return false
        }

        let stopCondition = false

        // PERCORRE OS PRODUTOS RETORNADOS - TEORICAMENTE É PARA RETORNAR APENAS UM
        for (let product of products) {
            
            // VERIFICA SE O PRODUTO ESTÁ ATIVO PARA VENDAS
            if(product.product_status != 'A'){
                stopCondition = true
                handleAlert({ type: 'openAlert', title: 'Atenção', body: `O produto ${product.product_description} não está ativo para vendas, verifique o cadastro!` })
                continue
            }

            props.handleSale({ type: 'addProduct', product })
        }
        
        if (stopCondition) {
            return false
        }

        setProducts([])
    }

    return (
        <>
            <Alert args={alert} closeAlert={handleAlert} />
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
                                value={find.product_code}
                                onChange={e => setFind(prevState => {
                                    return {
                                        ...prevState,
                                        product_code: e.target.value
                                    }
                                })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Select
                                value={find.category_key}
                                onChange={e => setFind(prevState => {
                                    return {
                                        ...prevState,
                                        category_key: e.target.value
                                    }
                                })}
                            >
                                <option value="">Selecione a categoria</option>
                                {categories.map(category => {
                                    return (<option key={category.category_key} value={category.category_key}>{category.category_description}</option>)
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Subategoria</Form.Label>
                            <Form.Select
                                value={find.subcategory_key}
                                onChange={e => setFind(prevState => {
                                    return {
                                        ...prevState,
                                        subcategory_key: e.target.value
                                    }
                                })}
                            >
                                <option value="">Selecione a subcategoria</option>

                                {
                                    subcategories.filter(subcategory => {
                                        if (subcategory.category_key == find.category_key) {
                                            return subcategory
                                        }
                                    }, find.category_key).map(subcategory => {
                                        return (<option key={subcategory.subcategory_key} value={subcategory.subcategory_key}>{subcategory.subcategory_description}</option>)
                                    })
                                }
                            </Form.Select>

                        </Form.Group>

                        <button onClick={handleFindProduct}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    </div>

                    {
                        products.length > 0 ? <div className="product">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Descrição</th>
                                        <th>Preço a prazo</th>
                                        <th>Preço a vista</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map(product => {
                                        return (
                                            <tr key={product.product_key}>
                                                <td>{product.product_code}</td>
                                                <td>{product.product_description}</td>
                                                <td>{product.product_deferred_payment_value}</td>
                                                <td>{product.product_cash_payment_value}</td>
                                            </tr>

                                        )
                                    })}

                                </tbody>
                            </table>
                        </div> : ''
                    }


                </Modal.Body>

                <Modal.Footer>

                    <div className="buttons">
                        <ClipLoader loading={loading} color={'#000'} size={30} />
                        <Button onClick={handleAddProduct}>Adicionar</Button>
                        <Button onClick={props.handleClose}>Fechar</Button>
                    </div>

                </Modal.Footer>
            </Modal>
        </>
    )
}