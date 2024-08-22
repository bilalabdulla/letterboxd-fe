import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


const Reviews = () => {
    const [userMovies, setuserMovies] = useState()
    const ratings = [1, 2, 3, 4, 5]
    const { userId } = useParams()
    const token = localStorage.getItem('letterToken')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserMovies = async () => {
            try {
                const response = await axios.get(
                    `https://letterboxd-be.onrender.com/api/v1/usermovie/${userId}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                setuserMovies(response.data.userMovies)
                console.log('fetched user movies', response.data.userMovies);
            } catch (error) {
                console.error('error fetching user movies', error);   
            }
        }
        fetchUserMovies()
    }, [])

  return (
    <div className="reviews-div">
        {
            userMovies?.map((movie, index) => {
                if (index === 0) {
                    return <div className="review-name">
                      <h4 className="">{movie?.createdBy?.name}</h4>
                      <h4 className="highlight-text">Reviews</h4>
                    </div>
                }
            })
        }
    <h4 className="recent-review-title">Recent Reviews</h4>
      <ul className="user-movie-list">
        {userMovies?.map((movie, index) => {
            return <div className="user-movie-list-item">
                    <img src={movie?.movieId?.Poster} className="dbmovie-img"
                    onClick={() => navigate(`/home/${movie?.movieId?.imdbID}`)}/>
                    
                    <div className="user-movie-details">
                        <div className="user-movie-title-details">
                            <p className="title">{movie?.movieId?.Title}</p>
                            <p className="user-movie-year">{movie?.movieId?.Year}</p>
                        </div>
                        <div className="user-movie-rating-details">
                        <p>
                  {
                    ratings.map((rating) => {
                      if (rating > movie?.rating) {
                        return <i class="fa-regular fa-star star-icon-three"></i>
                      } else {
                        return <i class="fa-solid fa-star star-icon-three"></i>
                      }
                    })
                  }
                  </p>
                    <p className="watched-text">watched {movie?.createdAt.split('T')[0]}</p>
                         </div>

                         <p className="user-movie-review">{movie?.review}</p>
                    </div>
                </div>
        })}
      </ul>
    </div>
  )
}

export default Reviews
