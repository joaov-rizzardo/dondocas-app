import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import Chart from "react-google-charts"
import DayPicker from '../../components/DayPicker/DayPicker'
import { Form } from 'react-bootstrap'
import './Dashboard.scss'
import useCategory from "../../hooks/useCategory"

export default function Dashboard() {

    const [startDate, setStartDate] = useState(new Date().setDate(1))
    const [finishDate, setFinishDate] = useState(new Date())
    const [chartFilter, setChartFilter] = useState({
        category: '',
        subcategory: '',
        type: 'C'
    })

    const [categories, subcategories] = useCategory()

    const chartData = [
        ["Categoria", "Valor"],
        ["Sapatilhas", 14.25],
        ["Mules", 12.25],
        ["Rasteiras", 17.25]
    ]


    return (
        <main className="Dashboard">
            <section className="date-filter">
                <DayPicker date={startDate} setDate={setStartDate} />
                <DayPicker date={finishDate} setDate={setFinishDate} />
                <button><FontAwesomeIcon icon={faSearch} /></button>
            </section>

            <section className="gauges">
                <div><span>Valor total de venda - R$ 1202,00</span></div>
                <div><span>Saldo - R$ 1202,00</span></div>
                <div><span>Valor total de despesas - R$ 1202,00</span></div>
            </section>

            <section className="charts">
                <div className="colorSizeChart">
                    <div className="chartTitle">
                        <h4>Vendas por produto</h4>
                    </div>

                    <div className="chartFilter">
                        <Form.Select
                            value={chartFilter.category}
                            onChange={e => setChartFilter(prevState => {
                                return {...prevState, category: e.target.value}
                            })}
                        >
                            <option value="">Categoria</option>
                            {categories.map(category => <option value={category.category_key} key={category.category_key}>{category.category_description}</option>)}
                        </Form.Select>
                        <Form.Select
                            value={chartFilter.subcategory}
                            onChange={e => setChartFilter(prevState => {
                                return {...prevState, subcategory: e.target.value}
                            })}
                        >
                            <option value="">Subcategoria</option>
                            {subcategories.filter(subcategory => {
                                if(subcategory.category_key == chartFilter.category){
                                    return subcategory
                                }
                            }).map(subcategory => <option value={subcategory.subcategory_key} key={subcategory.subcategory_key}>{subcategory.subcategory_description}</option>)}
                        </Form.Select>
                        <Form.Select
                            value={chartFilter.type}
                            onChange={e => setChartFilter(prevState => {
                                return {...prevState, type: e.target.value}
                            })}
                        >
                            <option value="C">Por cor</option>
                            <option value="S">Por tamanho</option>
                        </Form.Select>

                    </div>
                    <Chart chartType="PieChart" data={chartData} options={{width: '100%', height: '400px'}} />
                </div>

                <div className="lineCharts">
                    <div className="chartTitle">
                        <h4>Valor de venda por dia</h4>
                    </div>
                    <Chart chartType="LineChart" data={chartData} options={{width: '100%', height: '200px'}} />
                    <div className="chartTitle">
                        <h4>Venda média por dia da semana</h4>
                    </div>
                    <Chart chartType="ColumnChart" data={chartData} options={{width: '100%', height: '200px'}} />
                </div>

                <div className="columnChart">
                    <div className="chartTitle">
                        <h4>Total de items vendidos</h4>
                    </div>
                    <Chart chartType="ColumnChart" data={chartData} options={{width: '100%', height: '400px'}} />
                </div>
            </section>

        </main>
    )
}