import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Industrie from "./pages/Industrie";
import NotFound from "./pages/NotFound";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import Entwurf from "./entwurf/Entwurf";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function Site() {
  const { pathname } = useLocation();
  // Der Design-Entwurf bringt eigene Kopf- und Fußzeile mit.
  if (pathname.startsWith("/entwurf")) return <Entwurf />;
  return (
    <div className="min-h-screen bg-[var(--blueprint)] text-[var(--ink)] relative">
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/industrie" element={<Industrie />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Site />
    </BrowserRouter>
  );
}

export default App;
