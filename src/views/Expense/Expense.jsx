
import { faChartPie, faDollar, faFileInvoice, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
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
import useExpenseCategory from '../../hooks/useExpenseCategory'
import { alertReducer, innitialAlert } from '../../reducers/alertModal/alertModal'
import { expenseReducer, innitialExpense } from '../../reducers/Expense/Expense'
import Confirm from '../../components/Confirm/Confirm'
import './Expense.scss'
import { confirmReducer, innitialConfirm } from '../../reducers/ConfirmModal/ConfirmModal'

export default function Expense() {

    const [date, setDate] = useState(new Date())

    const [alertModal, handleAlert] = useReducer(alertReducer, innitialAlert)

    const [expense, handleExpense] = useReducer(expenseReducer, innitialExpense)

    const [confirm, handleConfirm] = useReducer(confirmReducer, innitialConfirm)

    const [updateData, handleUpdateData] = useState(false)

    const [filter, setFilter] = useState('')

    const [expenseList, setExpenseList] = useState([])

    const [totalExpense, setTotalExpense] = useState(0)

    const [totalCategories, setTotalCategories] = useState([])

    const categories = useExpenseCategory()

    // BUSCA A LISTA DE DESPESAS PARA O MÊS SELECIONADO
    const handleGetExpenseList = async (year, month) => {

        const response = await axios.get(`${baseUrl.backendApi}/expense/get/${year}/${month}`).catch(error => {
            console.log(error)
            handleAlert({ type: 'openAlert', title: 'Erro', body: `Ocorreu um erro ao buscar as despesas - ${error.message}` })
            return
        })

        setExpenseList(response.data)
    }

    // BUSCA O VALOR TOTAL DE DESPESAS PARA O MÊS SELECIONADO
    const handleGetTotalExpense = async (year, month) => {

        const response = await axios.get(`${baseUrl.backendApi}/expense/expensePerMonth/${year}/${month}`).catch(error => {
            console.log(error)
            handleAlert({ type: 'openAlert', title: 'Erro', body: `Ocorreu um erro ao buscar o valor total de despesas - ${error.message}` })
            return
        })

        setTotalExpense(response.data?.totalAmount)
    }

    // BUSCA OS VALORES TOTAIS DE DESPESAS POR CATEGORIA
    const handleGetTotalPerCategory = async (year, month) => {
        const response = await axios.get(`${baseUrl.backendApi}/expense/amountPerCategory/${year}/${month}`).catch(error => {
            console.log(error)
            handleAlert({ type: 'openAlert', title: 'Erro', body: `Ocorreu um erro ao buscar o valor total de despesas por categoria - ${error.message}` })
            return
        })

        setTotalCategories(response.data)
    }

    useEffect(() => {
        const year = date.getFullYear()

        let month = date.getMonth() + 1

        month = month.toString().padStart(2, '0')

        handleGetExpenseList(year, month)
        handleGetTotalExpense(year, month)
        handleGetTotalPerCategory(year, month)

    }, [date, updateData])

    const [modal, setModal] = useState(false)

    const closeModal = () => {
        handleExpense({ type: 'clearExpense' })
        setModal(false)
    }

    const updateExpense = expense => {
        handleExpense({ type: 'setState', expense: expense })
        setModal(true)
    }

    const chartOptions = {
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

    const chartData = [
        ["Categoria", "Valor"]
    ]

    totalCategories.forEach(category => {
        chartData.push([category.category_description, category.amount])
    })

    const handleDeleteExpense = async expense_key => {

        handleConfirm({ type: 'setLoading', loading: true })

        const response = await axios.put(`${baseUrl.backendApi}/expense/inactivate/${expense_key}`).catch(error => {
            handleConfirm({ type: 'closeConfirm' })
            handleAlert({ type: 'openAlert', title: 'Erro', body: `Ocorreu um erro ao excluir a despesa - ${error.message}` })
            return
        })

        if (response.data) {
            handleConfirm({ type: 'closeConfirm' })
            handleUpdateData(state => !state)
        }
    }

    return (
        <main className="Expense">

            <Confirm confirm={confirm} handleConfirm={handleConfirm} />

            <Alert args={alertModal} closeAlert={handleAlert} />

            <ExpenseModal handleUpdateData={handleUpdateData} expense={expense} handleExpense={handleExpense} modalStatus={modal} handleClose={closeModal} />

            <MonthPicker className="MonthPicker" date={date} setDate={setDate} />

            <div className="gauges">
                <div className="expense-info">
                    <div className="icon">
                        <FontAwesomeIcon icon={faDollar} />
                    </div>

                    <div className="total-expense">
                        <h2>{totalExpense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
                        <span>Valor total de despesas mensais</span>
                    </div>
                </div>

                <div className="expense-chart">
                    {totalCategories.length > 0
                        ?
                        <Chart chartType="PieChart" data={chartData} options={chartOptions} />
                        :
                        <div className="not-found-chart">
                            <h3>Nenhuma despesa registrada para o mês selecionado</h3>
                            <FontAwesomeIcon icon={faChartPie} />
                        </div>
                    }
                </div>
            </div>

            <div className="expense-filter">
                <button onClick={e => setModal(true)}>Nova Despesa</button>
                <Form.Select
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                >
                    <option value="">Categoria</option>
                    {categories.map(category => <option value={category.category_key} key={category.category_key}>{category.category_description}</option>)}
                </Form.Select>
            </div>

            <div className="expense-list">
                {expenseList.filter(expense => {
                    if(filter == '' || expense.category_key == filter) return expense
                }).map(expense => {
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
                                <button onClick={e => handleConfirm({ type: 'openConfirm', title: 'Atenção', body: 'Tem certeza que deseja excluir essa despesa?', callback: () => handleDeleteExpense(expense.expense_key) })}><FontAwesomeIcon icon={faTrash} /></button>
                            </div>

                        </div>
                    )
                })}

            </div>

        </main>
    )
}