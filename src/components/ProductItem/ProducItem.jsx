import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faPenToSquare, faShirt, faTrash } from '@fortawesome/free-solid-svg-icons'
import './ProductItem.scss'

export default function ProductItem(props) {

    const handleUpdateProduct = () => {

        props.dispatch({
            type: 'handleMakeProduct',
            productKey: props.product.product_key,
            productCode: props.product.product_code,
            productDescription: props.product.product_description,
            productCashPaymentValue: props.product.product_cash_payment_value,
            productDeferredPaymentValue: props.product.product_deferred_payment_value,
            productPurchaseValue: props.product.product_purchase_value,
            productCategory: props.product.category_key,
            productSubcategory: props.product.subcategory_key
        })

        props.openModal()
    }

    return (
        <div className="ProductItem">
            <div className="icon">
                <FontAwesomeIcon icon={faShirt} />
            </div>

            <div className="product-data">
                <div className="item">
                    <span className="title">Código</span>
                    <span>{props.product.product_code}</span>
                </div>

                <div className="item">
                    <span className="title">Descrição</span>
                    <span>{props.product.product_description}</span>
                </div>

                <div className="item">
                    <span className="title">Categoria</span>
                    <span>{props.product.category_description}</span>
                </div>

                <div className="item">
                    <span className="title">Subcategoria</span>
                    <span>{props.product.subcategory_description}</span>
                </div>

                <div className="item">
                    <span className="title">Valor de compra</span>
                    <span>{props.product.product_purchase_value}</span>
                </div>

                <div className="item">
                    <span className="title">Valor de venda (a vista)</span>
                    <span>{props.product.product_cash_payment_value}</span>
                </div>

                <div className="item">
                    <span className="title">Valor de venda (a prazo)</span>
                    <span>{props.product.product_deferred_payment_value}</span>
                </div>
            </div>

            <div className="product-buttons">
                <button onClick={handleUpdateProduct} title="Editar"><FontAwesomeIcon icon={faPenToSquare} /></button>
                <button title="Inativar"><FontAwesomeIcon icon={faBan} /></button>
                <button title="Excluir"><FontAwesomeIcon icon={faTrash} /></button>
            </div>
        </div>
    )

}