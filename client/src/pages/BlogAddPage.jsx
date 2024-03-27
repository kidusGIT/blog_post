import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import url from "../utils/urls";
import { makePostRequest, sendGetRequest } from "../utils/fetch";
import Form from "../components/Form";
import ErrorPage from "./ErrorPage";

const BlogAddPage = () => {
  const userId = localStorage.getItem("userId");

  const form = useRef();

  const [blog, setBlog] = useState({});
  const [isOwner, setIsOwner] = useState(true);
  const [response, setResponse] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id === "new") return;

    async function getBlog() {
      const blogLink = `${url.HTTP}blog/${id}`;
      const res = await sendGetRequest(blogLink);

      if (!res.status) {
        setIsOwner(false);
        setBlog(res);
        return;
      }

      // check if the signed in user and the writer of the blog are the same
      if (res.status && userId?.toString() !== res?.blog.UserId.toString()) {
        setIsOwner(false);
        return;
      }
      setBlog(res.blog);
    }
    getBlog();
  }, [id, userId]);

  // contains array of data for the inputs that will be iterated
  const inputInfo = [
    {
      name: "title",
      type: "text",
      placeholder: "Enter blog title",
      className: "form-control",
      containerClass: "col-md-6",
      value: id === "new" ? "" : blog.title,
    },
    {
      name: "blog_image",
      type: "file",
      placeholder: "Enter blog title",
      className: "form-control",
      containerClass: "col-md-6",
    },
    {
      name: "desc",
      isTextArea: true,
      placeholder: "Enter blog description",
      className: "form-control",
      containerClass: "col-md-12",
      value: id === "new" ? "" : blog.desc,
    },
    {
      name: "UserId",
      type: "hidden",
      className: "",
      containerClass: "",
      value: userId,
    },
  ];

  // a function for updating and editing a blog
  async function createEditBlog(e) {
    e.preventDefault();
    const blogLink = id === "new" ? `${url.HTTP}blog` : `${url.HTTP}blog/${id}`;
    const method = id === "new" ? "POST" : "PUT";

    const res = await makePostRequest(blogLink, method, form.current);
    setResponse(res);
    if (res.status) {
      navigate(`/blog-show/${res?.blog?.id}`);
    }
  }

  if (blog.status !== undefined && !blog.status)
    return <ErrorPage message={blog.message} />;

  // for creating a new blog and display an empty form
  if (id.toString() === "new")
    return (
      <div className="flex-col align-center flex-gap padding ">
        <h2> Post you blogs here </h2>
        <Form
          inputInfo={inputInfo}
          callBack={createEditBlog}
          form={form}
          response={response}
          text="Post a blog"
        />
      </div>
    );

  // to edit a blog and check if the writer of the blog and the signed in user are the same
  if (isOwner)
    return (
      <div className="flex-col align-center flex-gap padding ">
        <h2> Edit "{blog.title}" here </h2>
        {blog.blog_image !== "" && (
          <img
            src={`${url.HTTP}${blog.blog_image?.replace("\\", "/")}`}
            alt="some"
            className="width-full height-max border-radius"
          />
        )}

        <Form
          inputInfo={inputInfo}
          callBack={createEditBlog}
          form={form}
          response={response}
          text="Update the blog"
        />
      </div>
    );

  // to display an alert message that the signed user can not edit the blog
  return (
    <div className="padding">
      {isOwner ? null : (
        <div className="width-full alert alert-danger" role="alert">
          Not authorized to access this page
        </div>
      )}
    </div>
  );
};

export default BlogAddPage;
