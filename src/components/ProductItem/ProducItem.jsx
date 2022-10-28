import { useReducer } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faCheck, faPenToSquare, faShirt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { confirmReducer, innitialConfirm } from '../../reducers/ConfirmModal/ConfirmModal'
import './ProductItem.scss'
import Confirm from '../Confirm/Confirm'
import baseUrl from '../../configs/Url'
import axios from 'axios'

export default function ProductItem(props) {

    const [confirm, handleConfirm] = useReducer(confirmReducer, innitialConfirm)

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

    const handleChangeProductStatus = async () => {

        const productStatus = props.product.product_status == 'A' ? 'I' : 'A'

        handleConfirm({type: 'setLoading', loading: true})

        const response = await axios.put(`${baseUrl.backendApi}/product/change/status`, {
            productKey : props.product.product_key,
            productStatus: productStatus
        }).catch(error => {
            handleConfirm({type: 'closeConfirm'})
            props.handleAlert({type: 'openAlert', title: 'Erro', body: `Não foi possível se comunicar com o servidor - ${error.message}`})
        })

        if(response){
            handleConfirm({type: 'closeConfirm'})
            const status = productStatus == 'A' ? 'ativado' : 'inativado'
            props.handleAlert({type: 'openAlert', title: 'Sucesso', body: `O produto foi ${status} com sucesso`})
            props.setUpdate(true)
        }
    }

    const handleDeleteProduct = async () => {
        handleConfirm({type: 'setLoading', loading: true})

        const response = await axios.delete(`${baseUrl.backendApi}/product/delete/${props.product.product_key}`).catch(error => {
            handleConfirm({type: 'closeConfirm'})
            props.handleAlert({type: 'openAlert', title: 'Erro', body: `Não foi possível se comunicar com o servidor - ${error.message}`})
        })

        if(response){
            handleConfirm({type: 'closeConfirm'})
            props.handleAlert({type: 'openAlert', title: 'Sucesso', body: 'O produto foi excluído com sucesso'})
            props.setUpdate(true)
        }
    }

    return (
        <div className="ProductItem">

            <Confirm confirm={confirm} handleConfirm={handleConfirm}/>

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
                    <span className="title">Custo</span>
                    <span>{props.product.product_purchase_value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>

                <div className="item">
                    <span className="title">Preço a vista</span>
                    <span>{props.product.product_cash_payment_value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>

                <div className="item">
                    <span className="title">Preço a prazo</span>
                    <span>{props.product.product_deferred_payment_value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
            </div>

            <div className="product-buttons">
                <button onClick={handleUpdateProduct} title="Editar"><FontAwesomeIcon icon={faPenToSquare} /></button>
                <button onClick={() => {
                    const action =  props.product.product_status == 'A' ? 'inativar' : 'ativar'
                    handleConfirm({type: 'openConfirm', title: 'Atenção', body: `Tem certeza que deseja ${action} o produto?`, callback: handleChangeProductStatus}) 
                }

                } title={props.product.product_status == 'A' ? 'Inativar' : 'Ativar'}><FontAwesomeIcon icon={props.product.product_status == 'A' ? faBan : faCheck} /></button>
                <button onClick={() => handleConfirm({type: 'openConfirm', title: 'Atenção', body: 'Tem certeza que deseja excluir o produto? Essa ação é irreversível!', callback: handleDeleteProduct})} title="Excluir"><FontAwesomeIcon icon={faTrash} /></button>
            </div>
        </div>
    )

}