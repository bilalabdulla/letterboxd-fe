import axios from "axios"
import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"


const Navbar = () => {
  const [search, setSearch] = useState('')
  const userId = localStorage.getItem('letterUserId')
  const token = localStorage.getItem('letterToken')
  const [movie, setMovie] = useState({})
  const [searchModal, setSearchModal] = useState(false)
  const [newMovie, setNewMovie] = useState({})
 const navigate = useNavigate()
 const [homeModal, setHomeModal] = useState(false)
 const letterName = localStorage.getItem('letterName')


  const fetchMovies = async () => {
    if (search !== ''){
    const newSearch = search?.replace(' ', '+')
    console.log(newSearch);
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?t=${newSearch}&apikey=628a4cfc`,
        {
          headers: {
            'Accept': 'application/json'
          }
        }
      )
      setMovie(response?.data)
      toggleSearchModal()
      console.log(response?.data);
    } catch (error) {
      console.log(error);
    }
  }
  }

  const addMovie = async () => {
    try {
      const response = await axios.post(
        `https://letterboxd-be.onrender.com/api/v1/movies/create`,
        movie,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      )
      console.log('search movie', movie);
      setNewMovie(response.data)
      console.log(response.data);
    } catch (error) {
      console.log(error);
      console.log('error search movie', movie);
      
    }
    navigate(`/home/${movie?.imdbID}`, {state: {movieId: newMovie?._id}})
    toggleSearchModal()
    setSearch('')
  }

  const toggleSearchModal = () => {
    setSearchModal(!searchModal)
  }

  const toggleHomeModal = () => {
    setHomeModal(!homeModal)
  }

  const turnOffModals = () => {
    setSearchModal(false)
    setHomeModal(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('letterToken')
          localStorage.removeItem('letterUserId')
          localStorage.removeItem('letterName')
          localStorage.removeItem('letterEmail')
          alert('logged out successfully')
          navigate('/')
  }

  const handleEventAlert = () => {
    alert("we're working on adding this feature")
  }

  return (
    <div className='navbar'>

    <div className="navbar-div">
      <div className="navbar-logo" onClick={turnOffModals}>
      <i class="fa-solid fa-cube logo-icon"></i>
      <h2 className="logo-title" onClick={() => navigate('/home/timeline')}>Club 49</h2>
      </div>

      <div className="nav-searchbar">
      <div className="searchbar-div">
        <input className="search"
        type='text'
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        />
        <i class="fa-solid fa-magnifying-glass search-icon" onClick={fetchMovies}></i>
        </div>

        { searchModal && 
        <div className="search-card" onClick={addMovie}>
        <img src={movie?.Poster}  className="search-img"/>
          <div className="search-details">
        <p>{movie?.Title}</p>
        <p>{movie?.Year}</p>
        <p>{movie?.Actors}</p>
        </div>
        </div>
      }
      </div>

      <div className="nav-btns-div">
      <div className="nav-btns" onClick={() => setSearchModal(false)}>
    
    <div className="home-btn-div">
      <button onClick={toggleHomeModal}
      className={homeModal ? 'blue' : 'dark-blue'}>{letterName}</button>
            {
        homeModal && 
        <ul className="home-ul" onClick={() => setHomeModal(false)}>
          <li onClick={() => navigate('/home/timeline')}>Home</li>
          <li onClick={() => navigate(`/home/${userId}/profile`)}>Profile</li>
          <li onClick={() => navigate('/home/films')}>Films</li>
          <li onClick={handleEventAlert}>Diary</li>
          <li onClick={() => navigate(`/home/${userId}/reviews`)}>Reviews</li>
          <li onClick={() => navigate(`/home/${userId}/watchlist`)}>Watchlist</li>
          <li onClick={() => navigate(`/home/${userId}/favourites`)}>Likes</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      }
      </div>

      <button className="nav-btn" onClick={() => navigate('/home/films')}>Films</button>
      <button className="nav-btn" onClick={handleEventAlert}>Lists</button>
      <button className="nav-btn" onClick={() => navigate('/home/members')}>Members</button>
      <button className="nav-btn" onClick={handleEventAlert}>Journals</button>
      </div>

      </div>

    </div>

    <main className="main" onClick={turnOffModals}>
        <Outlet />
    </main>

    </div>
  )
}

export default Navbar
