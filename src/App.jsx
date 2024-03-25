import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Register, Navbar, Footer } from "./pages/index.js";

function App() {
  const excludedRoutes = ["/login", "/register"];

  return (
    <BrowserRouter>
      {!excludedRoutes.includes(window.location.pathname) && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
      {!excludedRoutes.includes(window.location.pathname) && <Footer />}
    </BrowserRouter>
  );
}

export default App;
