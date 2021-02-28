import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const OrderHistoryScreen = (props) => {
    const orderMineList = useSelector((state) => state.orderMineList);
    const { loading, error, orders } = orderMineList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrderMine());
    }, [dispatch]);
    return (
        <div>
            <h1>Order History</h1>
            {loading ? <LoadingBox></LoadingBox>:
            error ? <MessageBox variant="danger">{error}</MessageBox>
            :
            (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>LIVRAISON</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid? order.paidAt.substring(0, 10) : 'No'}</td>
                                <td>
                                    {order.isDelivered ? order.deliveredAt.substring(0, 10) : 
                                     'No'}
                                </td>
                                <td>
                                    <button type="button"  className="small" onClick={() =>{
                                        props.history.push(`/order/${order._id}`);
                                    }}> Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OrderHistoryScreen;