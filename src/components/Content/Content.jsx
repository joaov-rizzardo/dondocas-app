import {Routes, Route} from  'react-router-dom'
import Dashboard from '../../views/Dashboard/Dashboard'
import Expense from '../../views/Expense/Expense'
import Main from '../../views/Main/Main'
import Product from '../../views/Product/Product'
import Sale from '../../views/Sale/Sale'
import { Tag } from '../../views/Tag/Tag'
import './Content.scss'

export default function Content(){
    return (
        <div className="Content">
            <Routes>
                <Route exact path="/produtos" element={<Product />}></Route>
                <Route exact path="/" element={<Sale />}></Route>
                <Route exact path="/etiquetas" element={<Tag />}></Route>
                <Route exact path="/despesas" element={<Expense />}/>
                <Route exact path="/dashboard" element={<Dashboard />}/>
            </Routes>
        </div>
    )
} 