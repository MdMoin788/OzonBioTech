
import React from 'react'
import StarRating from "react-rating-stars-component";
import '../../styles/home/starReview.less'

export const StarReview = ({options, reviewsCount}) => {
  return (
    <div className="star-review">
      <StarRating classNames={"product-star-rating"} {...options} />
      <p className="product-review">{reviewsCount === 1 ? '1 reveiw' : reviewsCount + ' reviews'}</p>
    </div>
  );
}
