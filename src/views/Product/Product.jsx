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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { filterReducer, innitialFilter } from '../../reducers/ProductFilter/ProductFilter';
import SkeletonLoader from '../../components/ContentLoader/SkeletonLoader';

export default function Product() {

    const [modalStatus, setModalStatus] = useState(false)

    const [categories, setCategories] = useState([])

    const [products, setProducts] = useState([])

    const [productItems, setProductItems] = useState([])

    const [subcategories, setSubcategories] = useState([])

    const [categoriesOptions, setCategoriesOptions] = useState([])

    const [subcategoriesOptions, setSubcategoriesOptions] = useState([])

    const [filterCategories, setFilterCategories] = useState([])

    const [filterSubcategories, setFilterSubcategories] = useState([])

    const [modalLoading, setModalLoading] = useState(false)

    const [state, dispatch] = useReducer(reducer, innitialState)

    const [alert, handleAlert] = useReducer(alertReducer, innitialAlert)

    const [filter, handleFilter] = useReducer(filterReducer, innitialFilter)

    const [loading, setLoading] = useState(false)

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

        setFilterCategories(res.data.map(category => {
            return (
                <option key={category.category_key} value={category.category_key}>{category.category_description}</option>
            )
        }))
    }

    const handleGetProducts = async () => {
        setLoading(true)
        const res = await axios.get(`${baseUrl.backendApi}/product/get`)
            .catch(error => {
                handleAlert({ type: 'openAlert', title: 'Erro', body: `Erro ao seu comunicar com o servidor - ${error.message}` })
            })

        setProducts(res.data)

        setLoading(false)
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

        // VALIDAÇÃO SE UM PRODUTO COM O MESMO CÓDIGO JÁ EXISTE
        const res = await axios.get(`${baseUrl.backendApi}/product/get/${state.productSubcategory}/${state.productCode}`).catch(error => {
            setModalLoading(false)
            handleAlert({ type: 'openAlert', title: 'Erro', body: `Erro ao seu comunicar com o servidor - ${error.message}` })
        })

        if (res.data.length > 0) {
            setModalLoading(false)
            handleAlert({ type: 'openAlert', title: 'Atenção', body: 'Já existe um produto cadastrado com o mesmo código' })
            return
        }


        const payload = {
            productKey: state.productKey,
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

        if (response.status == 201) {
            setModalLoading(false)
            handleAlert({ type: 'openAlert', title: 'Sucesso', body: message })
            handleClose()
        } else {
            setModalLoading(false)
            handleAlert({ type: 'openAlert', title: 'Erro', body: 'Erro desconhecido' })
        }
    }

    // DADOS QUE SÃO BUSCADOS DO BACKEND LOGO QUANDO A PÁGINA É RENDERIZADA
    useEffect(() => {
        handleGetCategories()
        handleGetSubcategories()
        handleGetProducts()
    }, [])

    // MONTA O COMPONENTE DE ITENS QUE SERÁ EXIBIDO NA TELA COM BASE NO STATE DE PRODUCTS
    useEffect(() => {
        setProductItems(products.map(product => {
            return <ProductItem key={product.product_key} product={product} dispatch={dispatch} openModal={handleShow} />
        }))
    }, [products])

    // DEPENDE DA CATEGORIA DO PRODUTO PARA BUSCAR AS SUBCATEGORIAS CORRESPONDENTES E MONTAR AS OPTIONS
    useEffect(() => {
        const availableSubcategories = subcategories.filter((subcategory) => {
            if (state.productCategory == subcategory.category_key) {
                return subcategory
            }
        }, state.productCategory)

        const options = availableSubcategories.map(subcategory => {
            return (<option key={subcategory.subcategory_key} value={subcategory.subcategory_key}>{subcategory.subcategory_description}</option>)
        })
        setSubcategoriesOptions(options)
    }, [state.productCategory, subcategories])

    useEffect(() => {
        const availableSubcategories = subcategories.filter((subcategory) => {
            if (filter.productCategory == subcategory.category_key) {
                return subcategory
            }
        }, filter.productCategory)

        const options = availableSubcategories.map(subcategory => {
            return (<option key={subcategory.subcategory_key} value={subcategory.subcategory_key}>{subcategory.subcategory_description}</option>)
        })

        setFilterSubcategories(options)
    }, [filter.productCategory, subcategories])

    useEffect(() => {

        let filteredProducts = products


        if(filter.productCode != ''){

            filteredProducts = filteredProducts.filter(product => {
                
                if(product.product_code == filter.productCode){ 
                    return product
                }
            })
        }

        if(filter.productCategory != ''){
            filteredProducts = filteredProducts.filter(product => {
                if(product.category_key == filter.productCategory){
                    return product
                }
            })
        }

        if(filter.productSubcategory != ''){
            filteredProducts = filteredProducts.filter(product => {
                if(product.subcategory_key == filter.productSubcategory){
                    return product
                }
            })
        }

        setProductItems(filteredProducts.map(product => {
            return <ProductItem key={product.product_key} product={product} dispatch={dispatch} openModal={handleShow} />
        }))

    }, [filter])


    return (
        <div className="Product">

            <Alert args={alert} closeAlert={handleAlert} />

            {/*
                MODAL PARA CADASTRO DE PRODUTOS    
            */}
            <Modal show={modalStatus} onHide={handleClose} size='lg' dialogClassName="product-modal">
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
                    <ClipLoader loading={modalLoading} color={'#000'} size={30} />
                    <Button onClick={handleSaveProduct}>Salvar</Button>
                    <Button onClick={e => dispatch({ type: 'clearFields' })}>Limpar campos</Button>
                    <Button onClick={handleClose}>Fechar</Button>
                </Modal.Footer>
            </Modal>
            {/*
                FIM DO MODAL PARA CADASTRO DE PRODUTOS    
            */}

            <div className="header">
                <button onClick={handleShow}><FontAwesomeIcon icon={faPlus} /><span>Novo produto</span></button>

                <Form.Control
                    type="text"
                    placeholder="Código do produto"
                    value={filter.productCode}
                    onChange={e => handleFilter({ type: 'changeProductCode', value: e.target.value })} />

                <Form.Select
                    value={filter.productCategory}
                    onChange={e => {
                        handleFilter({ type: 'changeProductCategory', value: e.target.value })
                    }}>
                    <option value="">Selecione uma categoria</option>
                    {filterCategories}
                </Form.Select>

                <Form.Select
                    value={filter.productSubcategory}
                    onChange={e => handleFilter({ type: 'changeProductSubcategory', value: e.target.value })}
                >
                    <option value="" >Selecione uma subcategoria</option>
                    {filterSubcategories}
                </Form.Select>
            </div>

            {loading ? <SkeletonLoader /> : ''}
            
            {!loading ? <div className="products-list">
                {productItems}
            </div> : ''}
        </div>
    )
}