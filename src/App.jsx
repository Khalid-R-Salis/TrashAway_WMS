import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./index.css";
import Index from "./pages/publicpages/index.jsx";
import About from "./pages/publicpages/about.jsx";
import Services from "./pages/publicpages/services.jsx";
import Contact from "./pages/publicpages/contact.jsx";
import Footer from "./components/Footer.jsx";

// FORMS
import Login from "./pages/forms/login.jsx";
import Signup from "./pages/forms/signup.jsx";
import ResetPassword from "./pages/forms/resetpassword.jsx";
import Terms from "./components/Terms.jsx";

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
        </Routes>
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
