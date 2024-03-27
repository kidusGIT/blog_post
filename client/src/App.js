import { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

// IMPORT INFO HERE
import "./App.css";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Footer from "./components/Footer";
import BlogAddPage from "./pages/BlogAddPage";
import BlogShowPage from "./pages/BlogShowPage";
import HomePage from "./pages/HomePage";
import MyBlogs from "./pages/MyBlogs";
import url from "./utils/urls";
import { sendGetRequest } from "./utils/fetch";
import ErrorPage from "./pages/ErrorPage";
import { UserContext } from "./context/userContext";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({});

  const { token, setToken } = useContext(UserContext);

  useEffect(() => {
    function setTokenStatus() {
      let userToken = localStorage.getItem("token");
      if (userToken === null || userToken === "") userToken = null;

      setToken(userToken);
    }

    setTokenStatus();
  }, [setToken]);

  useEffect(() => {
    async function verifyToken() {
      const link = `${url.HTTP}auth/user`;
      const res = await sendGetRequest(link);
      setUser(res);
    }
    verifyToken();
  }, []);

  return (
    <>
      <div className="App width-fill flex-col height-all">
        <Header setBlogs={setBlogs} />
        <div className="width-fill align-center flex-col flex-1">
          <div className="width-lg flex flex-1">
            <Routes>
              <Route
                path="/"
                element={<HomePage blogs={blogs} setBlogs={setBlogs} />}
              />
              <Route
                path="/blog/:id"
                element={
                  token == null || user.failed ? (
                    <Navigate to={user.failed ? "/error" : "/login"} replace />
                  ) : (
                    <BlogAddPage />
                  )
                }
              />
              <Route
                path="/my-blogs"
                element={
                  token == null || user.failed ? (
                    <Navigate to={user.failed ? "/error" : "/login"} replace />
                  ) : (
                    <MyBlogs />
                  )
                }
              />
              <Route path="/blog-show/:id" element={<BlogShowPage />} />
              <Route
                path="/login"
                element={
                  token != null ? <Navigate to="/" replace /> : <LoginPage />
                }
              />
              <Route
                path="/register"
                element={
                  token != null ? <Navigate to="/" replace /> : <RegisterPage />
                }
              />
              <Route
                path="/error"
                element={
                  <ErrorPage message={user.failed ? user.message : ""} />
                }
              />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
