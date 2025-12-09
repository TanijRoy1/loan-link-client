import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/LoadingSpinner';


const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
        //   console.log(res.data);
          setPaymentInfo(res.data.paymentInfo);
          setLoading(false);
        });
    }
  }, [sessionId, axiosSecure]);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
    return (
        <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        
        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful
        </h1>
      </div>

      <p className="text-gray-600 mb-6">
        Thank you! Your payment was completed successfully.
      </p>

      <div className="space-y-3 text-gray-700">
        <div className="flex justify-between border-b pb-2">
          
          <span className="font-semibold">
            ${paymentInfo.amount} {paymentInfo.currency}
          </span>
        </div>

        <div className="flex justify-between border-b pb-2">
          
          <span>{paymentInfo.borrowerEmail}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          
          <span>{paymentInfo.loanTitle}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          
          <span className="font-mono text-sm">{paymentInfo.transactionId}</span>
        </div>

    

        <div className="flex justify-between border-b pb-2">
          
          <span>{new Date(paymentInfo.paidAt).toLocaleString()}</span>
        </div>
      </div>

      <div className="text-center mt-6">
        <Link
          to="/dashboard/my-loans"
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          View My loans
        </Link>
      </div>
    </div>
    );
};

export default PaymentSuccess;