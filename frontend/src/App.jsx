import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./Components/commons/NotFound";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
