import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const RegisterScreen = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const redirect = props.location.search ? props.location.search.split('=')[1]:'/';

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Password and confirm password are not match');
        }else{
            dispatch(register(name, email, password));
        }
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
                    <h1>Créer votre compte</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Nom</label>
                    <input type="text" id="name" placeholder="Entrer name" required onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Entrer email" required onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Mot de Passe</label>
                    <input type="password" id="password" placeholder="Entrer password" required onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirmer Votre Mot de passe</label>
                    <input type="password" id="confirmPassword" placeholder="Entrer conform password" required onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Valider</button>
                </div>
                <div>
                    <label />
                    <div>
                        Vous avez déja un compte? <Link to={`/signin?redirect=${redirect}`}>Connectez-vous</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegisterScreen;