import { Hono } from "hono";
import {signupControl, loginControl } from "../controllers/authController"


const auth = new Hono();

auth.post("/", signupControl);
auth.post("/login", loginControl);



export default auth;
