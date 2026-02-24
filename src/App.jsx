import { useState } from "react";
import "./App.css";
import HomePage from "./Page/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PersonDetail from "./Page/PersonDetail/PersonDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/person/5555" element={<PersonDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
