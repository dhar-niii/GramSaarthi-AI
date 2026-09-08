import app from "../server/server.cjs";

// Vercel serverless entry point.
// Keep the existing Express application in server/server.cjs so the
// local and production API use the same implementation.
export default app;
