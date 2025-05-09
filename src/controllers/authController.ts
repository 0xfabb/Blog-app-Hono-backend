import { PrismaClient } from "@prisma/client/edge";
import { Context } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";

export const signupControl = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
 
  const body = await c.req.json();

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    const secret = c.env.JWT_SECRET;
    const token: String = await sign({ id: user.id }, secret);
    return c.json({
      messgae: "Account Created succesfully and here is the generated token - ",
      jwt: token,
    });
  } catch (error) {
    c.status(411);
    return c.text("Account already exists, please log in");
  }
};

export const loginControl = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  const secret = c.env.JWT_SECRET;
  const token = await sign({ id: user.id }, secret);
  return c.json({
    message: "You are logged in",
    token: token,
  });
};
