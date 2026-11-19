import "./App.css";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex flex-col bg-gray-100 w-full h-screen justify-between">
      <div className="flex flex-col gap-y-5 h-5/6">
        <div className="h-1/6 shrink-0 bg-blue-600">
          <Navbar />
        </div>
      
        <div className="flex-1 min-h-0 bg-pink-400">
          <HeroSection />
        </div>
      </div>

      <div className="h-1/6 bg-green-300">
        <Footer />
      </div>
    </div>
  );
}

export default App;