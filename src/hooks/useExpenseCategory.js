import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import baseUrl from "../configs/Url";

export default function useExpenseCategory(){

    const [categories, setCategories] = useState([])

    const handleGetCategories = async () => {
        const response = await axios.get(`${baseUrl.backendApi}/expense/category/get`).catch(error => console.log(error))

        setCategories(response.data)
    }

    useEffect(() => {
        handleGetCategories()
    }, [])

    return categories
}