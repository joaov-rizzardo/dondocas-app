import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faPenToSquare, faShirt, faTrash } from '@fortawesome/free-solid-svg-icons'
import './ProductItem.scss'

export default function ProductItem(props) {

    return (
        <div className="ProductItem">
            <div className="icon">
                <FontAwesomeIcon icon={faShirt} />
            </div>

            <div className="product-data">
                <div className="item">
                    <span className="title">Código</span>
                    <span>01</span>
                </div>

                <div className="item">
                    <span className="title">Descrição</span>
                    <span>Sandália rosa</span>
                </div>

                <div className="item">
                    <span className="title">Categoria</span>
                    <span>Calçados</span>
                </div>

                <div className="item">
                    <span className="title">Subcategoria</span>
                    <span>Sandálias</span>
                </div>

                <div className="item">
                    <span className="title">Valor de compra</span>
                    <span>19,25</span>
                </div>

                <div className="item">
                    <span className="title">Valor de venda (a vista)</span>
                    <span>19,25</span>
                </div>

                <div className="item">
                    <span className="title">Valor de venda (a prazo)</span>
                    <span>19,25</span>
                </div>
            </div>

            <div className="product-buttons">
                <button title="Editar"><FontAwesomeIcon icon={faPenToSquare} /></button>
                <button title="Inativar"><FontAwesomeIcon icon={faBan} /></button>
                <button title="Excluir"><FontAwesomeIcon icon={faTrash} /></button>
            </div>
        </div>
    )

}