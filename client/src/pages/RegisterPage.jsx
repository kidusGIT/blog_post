import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../components/Input";
import { registerUser } from "../utils/auth";

const RegisterPage = () => {
  const [response, setResponse] = useState({});
  const navigate = useNavigate();
  const form = useRef();

  // contains array of data for the inputs that will be iterated
  const inputInfo = [
    {
      type: "text",
      placeholder: "Full name",
      name: "full_name",
      className: "form-control",
    },
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

  async function register(e) {
    e.preventDefault();
    const data = await registerUser(form.current);
    setResponse(data);

    if (data.status) {
      navigate("/login");
    }
  }

  return (
    <>
      <div className="width flex-col flex-gap flex-center height-full ">
        <form
          ref={form}
          action=""
          className="border-rd form-width flex-col justify-center height-md flex-gap padding "
        >
          {/* use for displaying an error that is send by the server */}
          {Object.entries(response).length === 0 || response?.status ? (
            <p></p>
          ) : (
            <div className="width-full alert alert-danger" role="alert">
              {response?.message}
            </div>
          )}
          <h2> Sign Up </h2>
          {inputInfo.map((info, index) => (
            <Input
              key={index}
              type={info.type}
              name={info.name}
              placeholder={info.placeholder}
              className={info.className}
            />
          ))}

          <button onClick={register} className="btn btn-primary">
            {" "}
            Sign up{" "}
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
