import React from "react";
import Lottie from "react-lottie";
import animationData from "../../src/assets/Animation - 1732316442240.json";

const MyAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} />;
};
export default MyAnimation;