import { Context } from "hono";
import axios from "axios";

export const askAIControl = async (c: Context) => {
  const Data = await c.req.json();
  const prompt = Data.Question;
  console.log("Received Question - ", prompt);
  const geminiUrl = c.env.geminiUrl;

  const response = await axios.post(
    geminiUrl,
    {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are FabAI, an expert in blogging and SEO. You write long, human-friendly, engaging, viral, and SEO-optimized blog posts. Now, here is the user's prompt: ${prompt}`,
            },
          ],
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response) {
    console.log("Did not Recieve AI Response");
  }

  const responsedata = response.data;

  return c.json(responsedata);
};
