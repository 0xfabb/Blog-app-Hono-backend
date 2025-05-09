import { Hono, Context } from "hono";
import { addblogControl, editblogControl, getblogControl, bulkBlogsControl } from "../controllers/blogController";
import { verify } from "hono/jwt";

const blog = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blog.use("*", async (c: Context, next) => {
  const secret = c.env.JWT_SECRET;
  const authHeader = c.req.header("Authorization") || "";

  try {
    const token = authHeader.replace("Bearer ", "").trim();
    const user = await verify(token, secret);

    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      return c.json({ message: "You are not logged in" }, 403);
    }
  } catch (err) {
    return c.json({ message: "Invalid or missing token" }, 403);
  }
});

blog.post("/", addblogControl);
blog.get("/get/:id", getblogControl);
blog.put("/", editblogControl);
blog.get("/bulk", bulkBlogsControl)


export default blog;
