const NODE_ENV = process.env.NODE_ENV || "development";

if (!process.env.JWT_SECRET) {
  if (NODE_ENV === "production") {
    throw new Error("JWT_SECRET environment variable is required in production");
  }
  // eslint-disable-next-line no-console
  console.warn("JWT_SECRET is not set; using an insecure development secret");
}

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "dev-secret",
  NODE_ENV,
};
