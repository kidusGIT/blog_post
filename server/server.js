import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";

const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

const app = express();

// IMPORT USER BUILT MODULE HERE
import blogRoutes from "./routes/blog.js";
import userRoutes from "./routes/auth.js";

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("*/src", express.static(__dirname + "/src"));
dotenv.config();

// ROUTES
app.use("/api/blog", blogRoutes);
app.use("/api/auth", userRoutes);

const HOST = "127.0.0.1";

app.listen(8800, HOST, () => {
  console.log(`running on server ${HOST}:8800`);
});
