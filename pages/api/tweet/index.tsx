/* 전체 Tweet 조회 API */

import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../lib/server/withHandler";
import db from "../../../lib/db";
import { withApiSession } from "../../../lib/server/withSession";


async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const tweetList = await db.tweet.findMany({
      include: {
        _count: {
          select: {
            likes: true,
            replys: true
          },
        },
        user: {
          select: {
            username: true,
            userColor: true
          }
        }
      },
      orderBy: {
        createdAt: "desc" 
      }
    });
    res.json({
      ok: true,
      tweetList,
    });
  }
  if (req.method === "POST") {
    const {
      body: { text, image },
      session: { user },
    } = req;
    const tweet = await db.tweet.create({
      data: {
        text,
        image,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      tweet,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);