import React from "react";
import Input from "./Input";

const Form = ({ inputInfo = [], response, callBack, form, text }) => {
  return (
    <form
      ref={form}
      className="row g-3 px-2 needs-validation align-center"
      action=""
    >
      {Object.entries(response).length === 0 || response?.status ? (
        <p></p>
      ) : (
        <div className="width-full alert alert-danger" role="alert">
          {response?.message}
        </div>
      )}
      {inputInfo.map((info, index) => (
        <Input
          key={index}
          value={info.value}
          type={info.type}
          name={info.name}
          placeholder={info.placeholder}
          isTextArea={info.isTextArea}
          containerClass={info.containerClass}
          className={info.className}
        />
      ))}
      <br />
      <button className="button-width btn btn-primary" onClick={callBack}>
        {text}
      </button>
    </form>
  );
};

export default Form;
