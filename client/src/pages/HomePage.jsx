import React, { useEffect } from "react";

import url from "../utils/urls";
import { sendGetRequest } from "../utils/fetch";
import Card from "../components/Card";

const HomePage = ({ blogs, setBlogs }) => {
  const blogLink = `${url.HTTP}blog`;
  useEffect(() => {
    async function getMyBlogs() {
      const res = await sendGetRequest(blogLink);
      setBlogs(res);
    }
    getMyBlogs();
  }, [blogLink, setBlogs]);

  return (
    <div className="flex-col flex-gap">
      <h3 className="p-2"> Blogs </h3>
      <div className="width-full grid padding">
        {blogs.length === 0 && (
          <div
            className="alert width-full alert-warning alert-dismissible fade show"
            role="alert"
          >
            No blogs uploaded or no blog found with the title matching the
            search text.
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

export default HomePage;
