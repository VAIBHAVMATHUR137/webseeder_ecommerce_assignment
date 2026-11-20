import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./Slice";
export const store=configureStore({
    reducer:{
        individualProduct:productReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;