import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Index from "./pages/publicpages/index.jsx";
import About from "./pages/publicpages/about.jsx";
import Services from "./pages/publicpages/services.jsx";
import Contact from "./pages/publicpages/contact.jsx";
import Footer from "./components/Footer.jsx";
// FORMS

import Login from "./pages/forms/login.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
