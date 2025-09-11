import { TypeAnimation } from "react-type-animation";

const TypingTextEffect = ({ text }: any) => {
   return <TypeAnimation sequence={[text]} wrapper="span" speed={50} className="typing-text" />;
};
export default TypingTextEffect;
