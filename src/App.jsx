/* ============================================================
   App.jsx — root of the site
   Providers -> Router -> Layout -> Routes
   ============================================================ */

import { Route, Routes } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import ScrollToTop from "./components/ScrollToTop";
import Analytics from "./components/Analytics";
import FloatingContact from "./components/FloatingContact";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Gallery from "./pages/Gallery";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Enquiry from "./pages/Enquiry";
import About from "./pages/About";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <ScrollToTop />
        <Analytics />

        <a href="#main" className="sr-only">Skip to content</a>

        <Navbar />

        <main id="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/enquiry" element={<Enquiry />} />
            <Route path="/about" element={<About />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
        <CartDrawer />
        <FloatingContact />
      </CartProvider>
    </ThemeProvider>
  );
}
