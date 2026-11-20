import { configureStore } from "@reduxjs/toolkit";
import { allProductsReducer, productReducer } from "./Slice";
export const store=configureStore({
    reducer:{
        individualProduct:productReducer,
        allProducts:allProductsReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;