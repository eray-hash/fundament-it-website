import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Industrie from "./pages/Industrie";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[var(--blueprint)] text-[var(--ink)] relative">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/industrie" element={<Industrie />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
