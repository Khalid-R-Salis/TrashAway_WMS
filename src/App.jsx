import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./pages/publicpages/index";
// import About from "./pages/publicpages/about";
import Services from "./pages/publicpages/services";
import Contact from "./pages/publicpages/contact";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Index />} />
            {/* <Route path="/about" element={<About />} /> */}
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
