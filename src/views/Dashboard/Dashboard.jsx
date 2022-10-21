import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import Chart from "react-google-charts"
import DayPicker from '../../components/DayPicker/DayPicker'
import { Form } from 'react-bootstrap'
import './Dashboard.scss'
import useCategory from "../../hooks/useCategory"
import axios from "axios"
import baseUrl from "../../configs/Url"
import { getAmericanDate } from "../../services/FormatDate"
import Alert from "../../components/Alert/Alert"
import { useReducer } from "react"
import { alertReducer, innitialAlert } from "../../reducers/alertModal/alertModal"

export default function Dashboard() {
    
    const [finishDate, setFinishDate] = useState(new Date())
    const [startDate, setStartDate] = useState(new Date(new Date().setDate(1)))
    const [categories, subcategories] = useCategory()
    const [updatePage, setUpdatePage] = useState(false)
    const [alert, handleAlert] = useReducer(alertReducer, innitialAlert)

    const [chartFilter, setChartFilter] = useState({
        category: '',
        subcategory: '',
        type: 'C'
    })

    const [totalAmounts, setTotalAmounts] = useState({
        saleAmount: 0,
        expenseAmount: 0
    })

    async function handleGetSaleAmount() {

        const payload = {
            startDate: getAmericanDate(startDate),
            finishDate: getAmericanDate(finishDate)
        }

        const saleResponse = await axios.post(`${baseUrl.backendApi}/sale/totalSalePerPeriod`, payload).catch(error => {
            handleAlert({type: 'openAlert', title: 'Error', body: `Ocorreu um erro ao buscar total de vendas - ${error.message}`})
            return
        })

        setTotalAmounts(prevState => {
            return {
                ...prevState,
                saleAmount: saleResponse.data.totalAmount
            }
        })

        const expenseResponse = await axios.post(`${baseUrl.backendApi}/expense/totalExpensePerPeriod`, payload).catch(error => {
            handleAlert({type: 'openAlert', title: 'Error', body: `Ocorreu um erro ao buscar total de despesas - ${error.message}`})
            return
        })

        setTotalAmounts(prevState => {
            return {
                ...prevState,
                expenseAmount: expenseResponse.data.totalAmount
            }
        })

    }

    useEffect(() => {
        handleGetSaleAmount()
    }, [updatePage])

    const [salesPerDay, setSalesPerDay] = useState([])

    async function handleGetSalePerDay(){
        const response = await axios.post(`${baseUrl.backendApi}/sale/dailySales`, {
            startDate: getAmericanDate(startDate),
            finishDate: getAmericanDate(finishDate)
        }).catch(error => {
            console.log(error)
            handleAlert({type: 'openAlert', title: 'Erro', body: `Ocorreu um erro ao buscar as vendas por dia - ${error.message}`})
            return
        })

        setSalesPerDay(response.data)
    }

    useEffect(() => {
        handleGetSalePerDay()
    }, [updatePage])

    const salesPerDayChart = [
        ['Dia', 'Valor']
    ]

    salesPerDay.forEach(sale => salesPerDayChart.push([sale.date, sale.amount]))

    const [salesPerWeekday, setSalesPerWeekday] = useState([])

    async function handleGetSalesPerWeekday(){
        const response = await axios.post(`${baseUrl.backendApi}/sale/salePerWeekday`, {
            startDate: getAmericanDate(startDate),
            finishDate: getAmericanDate(finishDate)
        }).catch(error => {
            console.log(error)
            handleAlert({type: 'openAlert', title: 'Erro', body: `Ocorreu um erro ao buscar as vendas por dia da semana - ${error.message}`})
            return
        })

        setSalesPerWeekday(response.data)
    }

    useEffect(() => {
        handleGetSalesPerWeekday()
    }, [updatePage])

    const salesPerWeekdayChart = [
        ['Dia da semana', 'Venda média']
    ]

    salesPerWeekday.forEach(sale => salesPerWeekdayChart.push([sale.weekday, sale.amount]))
    
    const [totalSaleItems, setTotalSaleItems] = useState([])
    
    async function handleGetTotalSaleItems(){

        const response = await axios.post(`${baseUrl.backendApi}/sale/itemsPerPeriod`, {
            startDate: getAmericanDate(startDate),
            finishDate: getAmericanDate(finishDate)
        }).catch(error => {
            console.log(error)
            handleAlert({type: 'openAlert', title: 'Erro', body: `Ocorreu um erro ao buscar total de itens vendidos - ${error.message}`})
            return
        })

        setTotalSaleItems(response.data)
    }

    useEffect(() => {
        handleGetTotalSaleItems()
    }, [updatePage])

    const totalSaleItemsChart = [
        ['Subcategoria', 'Quantidade']
    ]

    totalSaleItems.forEach(item => totalSaleItemsChart.push([item.subcategory, item.quantity]))

    const [itemsPerColor, setItemsPerColor] = useState([])
    const [itemsPerSize, setItemsPerSize] = useState([])

    async function handleGetItemsPerColorAndSize(){

        let payload = {
            startDate: getAmericanDate(startDate),
            finishDate: getAmericanDate(finishDate)
        }

        if(chartFilter.category != ''){
            payload = {...payload, category: chartFilter.category}

            if(chartFilter.subcategory != ''){
                payload = {...payload, subcategory: chartFilter.subcategory}
            }
        }

        const colorResponse = await axios.post(`${baseUrl.backendApi}/sale/colorsPerPeriod`, payload).catch(error => {
            console.log(error)
            handleAlert({type: 'openAlert', title: 'Erro', body: `Ocorreu um erro ao buscar total de itens por cor - ${error.message}`})
            return
        })

        setItemsPerColor(colorResponse.data)

        const sizeResponse = await axios.post(`${baseUrl.backendApi}/sale/sizesPerPeriod`, payload).catch(error => {
            console.log(error)
            handleAlert({type: 'openAlert', title: 'Erro', body: `Ocorreu um erro ao buscar total de itens por tamanho - ${error.message}`})
            return
        })

        setItemsPerSize(sizeResponse.data)
    }

    useEffect(() => {
        handleGetItemsPerColorAndSize()
    }, [chartFilter.category, chartFilter.subcategory, updatePage])

    

    let itemsPerColorSizeChart = []

    if(chartFilter.type === 'C'){
        itemsPerColorSizeChart = [
            ['Cor', 'Quantidade']
        ]

        itemsPerColor.forEach(item => itemsPerColorSizeChart.push([item.color, item.quantity]))
    }

    if(chartFilter.type === 'S'){
        itemsPerColorSizeChart = [
            ['Tamanho', 'Quantidade']
        ]

        itemsPerSize.forEach(item => itemsPerColorSizeChart.push([item.size, item.quantity]))
    }

    return (
        <main className="Dashboard">

            <Alert args={alert} closeAlert={handleAlert} />

            <section className="date-filter">
                <DayPicker date={startDate} setDate={setStartDate} />
                <DayPicker date={finishDate} setDate={setFinishDate} />
                <button onClick={e => setUpdatePage(prevState => !prevState)}><FontAwesomeIcon icon={faSearch} /></button>
            </section>

            <section className="gauges">
                <div><span>Valor total de venda: {totalAmounts.saleAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></div>
                <div><span>Saldo: { (totalAmounts.saleAmount - totalAmounts.expenseAmount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></div>
                <div><span>Valor total de despesas: {totalAmounts.expenseAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></div>
            </section>

            <section className="charts">
                <div className="colorSizeChart">
                    <div className="chartTitle">
                        <h4>Vendas por produto</h4>
                    </div>

                    <div className="chartFilter">
                        <Form.Group>
                            <Form.Label>Categoria</Form.Label>
                            <Form.Select
                                value={chartFilter.category}
                                onChange={e => setChartFilter(prevState => {
                                    return { ...prevState, category: e.target.value }
                                })}
                            >
                                <option value="">Todas</option>
                                {categories.map(category => <option value={category.category_key} key={category.category_key}>{category.category_description}</option>)}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Subcategoria</Form.Label>
                            <Form.Select
                                value={chartFilter.subcategory}
                                onChange={e => setChartFilter(prevState => {
                                    return { ...prevState, subcategory: e.target.value }
                                })}
                            >
                                <option value="">Todas</option>
                                {subcategories.filter(subcategory => {
                                    if (subcategory.category_key == chartFilter.category) {
                                        return subcategory
                                    }
                                }).map(subcategory => <option value={subcategory.subcategory_key} key={subcategory.subcategory_key}>{subcategory.subcategory_description}</option>)}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Tipo de gráfico</Form.Label>
                            <Form.Select
                                value={chartFilter.type}
                                onChange={e => setChartFilter(prevState => {
                                    return { ...prevState, type: e.target.value }
                                })}
                            >
                                <option value="C">Por cor</option>
                                <option value="S">Por tamanho</option>
                            </Form.Select>
                        </Form.Group>

                    </div>
                    {
                        itemsPerColorSizeChart.length > 1 ?
                            <Chart chartType="PieChart" data={itemsPerColorSizeChart} options={{ width: '100%', height: '400px' }} />
                        :
                            <div style={{height: '400px'}} className="no-data-chart">
                                <h2>Nenhum dado foi encontrado para as especificações selecionadas</h2>
                            </div>     
                    }
                
                </div>

                <div className="lineCharts">
                    <div className="chartTitle">
                        <h4>Valor de venda por dia</h4>
                    </div>
                    {
                        salesPerDayChart.length > 1 
                        ?
                            <Chart chartType="LineChart" data={salesPerDayChart} options={{ width: '100%', height: '200px' }} />
                        :
                            <div style={{height: '200px'}} className="no-data-chart">
                                <h2>Nenhum dado foi encontrado para o período selecionado</h2>
                            </div>   
                    }
                    
                    <div className="chartTitle">
                        <h4>Venda média por dia da semana</h4>
                    </div>

                    {
                        salesPerWeekdayChart.length > 1
                        ?
                            <Chart chartType="ColumnChart" data={salesPerWeekdayChart} options={{ width: '100%', height: '200px' }} />
                        :
                            <div style={{height: '200px'}} className="no-data-chart">
                                <h2>Nenhum dado foi encontrado para o período selecionado</h2>
                            </div>   
                    }
                </div>

                <div className="columnChart">
                    <div className="chartTitle">
                        <h4>Total de items vendidos</h4>
                    </div>

                    {
                        totalSaleItemsChart.length > 1
                        ?
                            <Chart chartType="ColumnChart" data={totalSaleItemsChart} options={{ width: '100%', height: '400px' }} />
                        :
                            <div style={{height: '400px'}} className="no-data-chart">
                                <h2>Nenhum dado foi encontrado para o período selecionado</h2>
                            </div>  
                    }
                </div>
            </section>

        </main>
    )
}