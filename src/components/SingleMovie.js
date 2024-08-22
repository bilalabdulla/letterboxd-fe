import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Review from './Review'
import Activity from './Activity'

const SingleMovie = () => {
    const [movie, setMovie] = useState({})
    const { imdbID } = useParams()
    const userId = localStorage.getItem('letterUserId')
    const token = localStorage.getItem('letterToken')
    const [statusCode, setStatusCode] = useState()
    const [favStatusCode, setFavStatusCode] = useState()
    const [ rating, setRating ] = useState()
    const [ review, setReview ] = useState('')
    const ratings = [1, 2, 3, 4, 5]
    const [userMovie, setUserMovie] = useState()
    const [userMovieRating, setUserMovieRating] = useState(0)
    const [ratingMovie, setRatingMovie] = useState()
    const [ratingLength, setRatingLength] = useState()
    const [favouriteLength, setFavouriteLength] = useState()
    const [watchlistLength, setWatchlistLength] = useState()
    const [info, setInfo] = useState('cast')

    const [modal, setModal] = useState(false)
    const [activityModal, setActivityModal] = useState(false)

    const [ watchlist, setWatchlist ] = useState({
        userId: userId,
        movieId: '',
    })

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(
                `http://www.omdbapi.com/?i=${imdbID}&apikey=628a4cfc`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'                    }
                }
                )
                setMovie(response.data)
                console.log('movie fetched', response.data);
            } catch (error) {
                console.error('error fetching movie', error);
            }
        }
        fetchMovie()
    }, [])

    useEffect(() => {
        const fetchDBMovie = async () => {
            try {
                const response = await axios.get(
                    `https://letterboxd-be.onrender.com/api/v1/movies/${imdbID}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                setWatchlist({...watchlist, movieId: response.data.movie._id})
                console.log('movie fetched from db', response.data);
            } catch (error) {
                console.error('error fetching movie from db', error);
            }
        }
        fetchDBMovie()
    },[])

    useEffect(() => {
        const fetchWatchlist = async (req, res) => {
            try {
                const response = await axios.get(
                    `https://letterboxd-be.onrender.com/api/v1/watchlist/${userId}/${watchlist.movieId}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                console.log('watchlist movie fetched', response.data);
                setStatusCode(response.status)
            } catch (error) {
                console.error('error fetching movie watchlist', error);
                setStatusCode(error.response.status)
            }
        }
        fetchWatchlist()
    }, [watchlist])
    console.log('status', statusCode);

    useEffect(() => {
        const fetchFavourite = async (req, res) => {
            try {
                const response = await axios.get(
                    `https://letterboxd-be.onrender.com/api/v1/favourite/${userId}/${watchlist.movieId}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                console.log('favourite movie fetched', response.data);
                setFavStatusCode(response.status)
            } catch (error) {
                console.error('error fetching favourite movie', error);
                setFavStatusCode(error.response.status)
            }
        }
        fetchFavourite()
    }, [watchlist])
    console.log('status', favStatusCode);


    const handleWatchlist = async () => {
        if (statusCode === 404 || statusCode === 201) {
            try {
                console.log('watchlist', watchlist);
                const response = await axios.post(
                    `https://letterboxd-be.onrender.com/api/v1/watchlist/create`,
                    watchlist,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                console.log('watchlist created', response.data);
                setStatusCode(response.status)
            } catch (error) {
                console.error('error adding watchlist', error);
            }
        } else {
            try {
                const response = await axios.patch(
                    `https://letterboxd-be.onrender.com/api/v1/watchlist/remove`,
                    watchlist,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                console.log('watchlist removed', response.data);
                setStatusCode(response.status)
            } catch (error) {
                console.error('error removing watchlist', error);
            }
        }
    }

    const handleFavourite = async () => {
        if (favStatusCode === 404 || favStatusCode === 201) {
            try {
                console.log('favourite', watchlist);
                const response = await axios.post(
                    `https://letterboxd-be.onrender.com/api/v1/favourite/create`,
                    watchlist,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                console.log('favourite created', response.data);
                setFavStatusCode(response.status)
            } catch (error) {
                console.error('error adding favourite', error);
            }
        } else {
            try {
                const response = await axios.patch(
                    `https://letterboxd-be.onrender.com/api/v1/favourite/remove`,
                    watchlist,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                console.log('favourite removed', response.data);
                setFavStatusCode(response.status)
            } catch (error) {
                console.error('error removing favourite', error);
            }
        }
    }

    const handleRating = async () => {
        if (review === null || review === '') {
            alert('please write a review')
        } else {
        try {
            const response = await axios.post(
                'https://letterboxd-be.onrender.com/api/v1/usermovie/create',
                ({ userId: userId, id: watchlist.movieId, rating: rating, review: review }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            console.log('created movie ratings', response.data);
        } catch (error) {
            console.error('error creating ratings', error.response.data);
        }
        toggleModal()
    }
    }

    useEffect(() => {
        const fetchUserMovie = async () => {
            try {
                const response = await axios.get(
                    `https://letterboxd-be.onrender.com/api/v1/usermovie/length/total/${userId}/${watchlist?.movieId}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                setUserMovieRating(response.data?.userMovie[0]?.rating)
                setUserMovie(response.data?.userMovie[0])
                console.log('users movie fetched', response.data);
            } catch (error) {
                console.error('error fetching user movie', error);
            }
        }
        fetchUserMovie()
    }, [watchlist])

    useEffect(() => {
        const fetchMovieRatings = async () => {
            try {
                const response = await axios.get(
                    `https://letterboxd-be.onrender.com/api/v1/usermovie/movie/new/${watchlist?.movieId}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                setRatingMovie(response.data?.movie)
                setRatingLength(response.data?.length)
                console.log('movie ratings fetched', response.data);
            } catch (error) {
                console.error('error fetching movie ratings', error);
            }
        }
        fetchMovieRatings()
    }, [watchlist])   

    useEffect(() => {
        const fetchTotalFavourites = async () => {
            try {
                const response = await axios.get(
                    `https://letterboxd-be.onrender.com/api/v1/favourite/movie/new/${watchlist?.movieId}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                setFavouriteLength(response.data?.length)
                console.log('total favourites fetched', response.data);
            } catch (error) {
                console.error('error fetching total favourites', error);
            }
        }
        fetchTotalFavourites()
    }, [watchlist])

    useEffect(() => {
        const fetchTotalWatchlists = async () => {
            try {
                const response = await axios.get(
                    `https://letterboxd-be.onrender.com/api/v1/watchlist/length/total/${watchlist?.movieId}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                setWatchlistLength(response.data?.length)
                console.log('total watchlist fetched', response.data);
            } catch (error) {
                console.error('error fetching total watchlist', error);
            }
        }
        fetchTotalWatchlists()
    }, [watchlist])
    
    const toggleModal = () => {
        setModal(!modal)
    }

    const toggleActivityModal = () => {
        setActivityModal(!activityModal)
    }

    let totalRating = 0


  return (
    <div className='single-movie'>

        <div className='single-movie-main'>
        <div className='single-movie-img-div'>
        <img src={movie?.Poster} className='single-movie-img'/>

        <div className='single-movie-img-details'>
        <p><i class="fa-solid fa-heart orange"></i>
             {favouriteLength}</p>
        <p><i class="fa-solid fa-clock dark-blue"></i> {watchlistLength}</p>
        <p className='imdb-rating'><i class="fa-solid fa-star yellow"></i>IMDB {movie?.imdbRating}</p>
        </div>

        </div>
        <div className='single-movie-main-details'>
            <div className='title-details'>
            <p className='title'>{movie?.Title}</p>
            <p className='year'>{movie?.Year}</p>
            <p className='director'>Directed By <span>{movie?.Director}</span></p>
            </div>
            <p className='plot'>{movie?.Plot}</p>
        </div>

        <div className='review-full-div'>
            <div className='review-div'>       
                <div className='watch-fav-div'>
                    <i class="fa-regular fa-eye eye-icon"></i>
                    { (favStatusCode === 404 || favStatusCode === 201) ?
                        <i class="fa-regular fa-heart heart-icon" onClick={handleFavourite}></i>
                    : <i class="fa-solid fa-heart heart-icon" onClick={handleFavourite}></i>}
                    { (statusCode === 404 || statusCode === 201) ?
                        <i class="fa-regular fa-clock clock-icon" onClick={handleWatchlist}></i>
                    : <i class="fa-solid fa-clock clock-icon" onClick={handleWatchlist}></i>}
                </div>
                <div className='rating-div'>
                    <p className='rating-text'>You Rated</p>
                    { 
                        ratings.map((rating) => {
                        if (userMovieRating) {
                            if (rating > userMovieRating) {
                                return <i class="fa-regular fa-star star-icon-2"></i>
                            } else {
                                return <i class="fa-solid fa-star star-icon-2"></i>
                            }
                        } else {
                            return <i class="fa-regular fa-star star-icon-2"></i>
                        }

                        })
                    }

                </div>
                <div className='log-div' onClick={toggleActivityModal}>Show your Activity</div>
                <div className='log-div' onClick={toggleModal}>Review</div>
                <div className='log-div'>Add to lists</div>
                <div className='log-div'>Share</div>
                {
                    ratingMovie?.map((movie) => {
                        totalRating += movie?.rating
                    })
                }
            </div>

            <div className='ratings-total-div'>
                <h4 className='ratings-total-title'>
                    <p>Ratings</p>
                    <span>{ratingLength} Fans </span></h4>

                <div className='total-ratings-div'>    
                <p className='total-ratings'>{totalRating && parseFloat((totalRating / ratingLength).toFixed(1))}</p>
                {
                    ratings?.map((rating) => {
                        return <i class="fa-solid fa-star star-icon-3"></i>
                    })
                }
                </div>
            </div>
            </div>

        </div>

        <div className='single-movie-extended'>
            <ul className='extended-ul'>
                <li onClick={() => setInfo('cast')} className={(info === 'cast') ? 'underline' : ''}>CAST</li>
                <li onClick={() => setInfo('crew')} className={(info === 'crew') ? 'underline' : ''}>CREW</li>
                <li onClick={() => setInfo('country')} className={(info === 'country') ? 'underline' : ''}>COUNTRY</li>
                <li onClick={() => setInfo('genre')} className={(info === 'genre') ? 'underline' : ''}>GENRE</li>
                <li onClick={() => setInfo('releases')} className={(info === 'releases') ? 'underline' : ''}>RELEASES</li>
            </ul>
      
      {
         (info === 'cast') && 
         <div className='info-details'>
            <p className='crew-text'>{movie?.Actors?.split(',').map((text) => {
                return <span>{text}</span>
            })}</p>
         </div>
      }
    { (info === 'crew') && 
      <div className='info-details'>
        <p className='crew-text'>DIRECTOR___________{movie?.Director?.split(',').map((text) => {
            return <span>{text}</span>
        })}</p>
        <p className='crew-text'>WRITER_____________{movie?.Writer?.split(',').map((text) => {
            return <span>{text}</span>
        })}</p>
      </div>
    }
    { (info === 'country') &&
      <div className='info-details'>
        <p className='crew-text'>COUNTRY___________{movie?.Country?.split(',').map((text) => {
            return <span>{text}</span>
        })}</p>
        <p className='crew-text'>LANGUAGE__________{movie?.Language?.split(',').map((text) => {
            return <span>{text}</span>
        })}</p>
      </div>
    }
    { (info === 'genre') &&
      <div className='info-details'>
        <p className='crew-text'>GENRE_____________{movie?.Genre?.split(',').map((text) => {
            return <span>{text}</span>
        })}</p>
      </div>
    }
    { (info === 'releases') &&
      <div className='info-details'>
        <p className='crew-text'>RELEASED__________<span>{movie?.Released}</span></p>
      </div>
    }
      </div>

    <div className='user-reviews-two'>
    <h4 className="user-reviews-title">Popular Reviews with friends</h4>
    <ul className='user-reviews-div-two'>
        {(ratingLength === 0) && <h2 className='empty'>No Reviews Yet</h2>}
      {
         ratingMovie?.map((movie) => {
            
            if (movie?.review === '') {
                return null
            } else { 
            return <div className='movie-review-item'>
                <p className='movie-review-name'>Review By <span>{movie?.createdBy?.name}</span></p>
                <p className='movie-review-text'>{movie.review}</p>
                </div>
            }
        })
      }
      </ul>
    </div>

      {
        modal && (
            <div className="modal">
          <div className="overlay" onClick={toggleModal}></div>
          <button onClick={toggleModal}>X</button> 
          <div className="modal-content-two">
          <Review modal={modal} setModal={setModal}
          favStatusCode={favStatusCode} handleFavourite={handleFavourite}
          setReview={setReview} review={review} 
          poster={movie?.Poster} title={movie?.Title}
          year={movie?.Year} handleRating={handleRating}
          rating={rating} setRating={setRating}/>
          </div>
          </div> 
        )
      }
      {
        activityModal && (
            <div className="modal">
                <div className="overlay" onClick={toggleActivityModal}></div>
                <button onClick={toggleActivityModal}>X</button> 
                <div className="modal-content-two">
                <Activity modal={activityModal} setModal={setActivityModal}
                rating={userMovieRating}
                review={userMovie?.review}
                poster={movie?.Poster}
                title={movie?.Title}
                year={movie?.Year}/>
                </div>
          </div> 
        )
      }
    </div>
  )
}

export default SingleMovie
