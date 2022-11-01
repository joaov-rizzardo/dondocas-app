import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../../contexts/AuthContext'
import './Menu.scss'

export default function Menu(){

    const {authenticated, handleLogout} = useContext(Context)

    const navigate = useNavigate()

    function logout(){
        if(handleLogout()){
            navigate('/login')
        }
    }

    return (
        <header className="Menu">
            <div>
                <h1>Dondocas</h1>
            </div>

            <nav>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/">Vendas</Link>
                <Link to="/despesas">Despesas</Link> 
                <Link to="/produtos">Produtos</Link>
                <Link to="/fornecedores">Fornecedores</Link>
                <Link to="/etiquetas">Etiquetas</Link>
                {authenticated ? <button onClick={logout}>Sair</button> : ''}            
            </nav>
        </header>
    )
}