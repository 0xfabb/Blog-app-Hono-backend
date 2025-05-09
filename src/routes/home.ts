import { Hono } from "hono";
import { HomeContorl } from "../controllers/homeController";

const home = new Hono();

home.get("/", HomeContorl);

export default home;
