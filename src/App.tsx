import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import { type AppDispatch, type RootState } from "./Redux/Store";
import { individualProductThunk } from "./Redux/Slice";

function App() {
  const dispatch=useDispatch<AppDispatch>();
  const productState=useSelector((state:RootState)=>state.individualProduct)
  async function handleAPI(){
    const trigger=await dispatch(individualProductThunk({productID:138})).unwrap()
    console.log(trigger)
    const res=productState.productData;
    console.log(res)

  }
  return (
    <div className="flex flex-col h-screen w-full bg-neutral-950 text-white">
      <main className="relative flex-1 min-h-0">
        <header className="absolute inset-x-0 top-0 z-20">
          <Navbar />
        </header>
        <HeroSection />
        <button onClick={()=>handleAPI()}>HandleAPI</button>
      </main>
      <Footer />
    </div>
  );
}

export default App;