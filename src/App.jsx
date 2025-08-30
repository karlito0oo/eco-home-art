import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProducts";
import Testimonials from "./components/Testimonials";
import Articles from "./components/Articles";
import ArticleDetails from "./pages/ArticleDetails";
import AboutNoel from "./components/AboutNoel";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import "./styles/featured-products.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <div className="flex flex-col min-h-screen">
              <AdminDashboard />
            </div>
          }
        />
        <Route
          path="*"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <Hero />
                        <AboutNoel />
                        <FeaturedProducts />
                        <Articles />
                        <Testimonials />
                      </>
                    }
                  />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id/:slug" element={<ProductDetails />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/articles/:id" element={<ArticleDetails />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
