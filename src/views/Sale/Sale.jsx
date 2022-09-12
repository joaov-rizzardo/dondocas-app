import { faArrowTrendDown, faArrowTrendUp, faSackDollar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useEffect, useReducer, useState } from 'react'
import Alert from '../../components/Alert/Alert'
import SkeletonLoader from '../../components/ContentLoader/SkeletonLoader'
import DayPicker from '../../components/DayPicker/DayPicker'
import SaleItem from '../../components/SaleItem/SaleItem'
import SaleModal from '../../components/SaleModal/SaleModal'
import baseUrl from '../../configs/Url'
import { alertReducer, innitialAlert } from '../../reducers/alertModal/alertModal'
import './Sale.scss'

export default function Sale() {

    const [saleModal, setSaleModal] = useState(false)

    const [loading, setLoading] = useState(false)

    const [alert, handleAlert] = useReducer(alertReducer, innitialAlert)

    const [date, setDate] = useState(new Date())

    const [updateSale, setUpdateSale] = useState(true)

    const handleCloseModal = () => {
        setSaleModal(false)
    }

    const [sales, setSales] = useState([])

    const [dailyInfo, setDailyInfo] = useState({
        grossAmount: 0,
        netAmount: 0,
        cost: 0
    })

    const handleGetSales = async saleDate => {

        setLoading(true)

        const response = await axios.post(`${baseUrl.backendApi}/sale/get`, { saleDate: saleDate }).catch(error => {
            handleAlert({ type: 'openAlert', title: 'Erro', body: `Erro ao buscar vendas - ${error.message}` })
            return
        })

        if (response) {
            setLoading(false)
        }

        setSales(response.data)
    }

    const handleGetDailyInfo = async saleDate => {

        const response = await axios.post(`${baseUrl.backendApi}/sale/get/dailyInfo`, { saleDate: saleDate }).catch(error => {
            console.log(error)
            handleAlert({ type: 'openAlert', title: 'Erro', body: `Erro ao buscar dados de venda diária - ${error.message}` })
            return
        })

        setDailyInfo(response.data)
    }

    useEffect(() => {

        if (updateSale === true) {
            
            const formatedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

            handleGetDailyInfo(formatedDate)

            handleGetSales(formatedDate)

            setUpdateSale(false)
        }


    }, [date, updateSale])

    return (
        <main className="Sale">

            <DayPicker date={date} setDate={setDate} />

            <Alert args={alert} closeAlert={handleAlert} />

            <SaleModal setUpdateSale={setUpdateSale} handleClose={handleCloseModal} modalStatus={saleModal} />

            <section className="statics">
                <div className="static-item">
                    <FontAwesomeIcon icon={faArrowTrendUp} className="icon" />
                    <h2>Lucro bruto diário</h2>
                    <span>R$ {dailyInfo.grossAmount}</span>
                </div>

                <div className="static-item">
                    <FontAwesomeIcon icon={faSackDollar} className="icon" />
                    <h2>Lucro liquido diário</h2>
                    <span>R$ {dailyInfo.netAmount}</span>
                </div>

                <div className="static-item">
                    <FontAwesomeIcon icon={faArrowTrendDown} className="icon" />
                    <h2>Gastos com mercadoria</h2>
                    <span>R$ {dailyInfo.cost}</span>
                </div>
            </section>

            <section className="buttons">
                <button onClick={() => setSaleModal(true)}>Nova venda</button>
            </section>

            {loading ? <SkeletonLoader /> : ''}

            {!loading ? <section className="sales">
                {sales.map(sale => {
                    return <SaleItem key={sale.sale_key} sale={sale} />
                })}
            </section> : ''}

        </main>
    )
}