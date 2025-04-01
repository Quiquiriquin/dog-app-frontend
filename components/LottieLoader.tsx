import LottieView from "lottie-react-native";

const LottieLoader = () => {
  return (
    <LottieView
      autoPlay
      loop
      style={{ width: 100, height: 100 }}
      source={require("../assets/lottie/loaderLottie.json")}
    />
  );
};

export default LottieLoader;
