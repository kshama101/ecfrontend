import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import { detailsProduct, saveProductReview} from '../actions/productActions';
import { useNavigate } from 'react-router-dom';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';

function ProductScreen() {
  
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
 
  
  const productDetails = useSelector(state =>state.productDetails);
  const {product, loading, error} = productDetails;
  const  productReviewSave = useSelector(state =>state.productReviewSave);
  const {success: productSaveSuccess } = productReviewSave;
  const { id } = useParams();
  console.log(id)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  //dispatches an action to reset the review state. It also refreshes the product details on the page by fetching them again.

  useEffect(() => {
    if (productSaveSuccess) {
      alert('Review submitted successfully.');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    if (!product || product._id !== id) {
      // Fetch product details if not available or if the id has changed
      dispatch(detailsProduct(id));
    }
  }, [productSaveSuccess, product, id, dispatch]);

  console.log(product);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
 
  const handleAddToCart = () =>{
    navigate("/cart/" + id + "?qty=" + qty);
  }
  return <div>
  <div className='back-to-result'>
   <Link to="/">Back to Result</Link>
  </div>
  {loading ? (<div>Loading ...</div> ) :
    error ? (<div>{error} </div> ) :
    (
      <>
      <div className='details'>
        <div className='datails-image'>
          <img src={product.image} alt="product"></img>
        </div>
        <div className="details-info">
          <ul>
            <li>
              <h4>{product.name}</h4>
            </li>
            <li>
              {product.rating} Stars ({product.numReviews}) Reviews
            </li>
            <li>
            <b>Price: ${product.price}</b>
            </li>
            <li>
              Description :
              <div>
                {product.description}
              </div>
            </li>
          </ul>
        </div>
        <div className='details-action'>
          <ul>
            <li>
              Price: {product.price}
            </li>
            <li>
              Status:  {product.countInStock > 0 ? "In Stock" : "Unavailable"}
            </li>
            <li>
              Qty: <select value={qty} onChange={(e)=>{setQty(e.target.value)}}>
              {[...Array(product.countInStock).keys()].map(x=><option key={x +1} value={x+1}>{x+1}</option>)}
              </select>
            </li>
            <li>
            {product.countInStock > 0 && <button onClick={handleAddToCart} className='button primary'>Add to Cart</button> }
            </li>
          </ul>
        </div>
      </div> 
      <div className="content-margined">
        <h2>Reviews</h2>
          {product&&!product.reviews && <div>There is no review</div>} 
        <ul className="review" id="reviews">
          {product.reviews&&product.reviews.map((review) => (
            <li key={review._id}>
                <div>{review.name}</div>
                <div>
                  <Rating value={review.rating}></Rating>
                </div>
                {/* <div>{review.createdAt.substring(0, 10)}</div>*/}
                <div>{review.comment}</div>
            </li>
            ))}
            <li>
              <h3>Write a customer review</h3>
              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <ul className="form-container">
                    <li>
                      <label htmlFor="rating">Rating</label>
                      <select
                        name="rating"
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very Good</option>
                          <option value="5">5- Excelent</option>
                        </select>
                    </li>
                     <li>
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                    </li>
                    <li>
                      <button type="submit" className="button primary">
                         Submit
                      </button>
                    </li>
                  </ul>
                </form>
                ) : (
                <div>
                  Please <Link to="/signin">Sign-in</Link> to write a review.
                </div>
                )}
            </li>
        </ul>
                </div> 
        </>
    )
  }
  </div>
}
export default ProductScreen;