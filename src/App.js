import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/Login/Login";
import Nav from "./components/Navigation/Nav";
import Register from "./components/Register/Register";

function App() {
  return (
    <Router>
      {/* <Nav /> */}
      <div className="app-container">
        <Switch>
          <Route path="/" exact>
            Home
          </Route>
          <Route path="/news">News</Route>
          <Route path="/contact">Contact</Route>
          <Route path="/about">About</Route>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/register">
            <Register />
          </Route>
        </Switch>
        {/* <Route path="*">404 not found</Route> */}
      </div>
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
    </Router>
  );
}

export default App;
