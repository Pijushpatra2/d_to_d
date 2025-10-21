// import jwt from "jsonwebtoken";

// export const generateToken = (payload) => {
//   return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
// };

// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ success: false, message: "Access denied. No token provided." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // can be admin, business, etc.
//     next();
//   } catch (error) {
//     return res.status(403).json({ success: false, message: "Invalid or expired token" });
//   }
// };


import jwt from "jsonwebtoken";

// --------------------
// Generate token
// --------------------
export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// --------------------
// Authenticate Middleware
// --------------------
export const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // e.g. { id, role }
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

// --------------------
// Authorize Admin Middleware
// --------------------
export const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Forbidden: Admins only" });
  }
  next();
};
