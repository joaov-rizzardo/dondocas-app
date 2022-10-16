import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';
import './ExpenseModal.scss'
import { useState } from 'react';
import useExpenseCategory from '../../hooks/useExpenseCategory';
import { useReducer } from 'react';
import { alertReducer, innitialAlert } from '../../reducers/alertModal/alertModal';
import Alert from '../Alert/Alert';
import axios from 'axios';
import baseUrl from '../../configs/Url';
import { getFormatedDateTime } from '../../services/FormatDate';

export default function ExpenseModal(props) {

    const [loading, setLoading] = useState(false)

    const [alertModal, handleAlert] = useReducer(alertReducer, innitialAlert)

    const categories = useExpenseCategory()

    const handleSaveExpense = async () => {

        // VALIDAÇÃO DE CATEGORIA
        if (props.expense.category_key == '') {
            handleAlert({ type: 'openAlert', title: 'Atenção', body: 'Necessário selecionar uma categoria' })
            return
        }

        // VALIDAÇÃO DA DESCRIÇÃO
        if (props.expense.expense_description == '') {
            handleAlert({ type: 'openAlert', title: 'Atenção', body: 'Necessário informar uma descrição para despesa' })
            return
        }

        // VALIDAÇÃO DO VALOR
        if (props.expense.expense_value == '' || props.expense.expense_value == 0) {
            handleAlert({ type: 'openAlert', title: 'Atenção', body: 'Necessário informar um valor válido para despesa' })
            return
        }

        setLoading(true)

        // SE A CHAVE FOR VAZIA TRATA-SE DE UM CREATE
        // SE POSSUIR VALOR TRATA-SE DE UM UPDATE
        if (props.expense.expense_key == '') {

            const payload = {
                categoryKey: props.expense.category_key,
                expenseDescription: props.expense.expense_description,
                expenseValue: props.expense.expense_value,
                expenseDate: getFormatedDateTime(props.expenseDate) ?? ''
            }

            const response = await axios.post(`${baseUrl.backendApi}/expense/create`, payload).catch(error => {
                console.log(error)
                setLoading(false)
                handleAlert({ type: 'openAlert', title: 'Erro', body: `Ocorreu um erro ao cadastrar a despesa - ${error.message}` })
                return
            })

            if (response.data?.status == 'success') {
                setLoading(false)
                handleAlert({ type: 'openAlert', title: 'Sucesso', body: `Despesa cadastrada com sucesso` })
                props.handleExpense({ type: 'clearExpense' })
                props.handleUpdateData(state => !state)
                return

            } else {
                setLoading(false)
                handleAlert({ type: 'openAlert', title: 'Erro', body: `Ocorreu um erro inesperado- ${response.data?.message}` })
                return
            }
              
        // FLUXO PARA O CASO DE UPDATE
        } else {

            const payload = {
                expenseKey: props.expense.expense_key,
                categoryKey: props.expense.category_key,
                expenseDescription: props.expense.expense_description,
                expenseValue: props.expense.expense_value
            }

            const response = await axios.put(`${baseUrl.backendApi}/expense/update`, payload).catch(error => {
                console.log(error)
                setLoading(false)
                handleAlert({ type: 'openAlert', title: 'Erro', body: `Ocorreu um erro ao atualizar a despesa - ${error.message}` })
                return
            })

            if (response.data?.status == 'success') {
                setLoading(false)
                handleAlert({ type: 'openAlert', title: 'Sucesso', body: `Despesa atualizada com sucesso` })
                props.handleUpdateData(state => !state)
                return

            } else {
                setLoading(false)
                handleAlert({ type: 'openAlert', title: 'Erro', body: `Ocorreu um erro inesperado- ${response.data?.message}` })
                return
            }
        }
    }

    return (
        <>
            <Alert args={alertModal} closeAlert={handleAlert} />

            <Modal show={props.modalStatus} onHide={props.handleClose} size='lg' dialogClassName="ExpenseModal">
                <Modal.Body>

                    <div className="grid-form">
                        <Form.Group className="mb-3">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Select
                                value={props.expense.category_key}
                                onChange={e => props.handleExpense({ type: 'changeCategory', category_key: e.target.value })}
                            >
                                <option value=''>Selecione uma categoria</option>
                                {categories?.map(category => <option value={category.category_key} key={category.category_key}>{category.category_description}</option>)}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Valor da despesa</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Digite o valor"
                                value={props.expense.expense_value}
                                onChange={e => props.handleExpense({ type: 'changeValue', expense_value: e.target.value })}
                            />
                        </Form.Group>
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Label>Descrição da despesa</Form.Label>
                        <Form.Control
                            type="text"
                            as="textarea"
                            maxlength="200"
                            rows={3}
                            value={props.expense.expense_description}
                            onChange={e => props.handleExpense({ type: 'changeDescription', expense_description: e.target.value })}
                        />
                    </Form.Group>

                </Modal.Body>

                <Modal.Footer>
                    <div className="buttons">
                        <ClipLoader loading={loading} color={'#000'} size={30} />
                        <Button onClick={handleSaveExpense}>Salvar</Button>
                        <Button onClick={e => props.handleExpense({ type: 'clearExpense' })}>Limpar campos</Button>
                        <Button onClick={props.handleClose}>Fechar</Button>
                    </div>

                </Modal.Footer>
            </Modal>
        </>
    )
}