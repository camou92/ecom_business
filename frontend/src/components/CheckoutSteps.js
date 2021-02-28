import React from 'react';

const CheckoutSteps = (props) => {
    return (
        <div className="row checkout-steps">
            <div className={props.step1 ? 'active': ''}> connecter</div>
            <div className={props.step2 ? 'active': ''}> Expédition</div>
            <div className={props.step3 ? 'active': ''}> Paiement</div>
            <div className={props.step4 ? 'active': ''}> Valider</div>
        </div>
    );
};

export default CheckoutSteps;