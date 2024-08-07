import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Todos from "./pages/Todos";
import AuthCheck from "./components/AuthCheck";

function App() {
  return (
    <Routes>
      <Route
        path="/todos"
        element={
          <AuthCheck>
            <Todos />
          </AuthCheck>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/todos" />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
