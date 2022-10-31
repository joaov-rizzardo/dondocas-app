import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import './Login.scss'

export default function Login() {

    const navigate = useNavigate()

    const [userForm, setUserForm] = useState({
        identification: '',
        password: ''
    })

    const {handleLogin} = useAuth()

    async function validateLogin(){

        const status = await handleLogin(userForm.identification, userForm.password)

        if(status === true){

            navigate('/')
        }

        if(status === false){

        }
    }

    return (
        <section className="Login">
            <div className="form">

                <h2>Faça login para prosseguir</h2>

                <Form.Control
                    type="text"
                    placeholder="Usuário"
                    value={userForm.identification}
                    onChange={e => setUserForm(prevState => {
                        return {...prevState, identification: e.target.value}
                    })}
                />

                <Form.Control
                    type="password"
                    placeholder="Senha"
                    value={userForm.password}
                    onChange={e => setUserForm(prevState => {
                        return {...prevState, password: e.target.value}
                    })}
                />

                <button onClick={validateLogin}>Entrar</button>
            </div>
        </section>
    )
}