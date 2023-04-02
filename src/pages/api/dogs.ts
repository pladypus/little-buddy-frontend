import axios, { isAxiosError } from "axios";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  try {
    const dogRes = await axios.get("https://api.api-ninjas.com/v1/dogs", {
      params: req.query,
      headers: { "X-API-Key": process.env.DOG_API_KEY },
    });

    res.status(dogRes.status).send(dogRes.data);
  } catch (error) {
    console.log(
      "🚀 ~ file: dogs.ts:19 ~ consthandler:NextApiHandler= ~ error:",
      error
    );

    if (!isAxiosError(error)) {
      res.status(500).end();
      return;
    }

    res.status(error.status ?? 500).send(error.response);
  }
};

export default handler;
