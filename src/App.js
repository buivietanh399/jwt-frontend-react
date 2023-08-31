import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./components/Navigation/Nav";
import { useEffect, useState } from "react";

import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Router>
        <div className="app-header">
          <Nav />
        </div>

        <div className="app-container">
          <AppRoutes />
        </div>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
export default App;
