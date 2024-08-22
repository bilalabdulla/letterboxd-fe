import axios from "axios"
import { useEffect } from "react"


const Activity = (props) => {
    const {rating, review, title, year, poster} = props
    const token = localStorage.getItem('letterToken')
    const ratings = [1, 2, 3, 4, 5]

  return (
      <div className="review-modal">
        <img src={poster} className="review-img"/>

        <div className="review-modal-div">
            <div className="review-modal-title-div margin">
                <h4 className="review-title">{title}</h4>
                <h4 className="review-year">{year}</h4>
            </div>

        <div className="review-rating-div">
            <div className="review-stars-div">
                <h4 className="orange">You Rated It: </h4>

            <ul className="review-stars yellow ">
                { 
                    ratings?.map((ratings, index) => {
                        if (rating) {
                        if (ratings > rating) {
                        return <i class="fa-regular fa-star review-star-icon"></i>
                        } else {
                        return <i class="fa-solid fa-star review-star-icon" ></i>
                        }
                         } else {
                        return <i class="fa-regular fa-star review-star-icon"></i>
                        }
                    })
                }
            </ul>
            </div>
        </div>

        <div className="">
            <div className="activity-review">
                <h4 className="activity-review-title">You Reviewed It: </h4>
                <p className="activity-review-text">{review}</p>
            </div>
        </div>
        </div>

    </div>
  )
}

export default Activity
