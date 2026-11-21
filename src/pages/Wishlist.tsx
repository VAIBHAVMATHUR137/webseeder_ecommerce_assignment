import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

import { type AppDispatch, type RootState } from "../Redux/Store";

import {
  allProductsThunk,
  removeFromWishlist,
  resetWishlist,
  addToCart,
} from "../Redux/Slice";
import Navbar from "../components/Navbar";

const Wishlist = () => {
  const dispatch = useDispatch<AppDispatch>();

  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.wishlistItems
  );
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const { productData, isLoading, isSuccess, isFail, error } = useSelector(
    (state: RootState) => state.allProducts
  );

  useEffect(() => {
    if (!isSuccess && !isLoading) {
      dispatch(allProductsThunk());
    }
  }, [dispatch, isSuccess, isLoading]);

  const wishlistProducts = wishlistItems.flatMap((id) => {
    const product = productData.find((item) => item.id === id);
    return product ? [product] : [];
  });

  if (isLoading || (!isSuccess && !isFail)) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
          Loading your wishlist...
        </div>
      </>
    );
  }

  if (isFail) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center gap-4">
          <p>{error || "Unable to load wishlist products."}</p>

          <button
            onClick={() => dispatch(allProductsThunk())}
            className="bg-white text-black px-6 py-3 rounded-xl"
          >
            Retry
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-neutral-950 text-white px-5 md:px-10 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-3">
                Saved Collection
              </p>

              <h1 className="text-4xl font-bold">My Wishlist</h1>
            </div>

            {wishlistProducts.length > 0 && (
              <button
                onClick={() => dispatch(resetWishlist())}
                className="text-sm text-red-400 hover:text-red-300"
              >
                Clear Wishlist
              </button>
            )}
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>

              <p className="text-neutral-400 mt-3">
                Save your favourite products to find them here.
              </p>

              <Link
                to="/productListing"
                className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-xl font-semibold"
              >
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistProducts.map((product) => {
                const quantityInCart =
                  cartItems.find((item) => item.id === product.id)?.quantity ??
                  0;

                return (
<Link to={`/product/${product.id}`}>
                  <div
                    key={product.id}
                    className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-600 transition"
                  >
                    <div className="h-64 bg-neutral-800 overflow-hidden">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>

                    <div className="p-5 flex flex-col gap-4">
                      <div>
                        <h2 className="text-lg font-semibold">
                          {product.title}
                        </h2>

                        <p className="text-sm text-neutral-400 mt-2 line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      <p className="text-xl font-bold">${product.price}</p>

                      <Link
                        to={`/product/${product.id}`}
                        className="text-center bg-white text-black font-semibold py-3 rounded-xl hover:bg-neutral-300 transition"
                      >
                        View Product
                      </Link>

                      <div className="flex gap-3">
                        <button
                          onClick={() => dispatch(addToCart(product.id))}
                          className="flex-1 border border-neutral-700 py-3 rounded-xl text-sm hover:bg-neutral-800 transition"
                        >
                          {quantityInCart > 0
                            ? `Add to Cart (${quantityInCart})`
                            : "Add to Cart"}
                        </button>

                        <button
                          onClick={() =>
                            dispatch(removeFromWishlist(product.id))
                          }
                          className="flex-1 text-red-400 border border-neutral-700 py-3 rounded-xl text-sm hover:bg-neutral-800 transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
