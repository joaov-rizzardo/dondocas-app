
import { useState } from 'react'
import MonthPicker from '../../components/MonthPicker/MonthPicker'
import './Expense.scss'

export default function Expense() {
    const [date, setDate] = useState(new Date())
    return (
        <main className="Expense">
            <MonthPicker className="MonthPicker" date={date} setDate={setDate}/>
        </main>
    )
}