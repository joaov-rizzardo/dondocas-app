import { useContext, useState, useReducer } from 'react'
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PropagateLoader } from 'react-spinners';
import { Context } from '../../contexts/AuthContext';
import Alert from "../../components/Alert/Alert"
import { alertReducer, innitialAlert } from "../../reducers/alertModal/alertModal"
import './Login.scss'

export default function Login() {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const [alert, handleAlert] = useReducer(alertReducer, innitialAlert)

    const [userForm, setUserForm] = useState({
        identification: '',
        password: ''
    })

    const {handleLogin} = useContext(Context)

    async function validateLogin(){

        if(userForm.identification == '' || userForm.password == ''){
            handleAlert({type: 'openAlert', title: 'Atenção', body: 'Preencha todos os campos para realizar o login'})
            return
        }

        setLoading(true)

        const status = await handleLogin(userForm.identification, userForm.password)

        setLoading(false)

        if(status === true){
            navigate('/')
        }

        if(status === false){
            handleAlert({type: 'openAlert', title: 'Erro', body: 'Não foi possível realizar o login, verifique seu usuário e senha'})
        }
    }

    return (
        <section className="Login">

            <Alert args={alert} closeAlert={handleAlert} />

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

                <button onClick={validateLogin}>{loading ? <PropagateLoader loading={true} color={'#fff'} size={10} /> : 'Entrar'}</button>
            </div>
        </section>
    )
}