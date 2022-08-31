import { faFilePdf, faPlus, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Alert from '../../components/Alert/Alert';
import { useReducer } from 'react'
import { useState } from 'react'
import { Form } from 'react-bootstrap'
import useCategory from '../../hooks/useCategory'
import { alertReducer, innitialAlert } from '../../reducers/alertModal/alertModal'
import { innitialTags, tagReducer } from '../../reducers/TagReducer/TagReducer'
import './Tag.scss'
import axios from 'axios';
import baseUrl from '../../configs/Url';
import printJS from 'print-js';

export function Tag() {

    const [categories, subcategories] = useCategory()

    const [alert, handleAlert] = useReducer(alertReducer, innitialAlert)

    const [find, setFind] = useState({
        product_code: "",
        category_key: "",
        subcategory_key: ""
    })

    const [addTag, setAddTag] = useState({
        product_code: "",
        subcategory_key: "",
        cash_value: "",
        deferred_value: "",
        quantity: ""
    })

    const [tags, handleTags] = useReducer(tagReducer, innitialTags)

    const fillTags = Array()

    for (let tag of tags) {
        for (let i = 0; i < tag.quantity; i++) {
            fillTags.push(tag)
        }
    }

    const handleAddTag = () => {

        const fields = Object.values(addTag)

        let stopCondition = false

        for (let field of fields) {
            if (field == '') {
                handleAlert({ type: 'openAlert', title: 'Atenção', body: 'Todos os campos devem ser preenchidos' })
                stopCondition = true
            }
        }

        if (stopCondition) return false

        handleTags({
            type: 'addTag',
            product_code: addTag.product_code,
            subcategory_key: addTag.subcategory_key,
            cash_value: addTag.cash_value,
            deferred_value: addTag.deferred_value,
            quantity: addTag.quantity
        })

        handleAlert({ type: 'openAlert', title: 'Sucesso', body: 'Etiqueta incluída com sucesso' })
    }

    const handleSearchProduct = async () => {

        if (find.product_code == '' || find.category_key == '' || find.subcategory_key == '') {
            handleAlert({ type: 'openAlert', title: 'Atenção', body: 'Todos os campos devem ser preenchidossss' })
            return
        }

        const response = await axios.get(`${baseUrl.backendApi}/product/get/${find.subcategory_key}/${find.product_code}`).catch(error => {
            handleAlert({ type: 'openAlert', title: 'Error', body: `Erro ao buscar produto - ${error.message}` })
            return
        })

        if (response.data?.length == 0) {
            handleAlert({ type: 'openAlert', title: 'Atenção', body: 'Nenhum produto foi encontrado' })
            return
        }

        const product = response.data[0]

        setAddTag({
            product_code: product.product_code ?? '',
            subcategory_key: product.subcategory_key ?? '',
            cash_value: product.product_cash_payment_value ?? '',
            deferred_value: product.product_deferred_payment_value ?? '',
            quantity: 1
        })

        handleAlert({ type: 'openAlert', title: 'Sucesso', body: 'Produto encontrado, os campos abaixo foram preenchidos com seus dados' })

    }

    const handleGeneratePDF = () => {
        printJS({
            printable: 'content',
            type: 'html',
            scanStyles: false,
            style: "#content {display: grid;grid-template-columns: 1fr 1fr 1fr 1fr 1fr;}  #content >div{width: 100%; height: 80px; border:1px solid #e8e8e8; display: flex;flex-direction: column;justify-content: center;gap: 5px;align-items: center;page-break-inside: avoid;} #content >div span { display: block;font-size: 0.8em; text-align:center;}",
            font_size: '25px',
            documentTitle: 'Etiquetas'
        })
    }

    return (
        <main className="Tag">

            <Alert args={alert} closeAlert={handleAlert} />
            <section className="configs">
                {
                    //------------------------------------------------------------------------------------------------
                    //                                  CAMPOS PARA BUSCA DE PRODUTOS
                    //------------------------------------------------------------------------------------------------
                }
                <div className="find-product">
                    <Form.Group>
                        <Form.Control
                            placeholder="Ex 01"
                            value={find.product_code}
                            onChange={e => setFind(prevState => { return { ...prevState, product_code: e.target.value } })}
                        />
                        <span>Código</span>
                    </Form.Group>

                    <Form.Group>
                        <Form.Select
                            value={find.category_key}
                            onChange={e => setFind(prevState => { return { ...prevState, category_key: e.target.value } })}
                        >
                            <option value="">Não selecionado</option>
                            {categories.map(category => {
                                return <option key={category.category_key} value={category.category_key}>{category.category_description}</option>
                            })}
                        </Form.Select>
                        <span>Categoria</span>
                    </Form.Group>

                    <Form.Group>
                        <Form.Select
                            value={find.subcategory_key}
                            onChange={e => setFind(prevState => { return { ...prevState, subcategory_key: e.target.value } })}
                        >
                            <option value="">Não selecionado</option>
                            {subcategories.filter(subcategory => {
                                if (subcategory.category_key == find.category_key) {
                                    return subcategory
                                }
                            }).map(subcategory => { return <option key={subcategory.subcategory_key} value={subcategory.subcategory_key}>{subcategory.subcategory_description}</option> })}
                        </Form.Select>
                        <span>Subcategoria</span>
                    </Form.Group>

                    <button onClick={handleSearchProduct}><FontAwesomeIcon icon={faSearch} /></button>
                </div>
                {
                    //------------------------------------------------------------------------------------------------
                    //                                  CAMPOS PARA ADICIONAR ETIQUETAS
                    //------------------------------------------------------------------------------------------------
                }

                <div className="add-product">
                    <Form.Group>
                        <Form.Control
                            value={addTag.product_code}
                            onChange={e => setAddTag(prevState => { return { ...prevState, product_code: e.target.value } })}
                        />
                        <Form.Text className="text-muted">Código</Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Select
                            value={addTag.subcategory_key}
                            onChange={e => setAddTag(prevState => { return { ...prevState, subcategory_key: e.target.value } })}
                        >
                            <option value="">Não selecionado</option>
                            {subcategories.map(subcategory => { return <option value={subcategory.subcategory_key} key={subcategory.subcategory_key}>{subcategory.subcategory_description}</option> })}
                        </Form.Select>
                        <Form.Text className="text-muted">Subcategoria</Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            value={addTag.cash_value}
                            onChange={e => setAddTag(prevState => { return { ...prevState, cash_value: e.target.value } })}
                            type="number"
                        />
                        <Form.Text className="text-muted">Valor a vista</Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            value={addTag.deferred_value}
                            onChange={e => setAddTag(prevState => { return { ...prevState, deferred_value: e.target.value } })}
                            type="number"
                        />
                        <Form.Text className="text-muted">Valor a prazo</Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            value={addTag.quantity}
                            onChange={e => setAddTag(prevState => { return { ...prevState, quantity: e.target.value } })}
                            type="number"
                        />
                        <Form.Text className="text-muted">Quantidade</Form.Text>
                    </Form.Group>

                    <button onClick={handleAddTag}><FontAwesomeIcon icon={faPlus} /></button>
                </div>

                <div className="tag-items">

                    {tags.map(tag => {
                        return (
                            <div>
                                <span>{tag.product_code}</span>
                                <span>{subcategories.find(subcategory => {
                                    if (subcategory.subcategory_key == tag.subcategory_key) {
                                        return subcategory
                                    }
                                })?.subcategory_description}</span>
                                <span>R$ {tag.cash_value} a vista</span>
                                <span>R$ {tag.deferred_value} a prazo</span>

                                <Form.Group>
                                    <Form.Control
                                        value={tag.quantity}
                                        onChange={e => handleTags({ type: 'changeQuantity', id: tag.id, quantity: e.target.value })}
                                    />
                                </Form.Group>
                                <button onClick={e => handleTags({ type: 'deleteTag', id: tag.id })}><FontAwesomeIcon icon={faTrash} /></button>
                            </div>
                        )
                    })}

                </div>
            </section>

            <section className="preview">

                <button onClick={handleGeneratePDF}>Gerar PDF <FontAwesomeIcon style={{ fontSize: '1.5em' }} icon={faFilePdf} /></button>

                <div className="tags">
                    {tags.map(tag => {
                        return (
                            <div>
                                <span>{tag.product_code} - {subcategories.find(subcategory => {
                                    if (subcategory.subcategory_key == tag.subcategory_key) {
                                        return subcategory
                                    }
                                })?.subcategory_description}</span>
                                <span>R$ {tag.cash_value} a vista</span>
                                <span>R$ {tag.deferred_value} a prazo</span>
                            </div>
                        )
                    })}
                </div>

            </section>

            {
                //------------------------------------------------------------------------------------------------
                //                                  CONTEÚDO DA IMPRESSÃO
                //------------------------------------------------------------------------------------------------
            }
            <div id="content">
                {fillTags.map(tag => {
                    return (
                        <div>
                            <span>{tag.product_code} - {subcategories.find(subcategory => {
                                if (subcategory.subcategory_key == tag.subcategory_key) {
                                    return subcategory
                                }
                            })?.subcategory_description}</span>
                            <span>R$ {tag.cash_value} a vista</span>
                            <span>R$ {tag.deferred_value} a prazo</span>
                        </div>
                    )
                })}
            </div>
        </main>
    )
}