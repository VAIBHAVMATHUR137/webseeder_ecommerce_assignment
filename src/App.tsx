import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import { type AppDispatch, type RootState } from "./Redux/Store";
import { allProductsThunk, individualProductThunk } from "./Redux/Slice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const allProducts=useSelector((state:RootState)=>state.allProducts.productData)
  useEffect(() => {
    dispatch(allProductsThunk()).unwrap()
  }, [dispatch]);
  async function handleAPI() {
    console.log(allProducts)
  }
  return (
    <div className="flex flex-col h-screen w-full bg-neutral-950 text-white">
      <main className="relative flex-1 min-h-0">
        <header className="absolute inset-x-0 top-0 z-20">
          <Navbar />
        </header>
        <HeroSection />
        <button onClick={() => handleAPI()}>HandleAPI</button>
      </main>
      <Footer />
    </div>
  );
}

export default App;
