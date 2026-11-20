import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

import { type AppDispatch, type RootState } from "../Redux/Store";

import {
  allProductsThunk,
  addToCart,
  decrementQuantity,
  removeFromCart,
  resetCart,
} from "../Redux/Slice";
import Navbar from "../components/Navbar";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Cart contains only product IDs
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  // Catalogue contains complete product objects
  const { productData, isLoading, isSuccess, isFail, error } = useSelector(
    (state: RootState) => state.allProducts,
  );

  // Fetch catalogue if it hasn't already been loaded
  useEffect(() => {
    if (!isSuccess && !isLoading) {
      dispatch(allProductsThunk());
    }
  }, [dispatch, isSuccess, isLoading]);

  // Resolve IDs into complete product objects
  const cartProducts = cartItems.flatMap(({ id, quantity }) => {
    const product = productData.find((item) => item.id === id);
    return product ? [{ product, quantity }] : [];
  });

  const totalPrice = cartProducts.reduce(
    (total, { product, quantity }) => total + product.price * quantity,
    0,
  );



  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        Loading your cart...
      </div>
    );
  }

  if (isFail) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center gap-4">
        <p>{error || "Unable to load products."}</p>

        <button
          onClick={() => dispatch(allProductsThunk())}
          className="bg-white text-black px-6 py-3 rounded-xl"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-neutral-950 text-white px-5 md:px-10 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">Your Cart</h1>

        {cartProducts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>

            <p className="text-neutral-400 mt-3">
              Explore our collection and add something you like.
            </p>

            <Link
              to="/productListing"
              className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-xl font-semibold"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Products */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {cartProducts.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex flex-col sm:flex-row gap-5 bg-neutral-900 border border-neutral-800 rounded-2xl p-5"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full sm:w-36 h-36 object-cover rounded-xl bg-neutral-800"
                  />

                  <div className="flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold">{product.title}</h2>

                      <p className="text-neutral-400 text-sm mt-2 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xl font-bold">
                          ${(product.price * quantity).toFixed(2)}
                        </p>
                        {quantity > 1 && (
                          <p className="text-neutral-500 text-xs">
                            ${product.price} each
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-neutral-700 rounded-lg">
                          <button
                            onClick={() =>
                              dispatch(decrementQuantity(product.id))
                            }
                            className="px-3 py-1 hover:bg-neutral-800 rounded-l-lg"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="px-3 text-sm">{quantity}</span>
                          <button
                            onClick={() => dispatch(addToCart(product.id))}
                            className="px-3 py-1 hover:bg-neutral-800 rounded-r-lg"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => dispatch(removeFromCart(product.id))}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 h-fit">
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

              <div className="flex justify-between text-neutral-400 mb-4">
                <span>Items</span>
                <span>{cartProducts.length}</span>
              </div>

              <div className="flex justify-between text-neutral-400 mb-6">
                <span>Total</span>
                <span className="text-white font-bold text-xl">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <button className="w-full bg-white text-black font-semibold py-4 rounded-xl hover:bg-neutral-300 transition">
                Checkout
              </button>

              <button
                onClick={() => dispatch(resetCart())}
                className="w-full mt-4 border border-neutral-700 py-3 rounded-xl text-neutral-400 hover:text-white transition"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Cart;
