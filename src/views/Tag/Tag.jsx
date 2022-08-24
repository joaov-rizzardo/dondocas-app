import { faPlus, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useReducer } from 'react'
import { useState } from 'react'
import { Form } from 'react-bootstrap'
import useCategory from '../../hooks/useCategory'
import { innitialTags, tagReducer } from '../../reducers/TagReducer/TagReducer'
import './Tag.scss'

export function Tag() {

    const [categories, subcategories] = useCategory()

    const [find, setFind] = useState({
        product_code: "",
        category_key: "",
        subcategory_key: ""
    })

    const [addTag, setAddTag] = useState({
        product_code : "",
        subcategory_key: "",
        net_value: "",
        deffered_value: "",
        quantity: ""
    })

    const [tags, handleTags] = useReducer(tagReducer, innitialTags)

    console.log(tags)

    return (
        <main className="Tag">
            <section className="configs">
                <div className="find-product">
                    <Form.Group>
                        <Form.Control
                            placeholder="Ex 01"
                            value={find.product_code}
                            onChange={e => setFind(prevState => { return {...prevState, product_code: e.target.value}})}
                        />
                        <span>Código</span>
                    </Form.Group>

                    <Form.Group>
                        <Form.Select
                            value={find.category_key}
                            onChange={e => setFind(prevState => {return {...prevState, category_key: e.target.value}})}
                        >
                            <option value="">Não selecionado</option>
                            {categories.map(category => {
                                return <option key={category.category_key} value={category.category_key}>{category.category_description}</option>
                            })}
                        </Form.Select>
                        <span>Categoria</span>
                    </Form.Group>

                    <Form.Group>
                        <Form.Select>
                            <option value="">Não selecionado</option>
                            {subcategories.filter(subcategory => {
                                if(subcategory.category_key == find.category_key){
                                    return subcategory
                                }
                            }).map(subcategory => {return <option key={subcategory.subcategory_key} value={subcategory.subcategory_key}>{subcategory.subcategory_description}</option>})}
                        </Form.Select>
                        <span>Subcategoria</span>
                    </Form.Group>

                    <button><FontAwesomeIcon icon={faSearch} /></button>
                </div>

                <div className="add-product">
                    <Form.Group>
                        <Form.Control
                        />
                        <Form.Text className="text-muted">Código</Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Select>
                            <option value="">Não selecionado</option>
                            {subcategories.map(subcategory => {return <option value={subcategory.subcategory_key} key={subcategory.subcategory_key}>{subcategory.subcategory_description}</option>})}
                        </Form.Select>
                        <Form.Text className="text-muted">Subcategoria</Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                        />
                        <Form.Text className="text-muted">Valor a vista</Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                        />
                        <Form.Text className="text-muted">Valor a prazo</Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                        />
                        <Form.Text className="text-muted">Quantidade</Form.Text>
                    </Form.Group>

                    <button><FontAwesomeIcon icon={faPlus} /></button>
                </div>

                <div className="tag-items">
                    <div>
                        <span>03</span>
                        <span>Sapatilhas</span>
                        <span>R$ 75,50 a prazo</span>
                        <span>R$ 75,50 a vista</span>
                        <Form.Group>
                            <Form.Control
                            />
                        </Form.Group>
                        <button><FontAwesomeIcon icon={faTrash}/></button>
                    </div>

                    <div>
                        <span>03</span>
                        <span>Sapatilhas</span>
                        <span>R$ 75,50 a prazo</span>
                        <span>R$ 75,50 a vista</span>
                        <Form.Group>
                            <Form.Control
                            />
                        </Form.Group>
                        <button><FontAwesomeIcon icon={faTrash}/></button>
                    </div>

                    <div>
                        <span>03</span>
                        <span>Sapatilhas</span>
                        <span>R$ 75,50 a prazo</span>
                        <span>R$ 75,50 a vista</span>
                        <Form.Group>
                            <Form.Control
                            />
                        </Form.Group>
                        <button><FontAwesomeIcon icon={faTrash}/></button>
                    </div>
                </div>
            </section>

            <section className="preview">

            </section>
        </main>
    )
}