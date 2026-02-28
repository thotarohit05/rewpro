import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import BookService from "./pages/BookService";
import MissionVision from "./pages/MissionVision";
import About from "./pages/About";
import DealerScreen from "./components/DealerScreen";
import OurBrands from "./pages/OurBrands";
import Product from "./pages/Product";
import Footer from "./components/Footer";
import WhatsAppSupport from "./components/WhatsAppSupport";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/book-service" element={<BookService />} />
        <Route path="/product" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/our-brands" element={<OurBrands />} />
        <Route path="/mission-vision" element={<MissionVision />} />
        <Route path="/become-dealer" element={<DealerScreen type="dealer" />} />
        <Route path="/become-distributor" element={<DealerScreen type="distributor" />} />
      </Routes>
      <Footer />
      <WhatsAppSupport /> 
    </>
  );
}

export default App;