import React from "react";
import pageNotFoundAnimationData from "../../assets/json/PageNotFound.json";
import Lottie from "react-lottie";
import { Link } from "react-router";

const PageNotFound = () => {
  return (
    <div className="min-h-[90vh] flex items-center justify-center py-8">
      <div>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: pageNotFoundAnimationData,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={300}
          width={400}
          isStopped={false}
          isPaused={false}
        />
        <div className="max-w-lg mx-auto text-center">
            <h1 className="text-2xl font-bold text-red-500 mt-4">
          You are not allowed to access this page
        </h1>
        <p className="text-accent-content">It looks like the page you tried to reach is restricted or doesn’t
exist. If you think this is a mistake, contact your administrator
or use one of the options below.</p>
        </div>
        <div className="flex items-center gap-5 justify-center mt-5">
          <Link to={`/`} className="btn btn-primary">
            Go to Home
          </Link>
          <Link to={`/dashboard`} className="btn btn-secondary">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
