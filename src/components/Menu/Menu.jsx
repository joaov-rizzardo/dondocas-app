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
                <Link to="/produtos">Produtos</Link>
                <Link to="/">Fornecedores</Link>
                <Link to="/">Clientes</Link>
                <Link to="/">Relatórios</Link>
            </nav>
        </header>
    )
}