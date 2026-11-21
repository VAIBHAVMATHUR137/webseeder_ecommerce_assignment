import hero from "../images/hero.jpg";
import { Link } from "react-router";
export const HeroSection = () => {
  return (
    <section className="relative h-full w-full overflow-hidden">
      <img
        src={hero}
        alt="Tennis racket and ball on a clay court"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* darkens the image so text stays readable */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-black/40" />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-12 md:px-12 md:pb-16">
        <h1 className="max-w-xl text-4xl font-bold leading-tight md:text-6xl">
          Game, set, match.
        </h1>
        <p className="mt-3 max-w-md text-base text-white/80 md:text-lg">
          Gear built for the court. Find your next favorite racket.
        </p>
      <Link to ="/productListing">
        <button className="mt-6 w-fit rounded-full bg-lime-300 px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-lime-200 transition-colors">
          Shop now
        </button></Link>
        
      </div>
    </section>
  );
};

export default HeroSection;