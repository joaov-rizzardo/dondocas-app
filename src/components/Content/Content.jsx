import {Routes, Route} from  'react-router-dom'
import Main from '../../views/Main/Main'
import Product from '../../views/Product/Product'
import './Content.scss'

export default function Content(){
    return (
        <div className="Content">
            <Routes>
                <Route exact path="/" element={<Main />} />
                <Route exact path="/produtos" element={<Product />}></Route>
            </Routes>
        </div>
    )
} 