import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api/api";
import axios from "axios";

interface Dimensions {
  width?: number;
  height?: number;
  depth?: number;
}
const initialDimensions: Dimensions = {
  width: 0,
  height: 0,
  depth: 0,
};

interface individualProduct {
  title: string;
  description: string;
  id: number;
  dimensions: Dimensions;
  price: number;
  thumbnail:string
}
const initialIndividualProductState: individualProduct = {
  title: "",
  description: "",
  id: 0,
  price: 0,
  dimensions: initialDimensions,
  thumbnail:""
};
interface ApiResponse {
  products: individualProduct[];
  total: number;
  skip: number;
  limit: number;
}
export const individualProductThunk = createAsyncThunk<
  individualProduct,
  { productID: number },
  {
    rejectValue: {
      message: string;
      status: number;
    };
  }
>("/product/fetchIndividual", async ({ productID }, { rejectWithValue }) => {
  try {
    const response = await axios.get<ApiResponse>(api);
    const product = response.data.products.find(
      (item) => item.id === productID,
    );

    if (!product) {
      return rejectWithValue({
        message: "Product not found",
        status: 404,
      });
    }
    return product;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch job details",
        status: error.response?.status || 500,
      });
    }
    return rejectWithValue({
      message: "Unknown error occured",
      status: 500,
    });
  }
});

interface fetchIndividualProduct {
  isLoading: boolean;
  isSuccess: boolean;
  isFail: boolean;
  error: string | null;
  productData: individualProduct;
}
export const initialIndividualProduct: fetchIndividualProduct = {
  isLoading: false,
  isSuccess: false,
  isFail: false,
  error: null,
  productData: initialIndividualProductState,
};
export const individualProductSlice = createSlice({
  name: "individualProductSlice",
  initialState: initialIndividualProduct,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(individualProductThunk.pending, (state) => {
        state.isLoading = true;
        state.isFail = false;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(individualProductThunk.fulfilled, (state, action) => {
        state.error = null;
        state.isFail = false;
        state.isLoading=false;
        state.isSuccess = true;
        state.productData = action.payload;
      })
      .addCase(individualProductThunk.rejected, (state, action) => {
        state.isLoading = false;
        
        state.error =
          action.payload?.message || "Failed to fetch product details";
        state.isSuccess = false;
        state.isFail = true;
        state.productData = initialIndividualProductState;
      });
  },
});
export const productReducer = individualProductSlice.reducer;

export const allProductsThunk = createAsyncThunk<
  individualProduct[],
  void,
  {
    rejectValue: {
      message: string;
      status: number;
    };
  }
>("product/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<ApiResponse>(api);

    return response.data.products;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch products",
        status: error.response?.status || 500,
      });
    }

    return rejectWithValue({
      message: "Products cannot be fetched. Unknown error occurred",
      status: 500,
    });
  }
});
interface fetchProducts{
  isLoading:boolean;
  isSuccess:boolean;
  isFail:boolean;
  error:string|null;
  productData:individualProduct[]
}
const initialAllProductsState:fetchProducts={
  isLoading:false,
  isSuccess:false,
  isFail:false,
  error:null,
  productData:[]
}

export const allProductSlice = createSlice({
  name: "allProductSlice",
  initialState: initialAllProductsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allProductsThunk.pending, (state) => {
        state.isLoading = true;
        state.isFail = false;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(allProductsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isFail = false;
        state.isSuccess = true;
        state.productData = action.payload;
      })
      .addCase(allProductsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message || "Failed to fetch products";
        state.isSuccess = false;
        state.isFail = true;
        state.productData = [];
      });
  },
});

export const allProductsReducer = allProductSlice.reducer;

