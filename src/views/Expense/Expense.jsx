
import { faDollar, faFileInvoice, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useEffect } from 'react'
import { useReducer } from 'react'
import { useState } from 'react'
import { Form } from 'react-bootstrap'
import Chart from 'react-google-charts'
import Alert from '../../components/Alert/Alert'
import ExpenseModal from '../../components/ExpenseModal/ExpenseModal'
import MonthPicker from '../../components/MonthPicker/MonthPicker'
import baseUrl from '../../configs/Url'
import { alertReducer, innitialAlert } from '../../reducers/alertModal/alertModal'
import { expenseReducer, innitialExpense } from '../../reducers/Expense/Expense'
import './Expense.scss'

export default function Expense() {

    const [date, setDate] = useState(new Date())

    const [alertModal, handleAlert] = useReducer(alertReducer, innitialAlert)

    const [expense, handleExpense] = useReducer(expenseReducer, innitialExpense)

    const [expenseList, setExpenseList] = useState([])

    const handleGetExpenseList = async () => {
        const year = date.getFullYear()

        let month = date.getMonth() + 1

        month = month.toString().padStart(2, '0')

        const response = await axios.get(`${baseUrl.backendApi}/expense/get/${year}/${month}`).catch(error => {
            console.log(error)
            handleAlert({ type: 'openAlert', title: 'Erro', body: `Ocorreu um erro ao buscar as despesas - ${error.message}` })
            return
        })

        setExpenseList(response.data)
    }

    useEffect(() => {
        handleGetExpenseList()
    }, [])

    const [modal, setModal] = useState(false)

    const closeModal = () => {
        handleExpense({ type: 'clearExpense' })
        setModal(false)
    }

    const updateExpense = expense => {
        handleExpense({type: 'setState', expense: expense})
        setModal(true)
    }

    const options = {
        title: 'Despesas Mensais',
        width: '100%',
        height: '300px',
        backgroundColor: { fill: 'transparent' },
        titleTextStyle: {
            color: '#fff',
            fontSize: 24,
            bold: false
        },
        legend: {
            textStyle: {
                color: '#fff',
                fontSize: 14,
            }
        }
    }

    const teste = [
        ["Task", "Hours per Day"],
        ['React', 100],
        ['Angula', 80],
        ['Vue', 50]
    ]


    return (
        <main className="Expense">

            <Alert args={alertModal} handleAlert={handleAlert} />

            <ExpenseModal expense={expense} handleExpense={handleExpense} modalStatus={modal} handleClose={closeModal} />

            <MonthPicker className="MonthPicker" date={date} setDate={setDate} />

            <div className="gauges">
                <div className="expense-info">
                    <div className="icon">
                        <FontAwesomeIcon icon={faDollar} />
                    </div>

                    <div className="total-expense">
                        <h2>R$ 23,59</h2>
                        <span>Valor total de despesas mensais</span>
                    </div>
                </div>

                <div className="expense-chart">
                    <Chart chartType="PieChart" data={teste} options={options} />
                </div>
            </div>

            <div className="expense-filter">
                <button onClick={e => setModal(true)}>Nova Despesa</button>
                <Form.Select>
                    <option>Categoria</option>
                </Form.Select>
            </div>

            <div className="expense-list">
                {expenseList.map(expense => {
                    return (
                        <div key={expense.expense_key} className="expense-item">

                            <div className="expense-item-header">
                                <div className="expense-item-icon">
                                    <FontAwesomeIcon icon={faFileInvoice} />
                                </div>

                                <div className="expense-item-info">
                                    <small>{expense.formatedExpenseDate}</small>
                                    <h2>{expense.expense_value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
                                    <span>{expense.category_description}</span>
                                </div>
                            </div>

                            <div className="expense-item-body">
                                <span>{expense.expense_description}</span>
                            </div>

                            <div className="expense-item-buttons">
                                <button onClick={e => updateExpense(expense)}><FontAwesomeIcon icon={faPen} /></button>
                                <button><FontAwesomeIcon icon={faTrash} /></button>
                            </div>

                        </div>
                    )
                })}

            </div>

        </main>
    )
}