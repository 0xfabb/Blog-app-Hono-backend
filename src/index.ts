import { Hono } from "hono";
import homeRoutes from "./routes/home";
import askAiRoute from "./routes/ai";
import blogRoutes from "./routes/blog";
import authRoutes from "./routes/auth";

const app = new Hono();









app.get("/", (c) => {
  return c.text("This is Landing Page");
});
app.route("/home", homeRoutes);
app.route("/ask-ai", askAiRoute);
app.route("/blog", blogRoutes);
app.route("/blog", blogRoutes);
app.route("/blog", blogRoutes);
app.route("/api/signup", authRoutes);
app.route("/api", authRoutes)

export default app;
