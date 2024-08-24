import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import AllUsers from "../components/AllUsers"

const Home = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('letterToken')
    const [modal, setModal] = useState() 
    const [newModal, setNewModal ] = useState()
    const [loading, setLoading] = useState(false)

    const toggleModal = () => {
      setModal(!modal)
    }

    const toggleNewModal = () => {
      setNewModal(!newModal)
    }

    // if (modal || newModal) {
    //   document.body.classList.add('active-modal')
    // } else {
    //   document.body.classList.remove('active-modal')
    // }

  return (
    <div className="home">
    <div className="home-div">
      <h2 className="home-title">A Diary for all the movies you watched</h2>
      <h2 className="home-title">Bucketlist those you want to see</h2>
      <h2 className="home-title"> Let your Friends know about it</h2>
      <div className="welcome-btns">
        <div className="join-div">
        <button onClick={(token) ? () => navigate('/home/timeline') : toggleNewModal} className="create-btn">Create Account</button>
        </div>
        <div className="connected-div">
        <h4 className="connected-title">Already Have an Account?</h4>
        <button onClick={(token) ? () => navigate('/home/timeline') : toggleModal} className="connected-btn">Sign In</button>
        </div>
        </div>
    </div>

    {
      modal && (
        <div className="modal">
          <div className="overlay" onClick={toggleModal}></div>
          <button onClick={toggleModal}>X</button> 
          <div className="modal-content">
            <Login modal={modal}
            setModal={setModal}
            toggleNewModal={toggleNewModal} 
            loading={loading} setLoading={setLoading}/>
          </div>
          </div> 
      )
    }

    {
      newModal && (
        <div className="modal">
          <div className="overlay" onClick={toggleNewModal}></div>
          <button onClick={toggleNewModal}>X</button>
          <div className="modal-content">
            <Register modal={newModal} setModal={setNewModal} 
            toggleModal={toggleModal} loading={loading}
            setLoading={setLoading}/>
          </div>
          </div>
      )
    }

    { 
    loading && 
      <div className="loading"></div>
    }
    </div>
  )
}

export default Home
