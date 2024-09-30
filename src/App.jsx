import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Public Pages/landing.jsx";
import Footer from "./components/footer.jsx";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Landing />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
