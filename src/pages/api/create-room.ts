import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await fetch("https://api.huddle01.com/api/v1/create-room", {
    method: "POST",
    body: JSON.stringify({
      title: "PeerCode Meet",
    }),
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "Lgiukg7CvVMxgdlMRUnOGoWqzRmBv85i",
    },
  });
  const json = await data.json();
  res.status(200).json(json);
}
