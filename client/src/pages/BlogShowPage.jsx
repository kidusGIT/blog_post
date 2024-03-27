import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { makePostRequest, sendGetRequest } from "../utils/fetch";
import url from "../utils/urls";
import ErrorPage from "./ErrorPage";

const BlogShowPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({});
  const [status, setStatus] = useState({});

  const userId = localStorage.getItem("userId");
  const blogLink = `${url.HTTP}blog/${id}`;

  useEffect(() => {
    async function getBlog() {
      const res = await sendGetRequest(blogLink);
      setBlog(res.blog);
      setStatus(res);
    }
    getBlog();
  }, [blogLink]);

  const getDate = (date) => {
    const createDate = new Date(date).toDateString();
    return createDate;
  };

  if (!status.status)
    return (
      <div className="p-3">
        <ErrorPage message={status.message} />
      </div>
    );

  // a function for deleting a blog
  async function deleteBlog() {
    const blogLink = `${url.HTTP}blog/${id}`;
    const method = "DELETE";

    const res = await makePostRequest(blogLink, method, "");

    if (res.status) {
      navigate(`/my-blogs`);
    }
  }

  return (
    <div className="flex-col flex-gap padding ">
      <h1> {blog.title} </h1>
      <span className="flex-gap flex-gap">
        <div
          style={{ fontSize: 30, fontWeight: "bold" }}
          className="height-full"
        >
          {blog.User?.full_name}
        </div>
        <div className=""> {getDate(blog.createdAt)} </div>
      </span>

      {blog?.UserId?.toString() === userId?.toString() ? (
        // check if the signed user and the blog writer are the same to delete and edit blog
        <span className="flex-row flex-gap">
          <button className="btn btn-danger" onClick={deleteBlog}>
            <i className="bi bi-trash3-fill"></i> Delete
          </button>
          <Link to={`/blog/${blog.id}`} className="btn btn-warning">
            <i className="bi bi-pencil-fill"></i> Edit
          </Link>
        </span>
      ) : null}
      {blog.blog_image !== "" && (
        <img
          src={`${url.HTTP}${blog.blog_image?.replace("\\", "/")}`}
          alt="some"
          className="width-full height-max border-radius"
        />
      )}
      <p> {blog.desc} </p>
    </div>
  );
};

export default BlogShowPage;
