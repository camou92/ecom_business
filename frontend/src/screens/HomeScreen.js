import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Product from '../components/Product';
import data from '../data';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import SearchBox from '../components/SearchBox';
import { Route } from 'react-router-dom';
//import SearchScreen from '../screens/SearchScreen';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products} = productList;
  useEffect(() =>{
    dispatch(listProducts({}));
  }, [dispatch]);
    return (
        <div>
          {/* <div>
                <Route render={({history}) => (<SearchBox history={history}/>)}/>
              </div> */}
              <br/><br/><br/>
          <Carousel showArrows autoPlay showThumbs={false}>
            <img src="images/p1.png" />
            <img src="images/p2.png" />
            <img src="images/p3.png" />
          </Carousel>
          <br/>
          <h2 class="fif">Featured Product</h2>
          {loading ?(
            <LoadingBox></LoadingBox>
          ): error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div className="row center">
              {products.map((product) => ( 
                <Product key={product._id} product={product} />
              ))}
            </div>
            )}
        </div>
    );
};

export default HomeScreen;