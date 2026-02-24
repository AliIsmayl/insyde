import { useState } from "react";
import "./App.css";
import HomePage from "./Page/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PersonDetail from "./Page/PersonDetail/PersonDetail";
import AdminPanel from "./Page/AdminPanel/AdminPanel";
import SuperAdmin from "./Page/SuperAdmin/SuperAdmin";
import LoginPage from "./Page/LoginPage/LoginPage";

function App() {
  return (
  <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/person/5555" element={<PersonDetail />} />
          <Route path="/person/admin" element={<AdminPanel />} />
          <Route path="/superadmin" element={<SuperAdmin />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
