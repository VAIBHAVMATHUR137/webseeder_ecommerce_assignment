import hero from "../images/hero.jpg";

export const HeroSection = () => {
  return (
    <img
      src={hero}
      alt="Tennis racket and ball on a clay court"
      className="w-full h-full object-cover"
    />
  );
};

export default HeroSection;