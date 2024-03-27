import React, { useRef, useState } from "react";

import Input from "../components/Input";
import { loginUser } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext } from "react";

const LoginPage = () => {
  const [response, setResponse] = useState({});
  const navigate = useNavigate();
  const form = useRef();

  const { setToken } = useContext(UserContext);

  // contains array of data for the inputs that will be iterated
  const inputInfo = [
    {
      type: "text",
      placeholder: "Username",
      name: "username",
      className: "form-control",
    },
    {
      type: "password",
      placeholder: "Password",
      name: "password",
      className: "form-control",
    },
  ];

  async function login(e) {
    e.preventDefault();
    const data = await loginUser(form.current);
    setResponse(data);

    if (data.status) {
      // save the toke and userId that sent by the server in local storage and to the context
      // and redirect the user to the home page
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);

      setToken(data.token);
      navigate("/");
    }
  }

  return (
    <>
      <div className="width flex-col flex-gap flex-center height-full ">
        <form
          ref={form}
          action=""
          className="border-rd height-md justify-center flex-col flex-gap padding "
        >
          {Object.entries(response).length === 0 || response?.status ? (
            <p></p>
          ) : (
            // { use for displaying an error that is send by the server
            <div className="width-full alert alert-danger" role="alert">
              {response?.message}
            </div>
          )}
          <h2> Login </h2>
          {inputInfo.map((info, index) => (
            <Input
              key={index}
              type={info.type}
              name={info.name}
              placeholder={info.placeholder}
              className={info.className}
            />
          ))}

          <button onClick={login} className="btn btn-primary">
            Login
          </button>
          <p>
            If you do not have an account?
            <Link to="/register"> Register here </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
