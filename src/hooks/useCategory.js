import { useState } from "react"
import axios from "axios"
import baseUrl from '../configs/Url';
import { useEffect } from "react";

export default function useCategory() {
    const [categories, setCategories] = useState([])

    const [subcategories, setSubcategories] = useState([])

    const handleGetSubcategories = async () => {
        
        const response = await axios.get(`${baseUrl.backendApi}/subcategory/get`).catch(error => console.log(error.message))

        setSubcategories(response.data)
    }

    const handleGetCategories = async () => {
        const response = await  axios.get(`${baseUrl.backendApi}/category/get`).catch(error => console.log(error))

        setCategories(response.data)
    }

    useEffect(() => {
        handleGetSubcategories()
        handleGetCategories()
    }, [])

    return [categories, subcategories]
}