import { Player } from "@lottiefiles/react-lottie-player";
import loadingAnimation from "./loading.json";

export const Loading = () => {
  return (
    <Player
      autoplay
      loop
      style={{ height: "100%", width: 200 }}
      src={loadingAnimation}
    />
  );
};
