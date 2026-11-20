import { Home, Heart, ShoppingCart } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-16 px-6 md:px-12 text-white">
      <div className="flex items-center gap-2 text-lg font-semibold tracking-wide cursor-pointer">
        <Home size={20} />
        <span>Home</span>
      </div>

      <div className="flex items-center gap-8 text-sm font-medium">
        <span className="flex items-center gap-2 cursor-pointer text-white/80 hover:text-white transition-colors">
          <Heart size={18} />
          <span className="hidden sm:inline">Wishlist</span>
        </span>
        <span className="flex items-center gap-2 cursor-pointer rounded-full bg-white/15 px-4 py-1.5 backdrop-blur-md hover:bg-white/25 transition-colors">
          <ShoppingCart size={18} />
          <span className="hidden sm:inline">Cart</span>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;