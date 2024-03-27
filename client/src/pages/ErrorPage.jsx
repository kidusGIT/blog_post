import React from "react";

const ErrorPage = ({ message }) => {
  return (
    <div className="">
      <div className="width-full alert alert-danger my-3" role="alert">
        {message}
      </div>
    </div>
  );
};

export default ErrorPage;
