
import { faDollar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Form } from 'react-bootstrap'
import Chart from 'react-google-charts'
import MonthPicker from '../../components/MonthPicker/MonthPicker'
import './Expense.scss'

export default function Expense() {
    const [date, setDate] = useState(new Date())

    const options = {
        title: 'Despesas Mensais',
        width: '100%',
        height: '300px',
        backgroundColor: { fill:'transparent' },
        titleTextStyle: {
            color: '#fff',
            fontSize: 24,
            bold: false
        },
        legend: {
            textStyle: {
                color: '#fff',
                fontSize:14,
            }
        }
    }

    const teste = [
        ["Task", "Hours per Day"],
        ['React', 100],
        ['Angula', 80],
        ['Vue', 50]]

    return (
        <main className="Expense">
            <MonthPicker className="MonthPicker" date={date} setDate={setDate}/>

            <div className="gauges">
                <div className="expense-info">
                        <div className="icon">
                            <FontAwesomeIcon icon={faDollar}/>
                        </div>

                        <div className="total-expense">
                            <h2>R$ 23,59</h2>
                            <span>Valor total de despesas mensais</span>
                        </div>
                </div>

                <div className="expense-chart">
                    <Chart chartType="PieChart" data={teste} options={options}/>
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

                </div>
                <div className="expense-item">
                    
                </div>
                <div className="expense-item">
                    
                </div>
                <div className="expense-item">
                    
                </div>
                <div className="expense-item">
                    
                </div>
                <div className="expense-item">
                    
                </div>
                <div className="expense-item">
                    
                </div>
                <div className="expense-item">
                    
                </div>
                <div className="expense-item">
                    
                </div>
                <div className="expense-item">
                    
                </div>
                <div className="expense-item">
                    
                </div>
                <div className="expense-item">
                    
                </div>
                <div className="expense-item">
                    
                </div>
                <div className="expense-item">
                    
                </div>
            </div>

        </main>
    )
}