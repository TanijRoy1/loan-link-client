import React from "react";
import loadingAnimationData from "../assets/json/paymentLoading.json";
import Lottie from "react-lottie";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-10">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: loadingAnimationData,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        height={200}
        width={200}
        isStopped={false}
        isPaused={false}
      />
    </div>
  );
};

export default LoadingSpinner;
