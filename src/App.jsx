import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Public_Pages/Landing.jsx";
import About from "./pages/Public_Pages/About.jsx";
import Services from "./pages/Public_Pages/Services.jsx";
import Contact from "./pages/Public_Pages/Contact.jsx";
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
