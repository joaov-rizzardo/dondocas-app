import { faArrowTrendDown, faArrowTrendUp, faSackDollar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import Date from '../../components/Date/Date'
import SaleModal from '../../components/SaleModal/SaleModal'
import './Sale.scss'

export default function Sale() {

    const [saleModal, setSaleModal] = useState(false)

    const handleCloseModal = () => {
        setSaleModal(false)
    }

    return (
        <main className="Sale">
            <Date />
            <SaleModal handleClose={handleCloseModal} modalStatus={saleModal}/>

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

            <section className="sales">
                <button onClick={() => setSaleModal(true)}>Nova venda</button>
            </section>
        </main>
    )
}