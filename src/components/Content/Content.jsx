import {Routes, Route} from  'react-router-dom'
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
            </Routes>
        </div>
    )
} 