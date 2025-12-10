import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaCheckCircle,
  FaMoneyBillWave,
  FaUser,
  FaListAlt,
  FaBarcode,
  FaClock,
} from "react-icons/fa";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState({});

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo(res.data.paymentInfo);
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="max-w-md mx-auto mt-10 bg-base-100 shadow-xl rounded-2xl p-6 border border-base-300">
      <div className="flex items-center gap-2 mb-4">
        <FaCheckCircle className="text-green-600 text-4xl" />
        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful
        </h1>
      </div>

      <p className="text-accent-content mb-6">
        Thank you! Your payment has been processed successfully.
      </p>

      <div className="space-y-3 text-accent-content">
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2">
            <FaMoneyBillWave className="text-green-600" />
            <span className="font-semibold">Amount</span>
          </div>
          <span className="font-bold">
            ${paymentInfo?.amount} {paymentInfo?.currency}
          </span>
        </div>

        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2">
            <FaUser className="text-blue-600" />
            <span className="font-semibold">Borrower</span>
          </div>
          <span className="text-sm">{paymentInfo?.borrowerEmail}</span>
        </div>

        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2">
            <FaListAlt className="text-purple-600" />
            <span className="font-semibold">Loan Title</span>
          </div>
          <span className="text-sm">{paymentInfo?.loanTitle}</span>
        </div>

        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2">
            <FaBarcode className="text-accent-content" />
            <span className="font-semibold">Transaction ID</span>
          </div>
          <span className="font-mono text-xs">
            {paymentInfo?.transactionId}
          </span>
        </div>

        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2">
            <FaClock className="text-amber-600" />
            <span className="font-semibold">Paid At</span>
          </div>
          <span className="text-sm">
            {new Date(paymentInfo?.paidAt).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="text-center mt-6">
        <Link
          to="/dashboard/my-loans"
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          View My Loans
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
