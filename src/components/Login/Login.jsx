import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import "./Login.scss";
import { loginUser } from "../../services/userService";

const Login = (props) => {
  let history = useHistory();

  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");

  const defaultObjValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };
  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleCreateAccount = () => {
    history.push("/register");
  };

  const handleLogin = async () => {
    setObjValidInput(defaultObjValidInput);
    if (!valueLogin) {
      toast.error("Please enter your email address or phone");
      setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });
      return;
    }

    if (!password) {
      toast.error("Please enter your password");
      setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
      return;
    }

    let responseLogin = await loginUser(valueLogin, password);
    responseLogin = responseLogin.data;
    // console.log(responseLogin);
    if (+responseLogin.EC === 0) {
      let data = {
        isAuthenticated: true,
        token: "fake token",
      };
      sessionStorage.setItem("account", JSON.stringify(data));
      toast.success(responseLogin.EM);
      history.push("/users");
      window.location.reload();
    } else {
      toast.error(responseLogin.EM);
    }
  };

  const handlePressEnter = (event) => {
    if (event.charCode === 13 && event.code === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      history.push("/");
      window.location.reload();
    }
  }, []);

  return (
    <div className="login-container mt-3">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">Hoi Dan IT</div>

            <div className="detail">
              Hoi Dan IT helps you connect and share with the people in your
              life.
            </div>
          </div>
          <div className="content-right green col-sm-5 col-12 d-flex flex-column gap-3 py-3 ">
            <div className="brand d-sm-none">Hoi dan IT</div>
            <input
              type="text"
              className={
                objValidInput.isValidValueLogin
                  ? "form-control"
                  : "form-control is-invalid"
              }
              placeholder="Email address or your phone number"
              value={valueLogin}
              onChange={(event) => setValueLogin(event.target.value)}
            />
            <input
              type="password"
              className={
                objValidInput.isValidPassword
                  ? "form-control"
                  : "form-control is-invalid"
              }
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onKeyPress={(event) => handlePressEnter(event)}
            />
            <button className="btn btn-primary" onClick={() => handleLogin()}>
              Login
            </button>
            <span className="text-center ">
              <a className="forgot-password" href="#">
                Forgot your password?
              </a>
            </span>
            <hr />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => handleCreateAccount()}
              >
                Create new acount
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
