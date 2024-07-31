import { TypeAnimation } from "react-type-animation";

const TypingTextEffect = ({ text }: any) => {
   return (
      <TypeAnimation
         sequence={[
            // Same substring at the start will only be typed out once, initially
            text,
         ]}
         wrapper="span"
         speed={50}
         style={{ fontSize: "25px", display: "inline-block" }}
      />
   );
};
export default TypingTextEffect;
