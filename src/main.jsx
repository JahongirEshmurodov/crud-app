import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './pages/layout'
import Footer from './pages/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './pages/Home';
import Products from './pages/Products';
import { BrowserRouter, Route, Routes } from 'react-router-dom';




function App() {
  return (
  
     <>
   <BrowserRouter>
   <Navbar />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/products' element={<Products/>} />
    </Routes>

     <Footer />
   </BrowserRouter>
     </>
    
  )
};


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
