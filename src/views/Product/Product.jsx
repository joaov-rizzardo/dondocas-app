import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useReducer, useEffect } from 'react'
import './Product.scss'
import { Form } from 'react-bootstrap';
import { innitialState, reducer } from '../../reducers/productRegister/productRegister';
import axios from 'axios';
import baseUrl from '../../configs/Url';
import Alert from '../../components/Alert/Alert';
import { innitialAlert, alertReducer } from '../../reducers/alertModal/alertModal';
import { ClipLoader } from 'react-spinners';
import ProductItem from '../../components/ProductItem/ProducItem';


export default function Product() {

    const [modalStatus, setModalStatus] = useState(false)

    const [categories, setCategories] = useState([])

    const [subcategories, setSubcategories] = useState([])

    const [categoriesOptions, setCategoriesOptions] = useState([])

    const [subcategoriesOptions, setSubcategoriesOptions] = useState([])

    const [modalLoading, setModalLoading] = useState(false)

    const [state, dispatch] = useReducer(reducer, innitialState)

    const [alert, handleAlert] = useReducer(alertReducer, innitialAlert)

    // FECHA O MODAL DE CADASTRO DE PRODUTOS
    const handleClose = () => {
        dispatch({ type: 'clearFields' })
        setModalStatus(false)
    }

    // ABRE O MODAL DE CADASTRO DE PRODUTOS
    const handleShow = () => {
        setModalStatus(true)
    }

    // BUSCAS AS CATEGORIAS E MONTA AS OPTIONS
    const handleGetCategories = async () => {
        const res = await axios.get(`${baseUrl.backendApi}/category/get`)

        setCategories(res.data)

        setCategoriesOptions(res.data.map(category => {
            return (
                <option key={category.category_key} value={category.category_key}>{category.category_description}</option>
            )
        }))
    }

    // SELECIONA AS SUBCATEGORIAS DISPONÍVEIS COM BASE NA CATEGORIAS SELECIONADA
    const changeSubcategories = category_key => {
        const availableSubcategories = subcategories.filter((subcategory) => {
            if (category_key == subcategory.category_key) {
                return subcategory
            }
        }, category_key)

        const options = availableSubcategories.map(subcategory => {
            return (<option key={subcategory.subcategory_key} value={subcategory.subcategory_key}>{subcategory.subcategory_description}</option>)
        })

        setSubcategoriesOptions(options)
    }

    // BUSCA AS SUBCATEGORIAS
    const handleGetSubcategories = async () => {

        const res = await axios.get(`${baseUrl.backendApi}/subcategory/get`)

        setSubcategories(res.data)
    }

    const handleSaveProduct = async () => {

        setModalLoading(true)

        // VALIDAÇÃO SE OS CAMPOS ESTÃO PREENCHIDOS
        const fields = Object.values(state)

        // VERIFICA SE TODOS OS CAMPOS FORAM PREENCHIDOS
        for (let field of fields) {
            if (field === '') {
                handleAlert({ type: 'openAlert', title: 'Atenção!', body: 'Todos os campos devem ser preenchidos!' })
                setModalLoading(false)
                return
            }
        }

        // VALIDAÇÃO SE UM PRODUTO COM O MESMO CÓDIGO JÁ EXISTE (APENAS NA OPERAÇÃO DE CREATE)
        if (!state.productUpdate) {
            const response = await axios.get(`${baseUrl.backendApi}/product/get/${state.productSubcategory}/${state.productCode}`).catch(error => {
                setModalLoading(false)
                handleAlert({ type: 'openAlert', title: 'Erro', body: `Erro ao seu comunicar com o servidor - ${error.message}` })
            })

            if (response.data.length > 0) {
                setModalLoading(false)
                handleAlert({ type: 'openAlert', title: 'Atenção', body: 'Já existe um produto cadastrado com o mesmo código' })
                return
            }
        }

        const payload = {
            productCode: state.productCode,
            productDescription: state.productDescription,
            categoryKey: state.productCategory,
            subcategoryKey: state.productSubcategory,
            productCashPaymentValue: state.productCashPaymentValue,
            productDeferredPaymentValue: state.productDeferredPaymentValue,
            productPurchaseValue: state.productPurchaseValue
        }

        const endpoint = state.productUpdate ? '/product/update' : '/product/create'

        const response = await axios.post(`${baseUrl.backendApi}${endpoint}`, payload).catch(error => {
            setModalLoading(FontFaceSetLoadEvent)
            handleAlert({ type: 'openAlert', title: 'Erro', body: `Erro ao seu comunicar com o servidor - ${error.message}` })
        })

        const message = state.productUpdate ? 'Produto atualizado com sucesso!' : 'Produto criado com sucesso!'

        if(response.status == 201){
            setModalLoading(false)
            handleAlert({type: 'openAlert', title: 'Sucesso', body: message})
            handleClose()
        }else{
            setModalLoading(false)
            handleAlert({type: 'openAlert', title: 'Erro', body: 'Erro desconhecido'})
        }
        

    }

    useEffect(() => {

        handleGetCategories()

        handleGetSubcategories()

    }, [])


    return (
        <div className="Product">

            <Alert args={alert} closeAlert={handleAlert} />

            {/*
                MODAL PARA CADASTRO DE PRODUTOS    
            */}
            <Modal show={modalStatus} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastro de produtos</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Código do produto</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o código"
                                value={state.productCode}
                                onChange={e => { dispatch({ type: 'changeCode', value: e.target.value }) }}
                            />
                            <Form.Text className="text-muted">Código de identificação do produto</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Descrição do produto</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite a descrição"
                                value={state.productDescription}
                                onChange={e => dispatch({ type: 'changeDescription', value: e.target.value })}
                            />
                        </Form.Group>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-around'
                        }}>
                            <Form.Group className="mb-3" style={{ width: '49%' }}>
                                <Form.Label>Valor de venda a vista</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0.00"
                                    max="10000.00"
                                    step="0.01"
                                    value={state.productCashPaymentValue}
                                    onChange={e => dispatch({ type: 'changeCashPaymentValue', value: e.target.value })}
                                />
                                <Form.Text className="text-muted">Valor que o produto será vendido</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" style={{ width: '49%' }}>
                                <Form.Label>Valor de venda a prazo</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0.00"
                                    max="10000.00"
                                    step="0.01"
                                    value={state.productDeferredPaymentValue}
                                    onChange={e => dispatch({ type: 'changeDeferredPaymentValue', value: e.target.value })}
                                />
                            </Form.Group>
                        </div>

                        <Form.Group className="mb-3" style={{ width: '49%' }}>
                            <Form.Label>Valor de compra</Form.Label>
                            <Form.Control
                                type="number"
                                min="0.00"
                                max="10000.00"
                                step="0.01"
                                value={state.productPurchaseValue}
                                onChange={e => dispatch({ type: 'changePurchaseValue', value: e.target.value })}
                            />
                            <Form.Text className="text-muted">Valor que o produto foi comprado do fornecedor</Form.Text>
                        </Form.Group>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-around'
                        }}>
                            <Form.Group className="mb-3" style={{ width: '49%' }}>
                                <Form.Label>Categoria</Form.Label>
                                <Form.Select
                                    value={state.productCategory}
                                    onChange={e => {
                                        dispatch({ type: 'changeCategory', value: e.target.value })
                                        changeSubcategories(e.target.value)
                                    }}
                                >
                                    <option value="">Selecione uma categoria</option>
                                    {categoriesOptions}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" style={{ width: '49%' }}>
                                <Form.Label>Subcategoria</Form.Label>
                                <Form.Select
                                    value={state.productSubcategory}
                                    onChange={e => dispatch({ type: 'changeSubcategory', value: e.target.value })}
                                >
                                    <option value="" >Selecione uma subcategoria</option>
                                    {subcategoriesOptions}
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <ClipLoader loading={modalLoading} color={'#000'} size={30}/>
                    <Button variant="primary" onClick={handleSaveProduct}>Salvar</Button>
                    <Button variant="success" onClick={e => dispatch({ type: 'clearFields' })}>Limpar campos</Button>
                    <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                </Modal.Footer>
            </Modal>
            {/*
                FIM DO MODAL PARA CADASTRO DE PRODUTOS    
            */}

            <div className="buttons">
                <button onClick={handleShow}>Novo produto</button>
            </div>

            <div className="products-list">
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
            </div>
        </div>
    )
}