import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const getblogControl = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogid = c.req.param("id");

  const blog = await prisma.post.findFirst({
    where: {
      id: blogid,
    },
  });
  return c.json({
    blogdata: blog,
  });
};

export const addblogControl = async (c: Context) => {
  const blogData = await c.req.json();
  const blogTitle = blogData.title;
  const blogContent = blogData.content;
  const userId = c.get("userId");

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const newBlog = await prisma.post.create({
      data: {
        title: blogTitle,
        content: blogContent,
        authorId: userId,
      },
    });

    return c.json({
      id: newBlog.id,
      blogdetails: newBlog,
    });
  } catch (e) {
    c.status(400);
    c.text("Error occured at blog posting");
  }
};

export const editblogControl = async (c: Context) => {
  const blogData = await c.req.json();
  const blogTitle = blogData.title;
  const blogContent = blogData.content;
  const userId = c.get("userId");

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const newBlog = await prisma.post.update({
      where: {
        id: blogData.id,
      },
      data: {
        title: blogTitle,
        content: blogContent,
        authorId: userId,
      },
    });

    return c.json({
      id: newBlog.id,
      blogdetails: newBlog,
    });
  } catch (e) {
    c.status(400);
    c.text("Error occured at blog posting");
  }
};

export const bulkBlogsControl = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany();
    return c.json({
      message: "Found Blogs",
      blogsData: blogs,
    });
  } catch (e) {
    c.status(400);
    return c.text("Something went Wrong or NO blogs Found");
  }
};
