import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

import { type AppDispatch, type RootState } from "../Redux/Store";

import { allProductsThunk } from "../Redux/Slice";
import Navbar from "../components/Navbar";

const ProductListing = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { productData, isLoading, isFail, error } = useSelector(
    (state: RootState) => state.allProducts,
  );

  useEffect(() => {
    dispatch(allProductsThunk());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(allProductsThunk());
  };
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <p className="text-lg text-neutral-400 animate-pulse">
          Loading products...
        </p>
      </div>
    );
  }
  // Edge case
  if (isFail) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-semibold">Something went wrong</h2>

        <p className="text-neutral-400">
          {error || "Unable to fetch products"}
        </p>

        <button
          onClick={handleRetry}
          className="px-6 py-2 rounded-lg bg-white text-black font-medium hover:bg-neutral-300 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (productData.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <h2 className="text-xl text-neutral-400">No products available.</h2>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-neutral-950 text-white px-5 md:px-10 py-12">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-3">
          Explore Collection
        </p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Sports Accessories
            </h1>

            <p className="text-neutral-400 mt-3">
              Find the right gear for your next performance.
            </p>
          </div>
        </div>
      </div>

      {/* Products Listing */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
        {productData.map((product) => (
          <Link to={`/product/${product.id}`}>
            <div
              key={product.id}
              className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-600 transition duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="h-64 bg-neutral-800 overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Details */}
              <div className="p-5 flex flex-col gap-3">
                <div>
                  <h2 className="text-lg font-semibold line-clamp-1">
                    {product.title}
                  </h2>

                  <p className="text-sm text-neutral-400 mt-2 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-xl font-bold">${product.price}</span>
                </div>

                {/* View individual Product */}
                <Link
                  to={`/product/${product.id}`}
                  className="w-full text-center bg-white text-black font-semibold py-3 rounded-xl hover:bg-neutral-300 transition"
                >
                  View Product
                </Link>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
};

export default ProductListing;
