import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Films = () => {
    const [DBMovies, setDBMovies] = useState()
    const token = localStorage.getItem('letterToken')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDBMovies = async () => {
          try {
            const response = await axios.get(
              'https://letterboxd-be.onrender.com/api/v1/movies',
              {
                headers: {
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              }
            )
            setDBMovies(response.data?.movies) 
            console.log('database movies fetched', response.data);
          } catch (error) {
            console.error('error fetching db movies', error);
          }
        }
        fetchDBMovies()
      }, [])

  return (
    <div className="all-films-div">
        <h4 className="user-reviews-title">Popular Films</h4>
    <div className="all-films">
           {
            DBMovies?.map((movie, index) => {
              return <div className="dbmovie-card" key={movie?._id}>
                <img src={movie.Poster} className="dbmovie-img"
                onClick={() => navigate(`/home/${movie?.imdbID}`)}/> 
              <h4 className="dbmovie-title">{movie.Title}</h4>
              </div>
            })
          }
    </div>
    </div>
  )
}

export default Films
