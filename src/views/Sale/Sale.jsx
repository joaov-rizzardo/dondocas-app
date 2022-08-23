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

    const handleCloseModal = () => {
        setSaleModal(false)
    }

    const [sales, setSales] = useState([])

    const handleGetSales = async saleDate => {

        setLoading(true)

        const response = await axios.post(`${baseUrl.backendApi}/sale/get`, { saleDate: saleDate }).catch(error => {
            handleAlert({ type: 'openAlert', title: 'Erro', body: `Erro ao buscar vendas - ${error.message}` })
            return
        })

        if(response){
            setLoading(false)
        }
        
        setSales(response.data)
    }

    useEffect(() => {
        const formatedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

        handleGetSales(formatedDate)

    }, [date])

    return (
        <main className="Sale">

            <DayPicker date={date} setDate={setDate} />

            <Alert args={alert} handleAlert={handleAlert} />

            <SaleModal handleClose={handleCloseModal} modalStatus={saleModal} />

            <section className="statics">
                <div className="static-item">
                    <FontAwesomeIcon icon={faArrowTrendUp} className="icon" />
                    <h2>Lucro bruto diário</h2>
                    <span>R$ 23,99</span>
                </div>

                <div className="static-item">
                    <FontAwesomeIcon icon={faSackDollar} className="icon" />
                    <h2>Lucro liquido diário</h2>
                    <span>R$ 23,99</span>
                </div>

                <div className="static-item">
                    <FontAwesomeIcon icon={faArrowTrendDown} className="icon" />
                    <h2>Gastos com mercadoria</h2>
                    <span>R$ 23,99</span>
                </div>
            </section>

            <section className="buttons">
                <button onClick={() => setSaleModal(true)}>Nova venda</button>
            </section>

            {loading ? <SkeletonLoader /> : ''}

            {!loading ? <section className="sales">
                {sales.map(sale => {
                    return <SaleItem sale={sale} />
                })}

            </section> : ''}

        </main>
    )
}