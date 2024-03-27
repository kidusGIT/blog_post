import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.token;

  if (!token)
    return res
      .status(401)
      .json({ message: "Not authenticated please login", failed: true });

  try {
    const validToken = jwt.verify(token, process.env.JWT);
    req.user = validToken;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ message: "Invalid token please login", failed: true });
  }
};
