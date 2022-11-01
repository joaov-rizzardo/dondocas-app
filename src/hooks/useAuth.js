import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import baseUrl from "../configs/Url"
import { encryptValue } from "../services/Encrypt"

export default function useAuth() {

    const [user, setUser] = useState({})

    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {

        async function verifyToken(){
            
            const token = localStorage.getItem('token');

            if (token) {
                const { data: { authenticated, user } } = await axios.post(`${baseUrl.backendApi}/user/authenticate`, {
                    token: JSON.parse(token)

                }).catch(error => {
                    setAuthenticated(false)
                    return false
                })
                
                if (authenticated === true) {
                    setAuthenticated(true);
                    setUser(user)
                }
            }else{
                setAuthenticated(false)
            }
        }

        verifyToken()

    }, [])

    async function handleLogin(identification, password) {

        const encryptedPassword = encryptValue(password)

        const { data: { authenticated, user, token } } = await axios.post(`${baseUrl.backendApi}/user/authenticate`, {
            identification: identification,
            password: encryptedPassword

        }).catch(error => {
            console.log(error)
            setAuthenticated(false)
            return false
        })

        if (authenticated === false) {
            setAuthenticated(false)
            return false
        }

        localStorage.setItem('token', JSON.stringify(token))

        setUser(user)

        setAuthenticated(true)
    
        return true
    }

    function handleLogout() {
        localStorage.removeItem('token');
        setAuthenticated(false)
        setUser({})
        return true
    }

    return { handleLogin, authenticated, user, handleLogout }
}