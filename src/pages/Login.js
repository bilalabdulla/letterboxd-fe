import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"



const Login = (props) => {
    const { modal, setModal, toggleNewModal,
        loading, setLoading
     } = props 
    const [userData, setUserData ] = useState({
        email: '',
        password: ''
    })
    const userId = localStorage.getItem('letterUserId')
    const [statusCode, setStatusCode] = useState()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post(
                'https://letterboxd-be.onrender.com/api/v1/auth/login',
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
            setLoading(false)
        } catch (error) {
            console.log('Error logging in: ', error.response.status)
            setStatusCode(error.response.status)
            setLoading(false)
        }
        console.log('status' , statusCode);   
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

        {(statusCode === 401)  && <p className="error">You entered a wrong password</p> }
        {(statusCode === 402) && <p className="error">You haven't registered yet</p> }
        {(statusCode === 404) && <p className="error">Please fill in all the details</p>}

        <button type="submit" className="login-btn">Log in</button>

        <p className="no-acnt-text">Don't have an Account?</p>
        <a href="#" onClick={() => {setModal(false)
            toggleNewModal()}} className="register-link">Register now</a>
    </form>

    </div>
  )
}

export default Login
