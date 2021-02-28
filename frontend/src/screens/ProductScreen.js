import { createReview, detailsProduct } from '../actions/productActions';
import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; 
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';
;



const ProductScreen = (props) => {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const { 
        loading:loadingReviewCreate,
         error:errorReviewCreate,
          success: successReviewCreate,
        } = productReviewCreate;

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (successReviewCreate) {
            window.alert('Review Submitted Successfully');
            setRating('');
            setComment('');
            dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
        }
       dispatch(detailsProduct(productId));
    }, [dispatch, productId, successReviewCreate]);
    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        if(comment && rating) {
            dispatch(createReview(productId, {rating, comment, name: userInfo}))
        } else {
            alert('Please enter comment and rating')
        }
    }
    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
        
        <div>  
            <Link to="/">Retour au résultat</Link>
            <div className="row top">
                <div className="col-2">
                    <img className="large" src={product.image} alt={product.name}/>
                </div>
                <div className="col-1">
                    <ul>
                        <li>
                            <h1>{product.name}</h1>
                        </li>
                        <li>
                            <Rating rating={product.rating} numReviews={product.numReviews}/>
                        </li>
                        <li>Price : {product.price} CFA</li>
                        <li>
                            Description:
                            <p>{product.description}</p>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>Prix</div>
                                    <div className="price">{product.price} CFA</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Status</div>
                                    <div>
                                        {product.countInStock > 0 ? ( <span className="success">En Stock</span>
                                         ) : (
                                             <span className="danger">Unavailable</span>
                                         ) } 
                                    </div>
                                </div>
                            </li>
                            {product.countInStock > 0 && (
                                <>
                                    <li>
                                        <div className="row">
                                            <div>Qty</div>
                                            <div>
                                                <select value={qty}
                                                    onChange={(e) => setQty(e.target.value)}
                                                    >
                                                    {[...Array(product.countInStock).keys()].map(
                                                        (x) => (
                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                        )
                                                    )}
                                                    
                                                </select>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                <button onClick={addToCartHandler} className="primary block">Ajouter au panier</button>
                            </li>
                            </>
                            )}
                            
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <h2 id="reviews">Commentaires</h2>
                {product.reviews.length === 0 && (
                    <MessageBox>Pas d'avis</MessageBox>
                )}
                <ul>
                    {product.reviews.map((review) => (
                        <li key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating rating={review.rating} caption=" " />
                            <p>{review.createdAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                        </li>
                    ))}
                    <li>
                        {userInfo ? (
                            <form className="form" onSubmit={submitHandler}>
                                <div>
                                    <h2>Rédiger un commentaire client</h2>
                                </div>
                                <div>
                                    <label htmlFor="rating">Noter</label>
                                    <select id="rating" value={rating}
                                       onChange={(e) => setRating(e.target.value)}>
                                        <option value="">Select....</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="comment"></label>
                                    <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                                </div>
                                <div>
                                    <label />
                                    <button className="primary" type="submit">Submit</button>
                                </div>
                                <div>
                                    {loadingReviewCreate && <LoadingBox></LoadingBox>}
                                    {errorReviewCreate && (
                                        <MessageBox variant="danger">
                                            {errorReviewCreate}
                                        </MessageBox>
                                    )}
                                </div>
                            </form>
                        ) : (
                            <MessageBox>
                                Veuillez vous <Link to="/signin">connecter</Link> pour rediger un avis
                            </MessageBox>
                        )}
                    </li>
                </ul>
            </div>
            </div>
            )}
        </div>
    );
};

export default ProductScreen;