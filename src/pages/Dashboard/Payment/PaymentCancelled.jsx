import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            <h1 className='text-3xl font-bold text-accent'>Payment is cancelled. Please try again.</h1>
            <Link to={`/dashboard/my-loans`} className='btn btn-primary'>Try Again</Link>
        </div>
    );
};

export default PaymentCancelled;