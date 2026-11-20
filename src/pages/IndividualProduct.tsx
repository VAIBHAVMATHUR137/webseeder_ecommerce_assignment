
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import {
  type AppDispatch,
  type RootState,
} from "../Redux/Store";

import { individualProductThunk } from "../Redux/Slice";

const IndividualProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const productState = useSelector(
    (state: RootState) => state.individualProduct
  );

  useEffect(() => {
    if (id) {
      dispatch(
        individualProductThunk({
          productID: Number(id),
        })
      );
    }
  }, [id, dispatch]);

  const { productData: product, isLoading, isFail, error } = productState;

  if (isLoading) {
    return <h2>Loading product...</h2>;
  }

  if (isFail) {
    return <h2>{error || "Unable to fetch product"}</h2>;
  }
console.log(productState.productData)
  return (
    <div>
      <h1>{product.title}</h1>

      <p>{product.description}</p>
      <p>Price: ${product.price}</p>

      <h3>Dimensions</h3>
      <p>Width: {product.dimensions.width}</p>
      <p>Height: {product.dimensions.height}</p>
      <p>Depth: {product.dimensions.depth}</p>
    </div>
  );
};

export default IndividualProduct;
