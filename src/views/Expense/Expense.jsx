
import { faDollar, faFileInvoice, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Form } from 'react-bootstrap'
import Chart from 'react-google-charts'
import ExpenseModal from '../../components/ExpenseModal/ExpenseModal'
import MonthPicker from '../../components/MonthPicker/MonthPicker'
import './Expense.scss'

export default function Expense() {
    const [date, setDate] = useState(new Date())

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
        ['Vue', 50]]

    const [modal, setModal] = useState(true)
    return (
        <main className="Expense">

            <ExpenseModal modalStatus={modal} handleClose={setModal}/>
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
                <button>Nova Despesa</button>
                <Form.Select>
                    <option>Categoria</option>
                </Form.Select>
            </div>

            <div className="expense-list">
                <div className="expense-item">

                    <div className="expense-item-header">
                        <div className="expense-item-icon">
                            <FontAwesomeIcon icon={faFileInvoice} />
                        </div>

                        <div className="expense-item-info">
                            <small>22/05/2022</small>
                            <h2>R$ 23,54</h2>
                            <span>Aluguel</span>
                        </div>
                    </div>

                    <div className="expense-item-body">
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
                    </div>

                    <div className="expense-item-buttons">
                        <button><FontAwesomeIcon icon={faPen} /></button>
                        <button><FontAwesomeIcon icon={faTrash} /></button>
                    </div>

                </div>
            </div>

        </main>
    )
}