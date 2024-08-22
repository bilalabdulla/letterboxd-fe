import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const Profile = () => {
    const [user, setUser] = useState()
    const { userId } = useParams()
    const localUser = localStorage.getItem('letterUserId')
    const token = localStorage.getItem('letterToken')
    const [userMovies, setuserMovies] = useState()
    const [userFavourites, setUserFavourites] = useState()
    const ratings = [1, 2, 3, 4, 5]
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/v1/users/${userId}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                setUser(response.data.user)
                console.log('fetched user', response.data.user);
            } catch (error) {
                console.error('error fetching user', error);
            }
        }
        fetchUser()
    }, [userId])

    useEffect(() => {
        const fetchUserMovies = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/v1/usermovie/${userId}`,
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
    }, [userId])

    useEffect(() => {
        const fetchUserFavourites = async () => {
          try {
            const response = await axios.get(
              `http://localhost:8000/api/v1/userfavourites/${userId}`,
              {
                headers: {
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              }
            )
            setUserFavourites(response.data.userFavourites[0])
            console.log('user favourites fetched', userFavourites);
          } catch (error) {
            console.error('error fetching user favourites', error);
          }
        }
        fetchUserFavourites()
      }, [userId])

  return (
    <div>
      

    <div className="user-movie-list-div">
        <div className="user-profile-details">
        <img src="/userimage.png" className="profile-img" />
        <p className="profile-name">{user?.name}</p>
        <p className="profile-email">{user?.email}</p>
        {
          (user?._id === localUser) &&  <button className="edit-btn" onClick={() => navigate('/home/updateprofile')}>Edit Profile</button>
        }
        </div>

        <div>
            <p className="recent-review-title">Favourites films</p>
            <ul className="user-recent">
        <img src={userFavourites?.movieOne ? userFavourites?.movieOne?.Poster : '/empty-image.jpg'} className='favourite-img'/>
        <img src={userFavourites?.movieTwo ? userFavourites?.movieTwo?.Poster : '/empty-image.jpg'} className='favourite-img'/>
        <img src={userFavourites?.movieThree ? userFavourites?.movieThree?.Poster : '/empty-image.jpg'} className='favourite-img' />
        <img src={userFavourites?.movieFour ? userFavourites?.movieFour?.Poster : '/empty-image.jpg'} className='favourite-img'/>
            </ul>
        </div>

        <div>
            <p className="recent-review-title">Recent Activites</p>
            <ul className="user-recent">
            {
                userMovies?.map((movie, index) => {
                    if (index > 3) {
                        return null
                    } else {
                    return <img src={movie?.movieId?.Poster} className="user-list-img"
                    onClick={() => navigate(`/home/${movie?.movieId?.imdbID}`)}/>
                    }
                })
            }
            </ul>
        </div>

        <h4 className="recent-review-title">Recent Reviews</h4>
      <ul className="user-movie-list">
        {userMovies?.map((movie, index) => {
            if (index > 3) {
                return null 
            } else {
            return <div className="user-movie-list-item">
                    <img src={movie?.movieId?.Poster} className="dbmovie-img"
                    onClick={(() => navigate(`/home/${movie?.movieId?.imdbID}`))}/>
                    
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
            }
        })}
      </ul>
    </div>

    </div>
  )
}

export default Profile
