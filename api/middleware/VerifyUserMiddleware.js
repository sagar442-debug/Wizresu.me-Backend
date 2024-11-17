const { clerk } = require("@clerk/clerk-sdk-node");

const verifyUserMiddleware = async (req, res, next) => {
  const sessionToken = req.header["authorization"]?.split(" ")[1];
  const clerkIdFromFrontend = req.headers["clerkId"] || req.query.clerkId;
  if (!sessionToken) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    const user = await clerk.verifySession(sessionToken);

    if (user.id !== clerkIdFromFrontend) {
      return res.status(403).json({ message: "Unauthorized: Invalid request" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error verifying session:", error);
    return res
      .status(401)
      .json({ message: "Invalid or expired session token" });
  }
};

module.exports = verifyUserMiddleware;
