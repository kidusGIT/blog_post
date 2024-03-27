import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { logoutUser } from "../utils/auth";
import { sendGetRequest } from "../utils/fetch";
import url from "../utils/urls";
import { UserContext } from "../context/userContext";

const Header = ({ setBlogs }) => {
  const form = useRef();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { token, setToken } = useContext(UserContext);

  function logout() {
    logoutUser();
    const userToken = localStorage.getItem("token");
    setToken(userToken);

    navigate("/login");
  }

  async function searchBlog(e) {
    e.preventDefault();
    const searchLink = `${url.HTTP}blog/search/blog?q=${search}`;
    const res = await sendGetRequest(searchLink);
    setBlogs(res);
  }

  return (
    <>
      <nav
        className="bg-primary navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand mx-3" to="/">
            Blogs
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
              {token != null ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="my-blogs"
                  >
                    <i className="bi bi-person-circle mx-1"></i> My Blogs
                  </Link>
                </li>
              ) : null}
              <li className="nav-item active">
                <Link className="nav-link" to="blog/new">
                  <i className="bi bi-plus-circle-fill mx-1"></i> Add blog
                </Link>
              </li>
            </ul>
            <form ref={form} className="d-flex mx-2" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={searchBlog}
                className="btn btn-outline-success"
                type="submit"
              >
                Search
              </button>
            </form>

            <ul className="navbar-nav mb-2">
              <li className="nav-item">
                {token === null ? (
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/login"
                  >
                    Login
                  </Link>
                ) : (
                  <button
                    className="nav-link active"
                    aria-current="page"
                    onClick={logout}
                  >
                    Logout
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
