import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Sweets from "./pages/Sweets";
import Admin from "./pages/Admin";
import ProtectedAdmin from "./components/ProtectedAdmin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/sweets" element={<Sweets />} />

      <Route
        path="/admin"
        element={
          <ProtectedAdmin>
            <Admin />
          </ProtectedAdmin>
        }
      />
    </Routes>
  );
}

export default App;
