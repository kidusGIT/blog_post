import React, { useEffect, useState } from "react";

import { sendGetRequest } from "../utils/fetch";
import url from "../utils/urls";
import Card from "../components/Card";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({});

  const blogLink = `${url.HTTP}blog/blogs/my-blogs`;
  useEffect(() => {
    async function getUser() {
      const link = `${url.HTTP}auth/user`;
      const res = await sendGetRequest(link);
      setUser(res.user);
    }
    getUser();

    async function getMyBlogs() {
      const res = await sendGetRequest(blogLink);
      setBlogs(res);
    }
    getMyBlogs();
  }, [blogLink]);

  return (
    <div className="flex-col flex-gap">
      <h3 className="p-2"> {user?.full_name}'s blogs </h3>
      <div className="width-full grid padding">
        {blogs?.length === 0 && (
          <div
            className="alert width-full alert-warning alert-dismissible fade show"
            role="alert"
          >
            Yo do not upload any blogs
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}
        {blogs.map((blog) => (
          <Card
            key={blog.id}
            title={blog.title}
            id={blog.id}
            image={blog.blog_image}
            desc={blog.desc}
          />
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;
