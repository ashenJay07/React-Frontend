import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "pages/Home";
import Welcome from "pages/melody-generator/Welcome";
import UploadFile from "pages/melody-generator/UploadFile";
import SelectModel from "pages/melody-generator/SelectModel";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Welcome />} />
        <Route path="/melody-generate/welcome" element={<Welcome />} />
        <Route path="/melody-generate/upload" element={<UploadFile />} />
        <Route path="/melody-generate/select-model" element={<SelectModel />} />
      </Routes>
    </Router>
  );
}

export default App;
