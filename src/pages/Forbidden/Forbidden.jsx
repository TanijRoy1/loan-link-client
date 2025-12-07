import React from "react";
import forbiddedAnimationData from "../../assets/json/forbidden.json";
import Lottie from "react-lottie";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-[90vh] flex items-center justify-center py-8">
      <div>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: forbiddedAnimationData,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={300}
          width={300}
          isStopped={false}
          isPaused={false}
        />
        <h1 className="text-2xl font-bold text-red-500 mt-4">
          You Are Forbidden to Access This Page
        </h1>
        <p>Please contact the administrator if you believe this is an error</p>
        <div className="flex items-center gap-5 justify-center mt-5">
          <Link to={`/`} className="btn btn-primary">
            Go to Home
          </Link>
          <Link
            to={`/dashboard`}
            className="btn btn-secondary"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;