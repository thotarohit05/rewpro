import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppSupport from "./components/WhatsAppSupport";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import BookService from "./pages/BookService";
import MissionVision from "./pages/MissionVision";
import About from "./pages/About";
import DealerScreen from "./components/DealerScreen";
import OurBrands from "./pages/OurBrands";
import Product from "./pages/Product";

import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import Infrastructure from "./pages/Infrastructure";
function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      {!isAdminRoute && <Header />}

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
        <Route path="/infrastructure" element={<Infrastructure type="infrastructure" />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppSupport />}
    </>
  );
}

export default App;