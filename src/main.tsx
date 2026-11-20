import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./Redux/Store";

import App from "./App";
import Cart from "./pages/Cart";
import ErrorPage from "./pages/Error";
import WishList from "./pages/Wishlist";
import ProductListing from "./pages/productListing";
import IndividualProduct from "./pages/IndividualProduct";

import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cart",
    element: <Cart />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/wishlist",
    element: <WishList />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/productListing",
    element: <ProductListing />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/product/:id",
    element: <IndividualProduct />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
