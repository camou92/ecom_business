import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELIVER_RESET } from '../constants/orderConstants';

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo} = userSignin;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    if(!order || successDeliver || (order && order._id !== orderId)
    ) { 
    dispatch({ type: ORDER_DELIVER_RESET})
    dispatch(detailsOrder(orderId));
    }
  }, [dispatch, orderId]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  }
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.tel}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Livrer {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Attente Livraison</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {/* {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )} */}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Articles</div>
                  <div>{order.itemsPrice} CFA</div>
                </div>
              </li>
              {/* <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order.shippingPrice.toFixed(2)}</div>
                </div>
              </li> */}
              <li>
                <div className="row">
                  <div>Frais Livraison</div>
                  <div>{order.taxPrice} CFA</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Total</strong>
                  </div>
                  <div>
                    <strong>{order.totalPrice} CFA</strong>
                  </div>
                </div>
              </li>

              {userInfo.isAdmin && !order.isDelivered && (
                <li>
                  <button type="button" className="primary block" onClick={deliverHandler}> Deliver Order</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
