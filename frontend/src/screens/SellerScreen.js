import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';

const SellerScreen = (props) => {
    const sellerId = props.match.params.id;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const productList = useSelector((state) => state.productList);
    const {
        loading: loadingProducts,
        error: errorProducts,
        products,
    } = productList;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailsUser(sellerId));
        dispatch(listProducts({ seller: sellerId }))
    }, [dispatch, sellerId]);

    return (
        <div className="row top">
            <div className="col-1">
                { loading ? <LoadingBox></LoadingBox>
                :
                error? <MessageBox variant="danger">{error}</MessageBox>
                :
                (
                    <ul className="card card-body">
                        <li>
                            <div className="row">
                                <div>
                                    <img src={user.seller.logo} alt={user.seller.name}/>
                                </div>
                                <div>
                                    <h1>{user.seller.name}</h1>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Rating value={user.seller.rating} text={`${user.seller.numReviews} reviews`} />
                        </li>
                        <li>
                            <a href={`mailto:${user.email}`}>Contact Seller</a>
                        </li>
                        <li>{user.seller.description}</li>
                    </ul>
                )
                }
            </div>
            <div className="col-3">

            </div>
        </div>
    );
};

export default SellerScreen;