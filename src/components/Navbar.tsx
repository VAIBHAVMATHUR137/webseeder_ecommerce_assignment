import { Home, Heart, ShoppingCart, LayoutGrid } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { type RootState } from "../Redux/Store";

export const Navbar = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const cartCount = useSelector((state: RootState) =>
    state.cart.cartItems.reduce((n, item) => n + item.quantity, 0),
  );
  const wishlistCount = useSelector(
    (state: RootState) => state.wishlist.wishlistItems.length,
  );

  const linkClass = (path: string) =>
    `relative flex items-center gap-2 transition-colors ${
      pathname === path ? "text-white" : "text-white/70 hover:text-white"
    }`;

  return (
    <nav
      className={`flex items-center justify-between h-16 px-6 md:px-12 text-white ${
        isHome
          ? ""
          : "sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800"
      }`}
    >
      <Link
        to="/"
        className="flex items-center gap-2 text-lg font-semibold tracking-wide"
      >
        <Home size={20} />
        <span>Home</span>
      </Link>

      <div className="flex items-center gap-8 text-sm font-medium">
        <Link to="/productListing" className={linkClass("/productListing")}>
          <LayoutGrid size={18} />
          <span className="hidden sm:inline">Products</span>
        </Link>

        <Link to="/wishlist" className={linkClass("/wishlist")}>
          <Heart size={18} />
          <span className="hidden sm:inline">Wishlist</span>
          {wishlistCount > 0 && (
            <span className="min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-white text-black text-xs font-bold">
              {wishlistCount}
            </span>
          )}
        </Link>

        <Link
          to="/cart"
          className={`flex items-center gap-2 rounded-full px-4 py-1.5 backdrop-blur-md transition-colors ${
            pathname === "/cart"
              ? "bg-white/25"
              : "bg-white/15 hover:bg-white/25"
          }`}
        >
          <ShoppingCart size={18} />
          <span className="hidden sm:inline">Cart</span>
          {cartCount > 0 && (
            <span className="min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-white text-black text-xs font-bold">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;