import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import SocialLinks from "./pages/SocialLinks";
import Profile from "./pages/Profile";
import DealerLayout from "./layouts/DealerLayout";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProtectedRoute from "./routes/ProtectedRoute";
import Onboarding from "./pages/Onboarding";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* -------------------- NO LAYOUT PAGES -------------------- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* -------------------- PROTECTED + LAYOUT PAGES -------------------- */}
        <Route
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <DealerLayout />
              </>
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/services" element={<Services />} />
          <Route path="/social" element={<SocialLinks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
