import { useContext } from 'react'
import {Routes, Route, Navigate} from  'react-router-dom'
import { Context } from '../../contexts/AuthContext'
import Dashboard from '../../views/Dashboard/Dashboard'
import Expense from '../../views/Expense/Expense'
import Login from '../../views/Login/Login'
import Product from '../../views/Product/Product'
import { Provider } from '../../views/Provider/Provider'
import Sale from '../../views/Sale/Sale'
import { Tag } from '../../views/Tag/Tag'
import './Content.scss'

export default function Content(){

    const {authenticated } = useContext(Context)

    function ProtectedRoute(props){

        if(authenticated === false){
            return <Navigate to="/login"/>
        }

        return props.children
    }

    return (
        <div className="Content">
            <Routes>
                <Route exact path="/produtos" element={
                    <ProtectedRoute>
                        <Product/>
                    </ProtectedRoute>
                }/>

                <Route exact path="/" element={
                    <ProtectedRoute>
                        <Sale />
                    </ProtectedRoute>
                }/>

                <Route exact path="/etiquetas" element={
                    <ProtectedRoute>
                        <Tag/>
                    </ProtectedRoute>
                }/>

                <Route exact path="/despesas" element={
                    <ProtectedRoute>
                        <Expense />
                    </ProtectedRoute>
                }/>

                <Route exact path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }/>

                <Route exact path="/fornecedores" element={
                    <ProtectedRoute>
                        <Provider />
                    </ProtectedRoute>
                }/>

                <Route exact path="/login" element={
                    authenticated ? <Navigate to="/"/> : <Login />
                }/>
            </Routes>
        </div>
    )
} 