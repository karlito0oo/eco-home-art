import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutNoel from './components/AboutNoel'
import FeaturedProducts from './components/FeaturedProducts'
import Products from './pages/Products'
import './styles/featured-products.css'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <AboutNoel />
              <FeaturedProducts />
            </>
          }
        />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  )
}

export default App
