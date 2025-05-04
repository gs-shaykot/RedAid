import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import useSecure from './../Hooks/useSecure';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CrerateForm = () => {
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSec = useSecure();
    const { user } = useContext(AuthContext);
    const [selectedAmount, setSelectedAmount] = useState(0);
    const PreFund = [10, 25, 50, 100];
    useEffect(() => {
        if (selectedAmount > 0) {
            axiosSec
                .post('/create-payment-intent', { price: selectedAmount })
                .then((res) => setClientSecret(res.data.clientSecret));
        }
    }, [axiosSec, selectedAmount]);

    const handleSelectedAmount = (amount) => {
        if (amount >= 0.5) {
            setSelectedAmount(amount);
        } else {
            alert("Minimum donation amount is $0.50");
        }
    };

    const handleCustomAmountChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value) && value >= 0.5) {
            setSelectedAmount(value);
        }
        else if (value < 0.5) {
            setError("Minimum donation amount is $0.50.");
        }
        else {
            setSelectedAmount(0);
        }

    };
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedAmount < 0.5) {
            setError("Minimum amount must be $0.50 or more.");
            return;
        }
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            },
        });

        if (confirmError) {
            setError(confirmError.message);
        } else {
            console.log('Payment Intent: ', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                const date = new Date();
                const formattedDate = date.toISOString().split('T')[0] + ' at ' + date.toISOString().split('T')[1];

                const payment = {
                    name: user.displayName,
                    email: user.email,
                    price: selectedAmount,
                    transactionId: paymentIntent.id,
                    date: formattedDate,
                };
                console.log("DONAR INFO: ", payment)
                await axiosSec.post('/makeAfunding', payment)
                    .then(res => {
                        console.log("payment saving info: ", res.data);
                        Swal.fire({
                            title: "Payment Successful",
                            text: "Thanks for being with us.",
                            icon: "success"
                        });
                        navigate('/showfunding')
                    })
                // console.log("payment saving info: ", res.data);

                // if (res.data?.insertedId) {
                //     Swal.fire({
                //         title: "Payment Successful",
                //         text: "Thanks for being with us.",
                //         icon: "success"
                //     });
                // }
            }

        }
    };

    return (
        <div className="max-w-xl mx-auto my-16 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center">Make a Donation</h2>
            <p className="text-gray-600 text-center">Your generosity makes a real difference.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Choose Amount</label>
                    <div className="grid grid-cols-4 gap-2 my-2">
                        {PreFund.map((amount) => (
                            <button
                                onClick={() => handleSelectedAmount(amount)}
                                type="button"
                                key={amount}
                                className="py-2 px-4 border rounded-md bg-gray-100 hover:bg-gray-200"
                            >
                                ${amount}
                            </button>
                        ))}
                    </div>
                    <input
                        type="number"
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter custom amount"
                        onChange={handleCustomAmountChange}
                    />
                </div>
                <div>
                    <label className="block font-medium">Payment Details</label>
                    <CardElement
                        className="p-3 border rounded-md"
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': { color: '#aab7c4' },
                                },
                                invalid: { color: '#9e2146' },
                            },
                        }}
                    />
                </div>
                <div className="text-lg font-bold">Total Amount: ${selectedAmount}</div>
                <button className="w-full bg-black text-white py-3 rounded-md" disabled={!stripe || !clientSecret}>
                    Complete Donation
                </button>
                {error && <p className="text-red-600 text-center">{error}</p>}
            </form>
        </div>
    );
};

export default CrerateForm;
