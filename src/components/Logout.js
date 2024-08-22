import { useNavigate } from "react-router-dom"

const Logout = (props) => {
      const navigate = useNavigate()
  
  
      const handleLogout = () => {
          localStorage.removeItem('letterToken')
          localStorage.removeItem('letterUserId')
          localStorage.removeItem('letterName')
          localStorage.removeItem('letterEmail')
          alert('logged out successfully')
          navigate('/')
        }
  
        const toggleModal = () => {
          
        }
  
    return (
      <div className="new-post-div">
        <h2 className="title">Are you sure you wanna log out? </h2>
  
        <div>
          <button className="btn edit-one" onClick={handleLogout}>Yes, I wanna logout now</button>
          <button className="btn edit-three" onClick={toggleModal}>No, i would like to go back</button>
        </div>
      </div>
    )
  }
  
  export default Logout