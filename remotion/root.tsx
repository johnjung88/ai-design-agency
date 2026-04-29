import { Composition } from "remotion";
import { BlogAutoPilotProof } from "./videos/blogautopilot-proof";

export const RemotionRoot = () => {
  return (
    <Composition
      id="BlogAutoPilotProof"
      component={BlogAutoPilotProof}
      durationInFrames={1080}
      fps={30}
      width={1280}
      height={720}
    />
  );
};
