import { Link } from 'react-router-dom'
import './Menu.scss'

export default function Menu(){
    return (
        <header className="Menu">
            <div>
                <h1>Dondocas app</h1>
            </div>

            <nav>
                <Link to="/">Dashboard</Link>
                <Link to="/vendas">Vendas</Link>
                <Link to="/produtos">Produtos</Link>
                <Link to="/etiquetas">Etiquetas</Link>                
                <Link to="/">Fornecedores</Link>
                <Link to="/">Clientes</Link>
            </nav>
        </header>
    )
}