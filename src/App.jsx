// Key import
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./index.css";

// landing import
import Index from "./pages/publicpages/index";
import About from "./pages/publicpages/about";
import Services from "./pages/publicpages/services";
import Contact from "./pages/publicpages/contact";

// FORMS Import
import Login from "./pages/forms/login";
import Signup from "./pages/forms/signup";
import ResetPassword from "./pages/forms/resetpassword";
import Terms from "./components/Terms";

// Onside Pages
import LoginHome from "./pages/onsidepages/index";
import LoginAbout from "./pages/onsidepages/about";
import LoginServices from "./pages/onsidepages/services";
import LoginContact from "./pages/onsidepages/contact";

// Footer Inport
import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <div className="content">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<Signup />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/ourterms" element={<Terms />} />
          {/* ------------------------------------------- */}
          <Route path="/loginhome" element={<LoginHome />} />
          <Route path="/loginabout" element={<LoginAbout />} />
          <Route path="/loginservices" element={<LoginServices />} />
          <Route path="/logincontact" element={<LoginContact />} />
        </Routes>
        {/* ------------------------------------------------ */}
        {location.pathname !== "/login" &&
          location.pathname !== "/singup" &&
          location.pathname !== "/reset" &&
          location.pathname !== "/ourterms" && <Footer />}
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
