import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import SocialLinks from "./pages/SocialLinks";
import Profile from "./pages/Profile";
import DealerLayout from "./layouts/DealerLayout";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route element={<DealerLayout/>}>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/gallery" element={<Gallery/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/social" element={<SocialLinks/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
