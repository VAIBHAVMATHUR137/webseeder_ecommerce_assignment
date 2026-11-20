
import "./App.css";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";


function App() {

  return (
    <div className="flex flex-col h-screen w-full bg-neutral-950 text-white">
      <main className="relative flex-1 min-h-0">
        <header className="absolute inset-x-0 top-0 z-20">
          <Navbar />
        </header>
        <HeroSection />
       
      </main>
      <Footer />
    </div>
  );
}

export default App;
