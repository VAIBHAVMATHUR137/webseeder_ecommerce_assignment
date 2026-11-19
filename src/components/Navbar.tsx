export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-16 px-6 md:px-12 text-white">
      <div className="text-lg font-semibold tracking-wide cursor-pointer">
        Home
      </div>
      <div className="flex items-center gap-8 text-sm font-medium">
        <span className="cursor-pointer text-white/80 hover:text-white transition-colors">
          Wishlist
        </span>
        <span className="cursor-pointer rounded-full bg-white/15 px-4 py-1.5 backdrop-blur-md hover:bg-white/25 transition-colors">
          Cart
        </span>
      </div>
    </nav>
  );
};

export default Navbar;