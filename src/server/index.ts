import { Hono } from "hono";
// import { accessAuth } from "@server/middleware/auth";

const app = new Hono().basePath("/api");

// app.use(accessAuth).get("/health", (c) => c.json("Healthy! 🔥"));
app.get("/health", (c) => c.json("Healthy! 🔥"));

export default app;
