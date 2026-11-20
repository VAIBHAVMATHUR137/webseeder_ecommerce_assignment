import { configureStore } from "@reduxjs/toolkit";
import {
  allProductsReducer,
  productReducer,
  cartReducer,
  wishlistReducer,
} from "./Slice";

export const store = configureStore({
  reducer: {
    individualProduct: productReducer,
    allProducts: allProductsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;