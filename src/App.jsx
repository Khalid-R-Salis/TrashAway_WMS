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

// client Pages
import Dashboard from "./pages/clientpages/dashbord";
import Orders from "./pages/clientpages/orders";
import Collection from "./pages/clientpages/collection";
import Support from "./pages/clientpages/support";
import Settings from "./pages/clientpages/settings";
import Referral from "./pages/clientpages/referral";

// Admin Pages
import AdminDashboard from "./pages/adminpages/adminDashboard";
import Adminsettings from "./pages/adminpages/adminsettings";
import Scheduling from "./pages/adminpages/scheduling";
import Staffs from "./pages/adminpages/staffs";
import AdminSupport from "./pages/adminpages/support";
import UserManagement from "./pages/adminpages/userManagement";
import VehicleTracking from "./pages/adminpages/vehicleTracking";
import WasteManagment from "./pages/adminpages/wasteManagment";

// Staff Pages
import StaffDashboard from "./pages/staffpages/staffdashbord";
import StaffOrders from "./pages/staffpages/stafforders";
import StaffSupport from "./pages/staffpages/staffsupport";
import StaffSettings from "./pages/staffpages/staffsettings";
import StaffReferral from "./pages/staffpages/staffreferral";
import StaffVehicleTracking from "./pages/staffpages/staffvehicleTracking";

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

          {/* ------------------------------------------- */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/support" element={<Support />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/referral" element={<Referral />} />

          {/* ------------------------------------------------ */}
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/adminsettings" element={<Adminsettings />} />
          <Route path="/scheduling" element={<Scheduling />} />
          <Route path="/staffs" element={<Staffs />} />
          <Route path="/adminsupport" element={<AdminSupport />} />
          <Route path="/usermanagment" element={<UserManagement />} />
          <Route path="/vehicletracking" element={<VehicleTracking />} />
          <Route path="/wastemanagment" element={<WasteManagment />} />

          {/* ------------------------------------------- */}
          <Route path="/staffdashboard" element={<StaffDashboard />} />
          <Route path="/stafforders" element={<StaffOrders />} />
          <Route path="/staffsupport" element={<StaffSupport />} />
          <Route path="/staffsettings" element={<StaffSettings />} />
          <Route path="/staffreferral" element={<StaffReferral />} />
          <Route
            path="/StaffVehicleTracking"
            element={<StaffVehicleTracking />}
          />
        </Routes>
        {/* ------------------------------------------------ */}
        {location.pathname !== "/login" &&
          location.pathname !== "/singup" &&
          location.pathname !== "/reset" &&
          location.pathname !== "/dashboard" &&
          location.pathname !== "/orders" &&
          location.pathname !== "/collection" &&
          location.pathname !== "/support" &&
          location.pathname !== "/settings" &&
          location.pathname !== "/referral" &&
          location.pathname !== "/ourterms" &&
          location.pathname !== "/settings" &&
          location.pathname !== "/admindashboard" &&
          location.pathname !== "/adminsettings" &&
          location.pathname !== "/scheduling" &&
          location.pathname !== "/staffs" &&
          location.pathname !== "/adminsupport" &&
          location.pathname !== "/usermanagment" &&
          location.pathname !== "/vehicletracking" &&
          location.pathname !== "/wastemanagment" &&
          location.pathname !== "/staffdashboard" &&
          location.pathname !== "/stafforders" &&
          location.pathname !== "/staffsupport" &&
          location.pathname !== "/staffsettings" &&
          location.pathname !== "/staffreferral" &&
          location.pathname !== "/StaffVehicleTracking" && <Footer />}
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
