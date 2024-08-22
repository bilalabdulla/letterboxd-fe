import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


const Favourites = () => {
    const [favourites, setFavourites] = useState() 
    const { userId } = useParams()
    const token = localStorage.getItem('letterToken')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchFavourites = async () => {
            try {
                const response = await axios.get(
                    `https://letterboxd-be.onrender.com/api/v1/favourite/user/${userId}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                setFavourites(response.data)
                console.log('fetched favourites', response.data);
            } catch (error) {
                console.error('error fetching favourites', error);
            }
        }
        fetchFavourites()
    }, [])

  return (
    <div className="fav-div-main">
        {   
            <div className="fav-name">
            <p className="">{favourites?.favourite[0]?.createdBy?.name}</p>
            <h4 className="highlight-text">Favourites</h4>
            </div>
        }
        {
            (favourites?.favourite.length === 0) && <h2 className="empty fav-empty">You Haven't favourited any movies yet...</h2>
        }
      {
        favourites?.favourite?.map((favourite) => {            
            return <div className="fav-list">
                {
                    favourite?.movies?.map((movie) => {
                        return <div className="">
                            <img src={movie?.Poster} className="fav-img" 
                            onClick={() => navigate(`/home/${movie?.imdbID}`)}/>
                        </div>
                    })
                }
            </div>
        })
      }
    </div>
  )
}

export default Favourites
