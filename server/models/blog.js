import { DataTypes } from "sequelize";

// import user module here
import sequelize from "../database.js";
import User from "./user.js";

const Blog = sequelize.define("Blog", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT,
    defaultValue: "",
  },
  blog_image: {
    type: DataTypes.STRING(3000),
    defaultValue: "",
  },
});

Blog.belongsTo(User);

const blog = async () => {
  await Blog.sync();
};

blog();
export default Blog;
