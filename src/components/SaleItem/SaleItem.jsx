import { faChevronDown, faChevronUp, faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Fade } from 'react-reveal'
import './SaleItem.scss'

export default function SaleItem(props) {

    const [showItems, handleShowItems] = useState(false)

    const handleToogleItems = () => {
        showItems ? handleShowItems(false) : handleShowItems(true)
    }

    return (
        <div className="SaleItem">
            <div className="header">
                <div className="icon">
                    <FontAwesomeIcon icon={faMoneyCheckDollar} />
                </div>

                <div className="data">
                    <span>{props.sale.client_name}</span>
                    <span>{props.sale.payment_description}</span>
                    <span>{props.sale.sale_hour}</span>
                    <div className="sale-value">
                        <span>Valor total da venda: {props.sale.sale_gross_amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        <span>Valor com descontos: {props.sale.sale_net_amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                </div>

                <div className="code-button">
                    <span>{props.sale.sale_key.toString().padStart(5, '0')}</span>
                    <button onClick={handleToogleItems}><FontAwesomeIcon icon={showItems ? faChevronUp : faChevronDown} /></button>
                </div>
            </div>
            <Fade top collapse when={showItems}>
                <div className="items">
                    {props.sale.products.map(product => {
                        return (
                            <div key={(product.product_key + product.subcategory_key)}>
                                <span>{product.product_code}</span>
                                <span>{product.product_description}</span>
                                <span>{product.subcategory_description}</span>
                                <span>{product.product_quantity} unidade(s)</span>
                                <span>{(product.product_unit_amount * product.product_quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                            </div>
                        )
                    })}

                </div>
            </Fade>



        </div>
    )
}