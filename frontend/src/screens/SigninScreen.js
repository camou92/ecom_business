import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const SigninScreen = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const redirect = props.location.search ? props.location.search.split('=')[1]:'/';

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(signin(email, password));
    };
    useEffect(() =>{
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Se connecter</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Entrer email" required onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" placeholder="Entrer password" required onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Se connecter</button>
                </div>
                <div>
                    <label />
                    <div>
                        New compte? <Link to={`/register?redirect=${redirect}`}>Créer votre compte</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SigninScreen;