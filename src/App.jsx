import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/publicpages/Landing.jsx";
import About from "./pages/publicpages/About.jsx";
import Services from "./pages/publicpages/Services.jsx";
import Contact from "./pages/publicpages/Contact.jsx";
import Footer from "./components/Footer.jsx";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
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
