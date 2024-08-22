import axios from "axios";
import { useState } from "react";


const Search = (props) => {
    const { modal, setModal, movieNumber } = props 
    const [search, setSearch] = useState('')
    console.log('movienumber', movieNumber);
    const userId = localStorage.getItem('letterUserId')
    const token = localStorage.getItem('letterToken')
    const [movie, setMovie] = useState({})
    const [searchModal, setSearchModal] = useState(false)
    const [favouriteModal, setFavouriteModal] = useState(false)
    const [newMovie, setNewMovie] = useState({})
    const [favouriteMovie, setFavouriteMovie] = useState({
        createdBy: userId
    })
    const [imdbID, setImdbID] = useState()

        const fetchDBMovie = async () => {
            try {
                const response = await axios.get(
                    `https://letterboxd-be.onrender.com/api/v1/movies/${movie?.imdbID}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                if (movieNumber === 1) {
                  setFavouriteMovie({...favouriteMovie, movieOne: response.data.movie._id})
                } else if (movieNumber ===2) {
                  setFavouriteMovie({...favouriteMovie, movieTwo: response.data.movie._id})
                } else if (Number(movieNumber) === 3) {
                  setFavouriteMovie({...favouriteMovie, movieThree: response.data.movie._id})
                } else {
                  setFavouriteMovie({...favouriteMovie, movieFour: response.data.movie._id})
                }
                console.log('movie fetched from db', response.data);
            } catch (error) {
                console.error('error fetching movie from db', error);
            }
        }

    const fetchMovies = async () => {
      if (search !== '') {
        const newSearch = search.replace(' ', '+')
        console.log(newSearch);
        try {
          const response = await axios.get(
            `http://www.omdbapi.com/?t=${newSearch}&apikey=628a4cfc`,
            {
              headers: {
                'Accept': 'application/json',
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
        // navigate(`/home/${movie?.imdbID}`, {state: {movieId: newMovie?._id}})
        toggleSearchModal()
        setFavouriteModal(true)
        fetchDBMovie()
        setSearch('')
      }

      const addFavouriteMovie = async () => {
        try {
            const response = await axios.post(
                `https://letterboxd-be.onrender.com/api/v1/userfavourites/${userId}`,
                favouriteMovie,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            console.log('favourite movie added', response.data);
        } catch (error) {
            console.error('error adding favourite movie', error);
        }
        setModal(false)
      }

      const toggleSearchModal = () => {
        setSearchModal(!searchModal)
      }
    
  return (
    <div className="search-modal">
        <h4 className="pick-text">Pick a Favourite Film</h4>

        <h4 className="pick-text-two">Name of Film</h4>

            <div className="modal-search-div">

                <input className="search-input-modal"
                type='text'
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                />
                <i class="fa-solid fa-magnifying-glass search-icon" onClick={fetchMovies}></i>
                </div>

                { searchModal && 
                <div className="search-modal-card" onClick={addMovie}>
                <img src={movie?.Poster}  className="search-modal-img"/>
                <div className="search-modal-details">
                <p>{movie?.Title}</p>
                <p>{movie?.Year}</p>
                <p>{movie?.Actors}</p>
                </div>
                </div>
                }

                {
                    favouriteModal && 
                    <div className="add-favourite-div">
                        <h4>Are you sure you wanna add movie to your favourties?</h4>
                        <button className="yes-btn" onClick={addFavouriteMovie}>Yes</button>
                        <button  className="no-btn" onClick={() => setModal(false)}>No</button>
                    </div>
                }
    </div>
  )
}

export default Search
