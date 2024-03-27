// IMPORT HERE
import url from "./urls";

// REGISTER USER
export const registerUser = async (data) => {
  const response = await fetch(`${url.HTTP}auth/sign-up`, {
    method: "POST",
    body: new FormData(data),
  });

  const res = await response.json();
  return res;
};

// LOGIN USER
export const loginUser = async (data) => {
  const response = await fetch(`${url.HTTP}auth/sign-in`, {
    method: "POST",
    body: new FormData(data),
  });

  const res = await response.json();
  return res;
};

// LOGOUT
export const logoutUser = () => {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("userId");

  return false;
};
