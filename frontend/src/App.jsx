import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import BrandProducts from "./pages/BrandProducts";
import CategoryProducts from "../src/pages/CategoryProducts";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brand/:slug" element={<BrandProducts />} />
        <Route path="/category/:slug" element={<CategoryProducts />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </MainLayout>
  );
}