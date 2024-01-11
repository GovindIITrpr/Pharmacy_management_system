import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./Components/Context/UserContext";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Authentication from "./Components/Authentication/Authentication"; // Fix import
import Employees from "./Components/Pages/Employees";
import Admin from "./Components/Pages/Admin";

function App() {
  return (
    <Router>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Authentication />} />{" "}
          <Route path="/admin" element={<Admin />} />
          <Route path="/employee" element={<Employees />} />{" "}
        </Routes>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
