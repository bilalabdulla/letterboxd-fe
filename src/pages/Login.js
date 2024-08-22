import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"



const Login = (props) => {
    const { modal, setModal, toggleNewModal } = props 
    const [userData, setUserData ] = useState({
        email: '',
        password: ''
    })

    const userId = localStorage.getItem('letterUserId')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                'http://localhost:8000/api/v1/auth/login',
                userData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            navigate('/home/timeline')
            console.log('token', response.data.token);
            localStorage.setItem('letterToken', response.data.token)
            localStorage.setItem('letterUserId', response.data.user._id)
            localStorage.setItem('letterName', response.data.user.name)
            localStorage.setItem('letterEmail', response.data.user.email)
            console.log('User logged in: ', response.data);
        } catch (error) {
            console.log('Error logging in: ', error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData(prevState => ({
            ...prevState,
            [name]: value 
        }))
    }

  return (
    <div className="new-post-div">
    <form onSubmit={handleSubmit} className="">
        <h2 className="new-post-title">Sign in to Club 49</h2>

        <div className="login-email">
            <h4 className="login-text">Email Address</h4>
            <input className="register-inputs" 
            type="text"
            id="email"
            name="email"
            placeholder="Your Email here..."
            value={userData.email}
            onChange={handleChange}/>
        </div>

        <div className="login-email">
            <h4 className="login-text">Password</h4>
            <input className="register-inputs"
            placeholder="Your Password here..."
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}/>
        </div>

        <button type="submit" className="login-btn">Log in</button>

        <p className="no-acnt-text">Don't have an Account?</p>
        <a href="#" onClick={() => {setModal(false)
            toggleNewModal()}} className="register-link">Register now</a>
    </form>
    </div>
  )
}

export default Login
