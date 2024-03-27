// function for making get request only and return the fetched value
export const sendGetRequest = async (url) => {
  const token = window.localStorage.getItem("token");

  const response = await fetch(url, {
    headers: {
      token: token,
    },
  });
  const res = await response.json();

  return res;
};

// function for making delete, post, and put request and return the fetched value
export const makePostRequest = async (url, methods, formData) => {
  const token = window.localStorage.getItem("token");

  if (methods === "DELETE") {
    const response = await fetch(url, {
      method: methods,
      headers: {
        token: `${token}`,
      },
    });
    const res = await response.json();
    return res;
  }
  const response = await fetch(url, {
    method: methods,
    headers: {
      token: `${token}`,
    },
    body: new FormData(formData),
  });
  const res = await response.json();
  return res;
};
