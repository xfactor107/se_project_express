const NODE_ENV = process.env.NODE_ENV || "development";

if (!process.env.JWT_SECRET) {
  if (NODE_ENV === "production") {
    throw new Error(
      "JWT_SECRET environment variable is required in production"
    );
  }
  // eslint-disable-next-line no-console
  console.warn("JWT_SECRET is not set; using an insecure development secret");
}

// Comma-separated list of frontend origins allowed to call the API.
const ALLOWED_ORIGINS = (
  process.env.ALLOWED_ORIGINS ||
  "https://se-project-react-blue.vercel.app,http://localhost:3000"
)
  .split(",")
  .map((origin) => origin.trim());

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "dev-secret",
  NODE_ENV,
  ALLOWED_ORIGINS,
};
