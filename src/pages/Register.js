import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const Register = (props) => {
    const { setModal, toggleModal } = props
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const token = localStorage.getItem('letterToken')
    const navigate= useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                'http://localhost:8000/api/v1/auth/register',
                userData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${token}`
                    }
                }
            )
            const token = response.data.token
            localStorage.setItem('letterUserId', response.data.user._id)
            localStorage.setItem('letterName', response.data.user.name)
            localStorage.setItem('letterEmail', response.data.user.email)
            localStorage.setItem('letterToken', token)
            console.log('User created: ', response.data);
            navigate('/home/timeline')
        } catch (error) {
            console.error('Error creating user', error)
        }
    }


    return (
    <div className="new-post-div">
        <form onSubmit={handleSubmit} className="welcome-div register-new-form">

            <h2 className="new-post-title">Join Club 49</h2>

            <div className="register-divs">
                <h4 className="login-text">Name</h4>
                <input 
                className="register-inputs"
                placeholder="Enter name..."
                type="text"
                id="name"
                name="name"
                onChange={(e) => setUserData({...userData, name: e.target.value})}/>
            </div>

        <div className="register-divs">
            <h4 className="login-text edit-one">Email Address</h4>
            <input
            placeholder="Your email..."
            className="register-inputs" 
            type="email"
            id="email"
            name="email"
            onChange={(e) => setUserData({...userData, email: e.target.value})}/>
        </div>

        <div className="register-divs">
            <h4 className="login-text edit-one">Password</h4>
            <input 
            className="register-inputs"
            placeholder="Your password..."
            type="password"
            id="password"
            name="password"
            onChange={(e) => setUserData({...userData, password: e.target.value})}/>
        </div>

        <button type="submit" className="login-btn edit-one">Register Now</button>

        
        <p className="no-acnt-text edit-two">Already have an Account?</p>
        <a href="#" onClick={() => {setModal(false)
        toggleModal()}} className="register-link">Login now</a>
        </form>
    </div>
  )
}

export default Register
