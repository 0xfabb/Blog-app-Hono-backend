import { Context } from "hono";

export const HomeContorl = async (c: Context) => {
  return c.text("Welcome to the Homepage");
};
