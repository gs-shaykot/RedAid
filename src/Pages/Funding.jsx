import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CrerateForm from './CrerateForm';

const stripePromise = loadStripe(import.meta.env.VITE_PK)
const Funding = () => {
    return (
        <div>
            <Elements stripe={stripePromise}>
        	    <CrerateForm></CrerateForm>
            </Elements>
        </div>
    );
};

export default Funding;