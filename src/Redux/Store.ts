import { configureStore } from "@reduxjs/toolkit";
import {
  allProductsReducer,
  productReducer,
  cartReducer,
  wishlistReducer,
} from "./Slice";

const savedCart = localStorage.getItem("cart");
const savedWishlist = localStorage.getItem("wishlist");

export const store = configureStore({
  reducer: {
    individualProduct: productReducer,
    allProducts: allProductsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  preloadedState: {
    cart: savedCart ? JSON.parse(savedCart) : undefined,
    wishlist: savedWishlist ? JSON.parse(savedWishlist) : undefined,
  },
});

store.subscribe(() => {
  const { cart, wishlist } = store.getState();
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;