import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchUserMovie } from "../hooks/fetchUserMovies"


const Timeline = () => {
    const [movie, setMovie] = useState({})
    const [search, setSearch] = useState()
    const token = localStorage.getItem('letterToken')
    const navigate = useNavigate()
    const [newMovie, setNewMovie] = useState({})
    const [userMovie, setUserMovie] = useState()
    const [DBMovies, setDBMovies] = useState([])
    const [searchModal, setSearchModal] = useState(false)
    const ratings = [1, 2, 3, 4, 5]
  
      const fetchMovies = async () => {
        const newSearch = search.replace(' ', '+')
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
          setMovie(response.data)
          toggleSearchModal()
          console.log(response?.data);
        } catch (error) {
          console.log(error);
        }
      }
  
    const addMovie = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8000/api/v1/movies/create`,
          movie,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        )
        setNewMovie(response.data)
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
      navigate(`/${movie?.imdbID}`, {state: {movieId: newMovie?._id}})
    }

    useEffect(() => {
      const fetchDBMovies = async () => {
        try {
          const response = await axios.get(
            'http://localhost:8000/api/v1/movies',
            {
              headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }
          )
          setDBMovies(response.data.movies) 
          console.log('database movies fetched', response.data);
        } catch (error) {
          console.error('error fetching db movies', error);
        }
      }
      fetchDBMovies()
    }, [])

    useEffect(() => {
      const fetchUserMovie = async () => {
        try {
            const response = await axios.get(
                'http://localhost:8000/api/v1/usermovie',
                {   
                  params: {
                    per_page: 3
                  },
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            setUserMovie(response.data.userMovie)
            console.log('user movies fetched', response.data);
        } catch (error) {
            console.error('erro fetching user movies', error);
        }
    }
    fetchUserMovie()
    }, [])

    const toggleSearchModal = () => {
      setSearchModal(!searchModal)
    }

    

  return (
    <div className="timeline">

      <div className="dbmovies">
        <h4 className="user-reviews-title">New from friends</h4>
        <div className="dbmovies-list">
          {
            DBMovies.map((movie, index) => {
              if (index < 9) {
              return <div className="dbmovie-card" key={movie?._id}>
                <img src={movie.Poster} className="dbmovie-img"
                onClick={() => navigate(`/home/${movie?.imdbID}`)}/> 
              <h4 className="dbmovie-title">{movie.Title}</h4>
              </div>
              } else {
                return null
              }
            })
          }
        </div>
        </div>

      <div className="dbmovies">
          <h4 className="user-reviews-title">New Ratings from friends</h4>
        <div className="dbmovies-list">
          {
            userMovie?.map((movie) => {
              return <div className="dbmovie-card" key={movie?._id}>
                <img src={movie?.movieId?.Poster} className="dbmovie-img"
                onClick={() => navigate(`/home/${movie?.movieId?.imdbID}`)} />
                <h4 className="rating-user-name" 
                onClick={() => navigate(`/home/${movie?.createdBy?._id}/profile`)}>
                  {movie?.createdBy?.name.split(' ')[0]}</h4>
                <p>
                  {
                    ratings.map((rating) => {
                      if (rating > movie?.rating) {
                        return <i class="fa-regular fa-star star-icon-2"></i>
                      } else {
                        return <i class="fa-solid fa-star star-icon-2"></i>
                      }
                    })
                  }
                  </p>
                </div>
            })
          }
        </div>
        </div>

        <div className="user-reviews">
          <h4 className="user-reviews-title">Popular Reviews with friends</h4>
          <ul className="user-reviews-div">
          {
            userMovie?.map((movie, index) => {
              if (index > 3) {
                return null
              } else {
              return <div className="user-review-card" key={movie?._id}>
                <div className="user-review-card-details">
                  <img src={movie?.movieId?.Poster} className="dbmovie-img" 
                  onClick={() => navigate(`/home/${movie?.movieId?.imdbID}`)}/>
                  <div className="user-review-movie-details">
                  <p onClick={() => navigate(`/home/${movie?.createdBy?._id}/profile`)}
                    className="user-name-link">{movie?.createdBy?.name}</p>
                  <h4 className="inline">{movie?.movieId?.Title}</h4>
                  <h4 className="inline">{movie?.movieId?.Year}</h4>
                    <p>
                  {
                    ratings.map((rating) => {
                      if (rating > movie?.rating) {
                        return <i class="fa-regular fa-star star-icon"></i>
                      } else {
                        return <i class="fa-solid fa-star star-icon"></i>
                      }
                    })
                  }
                  </p>
                  </div>
                  </div>

                  <p className="review-content">{movie?.review}</p>
                </div>
              }
            })
          }
          </ul>
        </div>
    </div>
  )
}

export default Timeline
