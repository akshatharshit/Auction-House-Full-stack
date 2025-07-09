import React from "react";
import Lottie from "react-lottie";
import animationData from "../../src/assets/Animation - 1732307750976.json";

const Work = () => {
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
export default Work;