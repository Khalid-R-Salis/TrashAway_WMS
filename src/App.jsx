import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Public Pages/landing.jsx";
import About from "./pages/Public Pages/about.jsx";
import Services from "./pages/Public Pages/services.jsx";
import Contact from "./pages/Public Pages/contact.jsx";
import Footer from "./components/footer.jsx";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="contact" element={<Contact />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
