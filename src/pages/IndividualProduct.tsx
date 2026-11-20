import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";

import { type AppDispatch, type RootState } from "../Redux/Store";

import { addToCart, individualProductThunk } from "../Redux/Slice";
import Navbar from "../components/Navbar";

const IndividualProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const {
    productData: product,
    isLoading,
    isFail,
    error,
  } = useSelector((state: RootState) => state.individualProduct);
  console.log(cart);
  useEffect(() => {
    if (id) {
      dispatch(
        individualProductThunk({
          productID: Number(id),
        }),
      );
    }
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <p className="text-neutral-400 text-lg animate-pulse">
          Loading product details...
        </p>
      </div>
    );
  }

  if (isFail) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center gap-5 px-5">
        <h2 className="text-3xl font-semibold">Product Not Found</h2>

        <p className="text-neutral-400 text-center">
          {error || "Unable to load product details."}
        </p>

        <Link
          to="/productListing"
          className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-neutral-300 transition"
        >
          Back to Products
        </Link>
      </div>
    );
  }
  const quantityInCart =
    cart.find((item) => item.id === product.id)?.quantity ?? 0;
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-neutral-950 text-white px-5 md:px-10 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Back Navigation */}
          <Link
            to="/productListing"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition mb-10"
          >
            <span>←</span>
            Back to All Products
          </Link>

          {/* Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Product Image */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden">
              <div className="aspect-square">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-contain p-8"
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="flex flex-col gap-7">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-4">
                  Sports Collection
                </p>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {product.title}
                </h1>

                <p className="text-neutral-400 leading-7 mt-5">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="border-y border-neutral-800 py-6">
                <p className="text-sm text-neutral-500 mb-2">Price</p>

                <h2 className="text-4xl font-bold">${product.price}</h2>
              </div>

              {/* Product Dimensions */}
              <div>
                <h3 className="text-xl font-semibold mb-5">
                  Product Dimensions
                </h3>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                    <p className="text-sm text-neutral-500">Width</p>
                    <p className="text-xl font-semibold mt-2">
                      {product.dimensions.width ?? "N/A"}
                    </p>
                  </div>

                  <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                    <p className="text-sm text-neutral-500">Height</p>
                    <p className="text-xl font-semibold mt-2">
                      {product.dimensions.height ?? "N/A"}
                    </p>
                  </div>

                  <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                    <p className="text-sm text-neutral-500">Depth</p>
                    <p className="text-xl font-semibold mt-2">
                      {product.dimensions.depth ?? "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="flex-1 text-center bg-white text-black font-semibold py-4 rounded-xl hover:bg-neutral-300 transition cursor-pointer"
                  onClick={() => dispatch(addToCart(product.id))}
                >
                  {quantityInCart > 0
                    ? `Add to Cart (${quantityInCart} in cart)`
                    : "Add to Cart"}
                </button>

                <button className="flex-1 text-center border border-neutral-600 text-white font-semibold py-4 rounded-xl hover:bg-neutral-800 transition cursor-pointer">
                  ♡ Wishlist
                </button>
              </div>

              {/* Back to Catalogue */}
              <Link
                to="/productListing"
                className="w-full text-center bg-white text-black font-semibold py-4 rounded-xl hover:bg-neutral-300 transition"
              >
                Continue Exploring
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndividualProduct;
