import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './ProductAdd.scss'
import { ClipLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
import baseUrl from '../../configs/Url';
import axios from 'axios';

export default function ProductAdd(props) {

    const [categories, setCategories] = useState([])

    const [subcategories, setSubcategories] = useState([])

    const [find, setFind] = useState({
        product_code : '',
        category_key: '',
        subcategory_key: ''
    })

    const handleGetCategories = async () => {
        const categoryResponse = await axios.get(`${baseUrl.backendApi}/category/get`)
            .catch(error => console.log(error))

        setCategories(categoryResponse.data)
    }

    const handleGetSubcategories = async () => {

        const subcategoryResponse = await axios.get(`${baseUrl.backendApi}/subcategory/get`)
            .catch(error => console.log(error))

        setSubcategories(subcategoryResponse.data)

    }

    useEffect(() => {
        handleGetCategories()
        handleGetSubcategories()
    }, [])

    return (
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
                                    product_code : e.target.value
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
                                    category_key : e.target.value
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
                                    subcategory_key : e.target.value
                                }
                            })}
                        >
                            <option value="">Selecione a subcategoria</option>

                            {
                            subcategories.filter(subcategory => {
                                if(subcategory.category_key == find.category_key){
                                    return subcategory
                                }
                            }, find.category_key).map(subcategory => {
                                return (<option key={subcategory.subcategory_key} value={subcategory.subcategory_key}>{subcategory.subcategory_description}</option>)
                            })
                            }
                        </Form.Select>

                    </Form.Group>

                    <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </div>

                {
                    false ? <div className="product">
                        <table>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Descrição</th>
                                    <th>Valor de compra</th>
                                    <th>Preço a prazo</th>
                                    <th>Preço a vista</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr>
                                    <td>01</td>
                                    <td>Descrição teste</td>
                                    <td>R$ 23,50</td>
                                    <td>R$ 23,50</td>
                                    <td>R$ 23,50</td>
                                </tr>

                            </tbody>
                        </table>
                    </div> : ''
                }


            </Modal.Body>

            <Modal.Footer>

                <div className="buttons">
                    <ClipLoader loading={false} color={'#000'} size={30} />
                    <Button>Adicionar</Button>
                    <Button onClick={props.handleClose}>Fechar</Button>
                </div>

            </Modal.Footer>
        </Modal>
    )
}