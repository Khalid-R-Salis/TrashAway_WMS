import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Footer from "./components/footer.jsx";
import Landing from "./pages/Public Pages/landing.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Landing />
    <Footer />
  </StrictMode>
);
