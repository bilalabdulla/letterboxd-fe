import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


const Watchlist = () => {
    const [watchlist, setWatchlist] = useState()
    const { userId } = useParams()
    const token = localStorage.getItem('letterToken')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/v1/watchlist/user/${userId}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                setWatchlist(response.data)
                console.log('fetched watchlist', response.data);
            } catch (error) {
                console.error('error fetching watchlist');
            }
        }
        fetchWatchlist()
    }, [])

  return (
    <div className="fav-div-main">
      { 
        <div className="watch-name">
        <p className="">{watchlist?.watch[0]?.createdBy?.name}</p>
        <p>Watchlist</p>
        </div>
      }
      <p className="list-length">you want to see {watchlist?.watch[0]?.movies.length} films</p>
      {
        (watchlist?.watch.length === 0) ?  
        <h2 className="empty watch-empty">If you add movies to the watchlist it would show up here...</h2> 
       : watchlist?.watch?.map((watch) => {            
            return <div className="watch-list">
                {
                    watch?.movies?.map((movie) => {
                        return <div className="" key={movie?.imdbID} onClick={() => navigate(`/home/${movie?.imdbID}`)}>
                            <img src={movie?.Poster} className="watchlist-img" />
                        </div>
                    })
                }
            </div>
        })
      }
    </div>
  )
}

export default Watchlist
