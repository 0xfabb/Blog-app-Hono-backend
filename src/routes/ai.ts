import { Hono } from "hono";
import { askAIControl } from "../controllers/askAIControl";

const AI = new Hono();

AI.post("/", askAIControl);

export default AI;
