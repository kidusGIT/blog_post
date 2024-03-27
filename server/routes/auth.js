import express from "express";
import multer from "multer";

const upload = multer();

import { signIn, createUser, getUser } from "../controllers/auth.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// registration
router.post("/sign-up", upload.any(), createUser);

// login
router.post("/sign-in", upload.any(), signIn);

// get user
router.get("/user", verifyToken, getUser);

export default router;
