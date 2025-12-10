import React from "react";
import { Link } from "react-router";
import { FaTimesCircle, FaRedoAlt, FaEnvelope } from "react-icons/fa";

const PaymentCancelled = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-transparent">
      <div className="max-w-xl w-full bg-base-100 border border-base-300 shadow-md rounded-2xl lg:p-8 p-6">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <FaTimesCircle className="text-red-600 text-5xl" />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-accent-content mb-2">
              Payment Cancelled
            </h1>
            <p className="text-sm sm:text-base text-accent-content/80">
              Your payment was not completed. No charges were made. You can try
              again or contact support if you think this is an error.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <Link
            to="/dashboard/my-loans"
            className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-focus transition"
            aria-label="Try payment again"
          >
            <FaRedoAlt />
            Try Again
          </Link>

          <div className="flex flex-col items-start sm:items-end gap-2">
            <p className="text-xs text-accent-content/80">
              Need help? Contact support:
            </p>
            <a
              href={`support@example.com"`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-base-300 text-accent-content hover:bg-base-200 transition"
              aria-label="Contact support"
            >
              <FaEnvelope />
              <span className="text-sm truncate">support@example.com</span>
            </a>
          </div>
        </div>

        <div className="mt-6 text-sm text-accent-content/70">
          <p>
            Tip: If the issue persists, try using a different payment method or
            checking your bank’s authentication (OTP) flow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
