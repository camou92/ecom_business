import { BrowserRouter, Link, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Product from './components/Product';
import data from './data';
import CartScreens from './screens/CartScreens';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { useEffect, useState } from 'react';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () =>{
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() =>{
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    
    <BrowserRouter>
      <div className="App">
        
        <div className="grid-container">
        <header className="row">
          
              <div>
              <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
                  <Link className="brand" to="/">KM_Shop</Link>
              </div>
              {/* <div>
                <Route render={({history}) => (<SearchBox history={history}/>)}/>
              </div> */}
              <div>
              <Link to="/cart">
              <i class="fa fa-shopping-cart"></i>
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                  <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i>{' '}</Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/profile">User Profile</Link>
                    </li>
                    <li>
                      <Link to="/orderhistory">Order History</Link>
                    </li>
                    <li>
                    <Link to="#signout" onClick={signoutHandler}> Sign Out </Link>
                    </li>
                  </ul>
              </div>
            ) : ( 
              <Link to="/signin">Sign in</Link>
            )}

            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">Seller <i className="fa fa-caret-down"></i></Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}

            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
              </div>
          </header>
          <aside className={sidebarIsOpen ? 'open' : ''}>
            <ul className="categories">
              <li>
                <strong>Categories</strong>
                <button className="close-sidebar" type="button" onClick={() => setSidebarIsOpen(false)}>
                  <i className="fa fa-close"></i>
                </button>
              </li>
              {loadingCategories ? (
          <LoadingBox></LoadingBox>
        ) : errorCategories ? (
          <MessageBox variant="danger">{errorCategories}</MessageBox>
        ) : (
          categories.map((c) => (
            <li key={c}>
              <Link to={`/search/category/${c}`} onClick={() => setSidebarIsOpen(false)}>
                {c}
              </Link>
            </li>
          ))
        )}
            </ul>
          </aside>
          <main>
            
            <Route path="/cart/:id?" component={CartScreens} />
            <Route path="/product/:id" component={ProductScreen} exact />
            <Route path="/product/:id/edit" component={ProductEditScreen}/>
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/shipping" component={ShippingAddressScreen} />
            <Route path="/payment" component={PaymentMethodScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/orderhistory" component={OrderHistoryScreen} />
            <Route path="/search/name/:name?" component={SearchScreen} exact/>
            <Route path="/search/category/:category" component={SearchScreen} exact />
            <Route path="/search/category/:category/name/:name/pageNumber/:pageNumber" component={SearchScreen} />
            <PrivateRoute path="/profile" component={ProfileScreen} />
            <AdminRoute path="/productlist" component={ProductListScreen} exact/>
            <AdminRoute path="/productlist/pageNumber/:pageNumber" component={ProductListScreen} exact/>
            <AdminRoute path="/orderlist" component={OrderListScreen} exact />
            <AdminRoute path="/userlist" component={UserListScreen} />
            <AdminRoute path="/user/:id/edit" component={UserEditScreen} />
            <SellerRoute path="/productlist/seller" component={ProductListScreen} />
            <Route path="/" component={HomeScreen} exact />
            
          </main>
          <footer className="row center">
          Tous droits réservés
          </footer>
        </div>
    </div>
  </BrowserRouter>
  );
}

export default App;
