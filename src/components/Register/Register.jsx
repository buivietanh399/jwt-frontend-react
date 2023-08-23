import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Register.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidUsername: true,
    isValidPassword: true,
  };

  const [objCheckValid, setObjCheckValid] = useState(defaultValidInput);

  let history = useHistory();
  const handleLogin = () => {
    history.push("/login");
  };

  useEffect(() => {
    // axios.get("http://localhost:8080/api/v1/test-api").then((data) => {
    //   console.log("check data axios:", data);
    // });

    axios.post("http://localhost:8080/api/v1/register", {
      email,
      phone,
      username,
      password,
    });
  }, []);

  const isValidInputs = () => {
    setObjCheckValid(defaultValidInput);

    let filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!email) {
      toast.error("Email required");
      setObjCheckValid({ ...defaultValidInput, isValidEmail: false });
      return false;
    }

    if (!filter.test(email)) {
      toast.error(`Invalid email ${email}`);
      setObjCheckValid({ ...defaultValidInput, isValidEmail: false });
      return false;
    }

    if (!phone) {
      toast.error("Phone required");
      setObjCheckValid({ ...defaultValidInput, isValidPhone: false });
      return false;
    }

    if (!username) {
      toast.error("Username required");
      setObjCheckValid({ ...defaultValidInput, isValidUsername: false });
      return false;
    }

    if (!password) {
      toast.error("Password required");
      setObjCheckValid({ ...defaultValidInput, isValidPassword: false });
      return false;
    }

    if (password != confirmPassword) {
      toast.error("Incorect re-password");
      setObjCheckValid(false);

      return false;
    }

    return true;
  };

  const handleRegister = () => {
    let check = isValidInputs();
    if (check) {
      toast.success("Success!!");
    }
    let userData = { email, phone, username, password, confirmPassword };
    console.log(">>> check userdata: ", userData);
  };

  return (
    <div className="register-container mt-3">
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

            <div className="form-group">
              <label htmlFor="">Email:</label>
              <input
                type="text"
                className={
                  objCheckValid.isValidEmail
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="">Phone number:</label>
              <input
                type="text"
                className={
                  objCheckValid.isValidPhone
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Phone number"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="">Username:</label>
              <input
                type="text"
                className={
                  objCheckValid.isValidUsername
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="">Password:</label>
              <input
                type="password"
                className={
                  objCheckValid.isValidPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="">Re-enter password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
              />
            </div>

            <button
              className="btn btn-primary"
              type="submit"
              onClick={() => {
                handleRegister();
              }}
            >
              Register
            </button>
            <hr />

            <div className="text-center">
              <button className="btn btn-success" onClick={() => handleLogin()}>
                Already've an account. Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
