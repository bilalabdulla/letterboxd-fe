import { useState } from "react"

const Review = (props) => {
    const { review, setReview, poster, 
        title, year, handleRating, rating = 0, setRating, 
        favStatusCode, handleFavourite} = props
    const [starRating, setStarRating] = useState(null)
    const ratings = [1, 2, 3, 4, 5]
    const [ newRating, setNewRating ] = useState(0)


    const handleStarRating = (rating) => {
        if (rating === 1) {
            setRating(1)
            setNewRating(1)
        } else if (rating === 2) {
            setRating(2)
            setNewRating(2)
        } else if (rating === 3) {
            setRating(3)
            setNewRating(3)
        } else if (rating === 4) {
            setRating(4)
            setNewRating(4)
        } else {
            setRating(5)
            setNewRating(5)
        }
    }

    console.log('rating', rating);
    console.log('starrating', starRating);
    

  return (
    <div className="review-modal">
        <img src={poster} className="review-img"/>

        <div className="review-modal-div">
            <h4 className="review-modal-title">I WATCHED...</h4>
            <div className="review-modal-title-div">
                <h4 className="review-title">{title}</h4>
                <h4 className="review-year">{year}</h4>
            </div>
        <textarea className="review-area"
        placeholder="Add a Review..."
        type='text'
        value={review} 
        onChange={(e) => setReview(e.target.value)}/>

        <div className="review-rating-div">
            
            <div className="review-stars-div">
                <h4>Rating</h4>

            <ul className="review-stars">
                { 
                    ratings?.map((rating, index) => {
                        if (rating > newRating) {
                        return <i class="fa-regular fa-star review-star-icon " onClick={() => handleStarRating(index + 1)}></i>
                        } else {
                            return <i class="fa-solid fa-star review-star-icon " onClick={() => handleStarRating(index + 1)}></i>
                        }
                    })
                }
            </ul>
            </div>

            <div className="review-stars-div">
                <h4>Like</h4>
                { (favStatusCode === 404 || favStatusCode === 201) ?
                        <i class="fa-regular fa-heart like-icon" onClick={handleFavourite}></i>
                    : <i class="fa-solid fa-heart like-icon" onClick={handleFavourite}></i>}
            </div>
        </div>
        
        <button className="review-btn"
        onClick={handleRating}>Save</button>
        </div>

    </div>
  )
}

export default Review
