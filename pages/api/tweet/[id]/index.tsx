/* 상세([id]) Tweet 조회 API */

import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../../../lib/server/withSession";
import withHandler, { ResponseType } from "../../../../lib/server/withHandler";
import db from "../../../../lib/db";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;

  const tweet = await db.tweet.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          userColor: true
        },
      },
      replys: {
        include: {
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
      },
      _count: {
        select: {
          likes: true,
          replys: true
        },
      },
    },
  });

  const isLiked = Boolean(
    await db.like.findFirst({
      where: {
        tweetId: tweet?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  res.json({ ok: true, tweet, isLiked });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);