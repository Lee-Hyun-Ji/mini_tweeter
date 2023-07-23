/* Tweet 게시글 좋아요 API */

import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../../lib/server/withHandler";
import db from "../../../../lib/db";
import { withApiSession } from "../../../../lib/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { id },
    session: { user },
  } = req;

  const alreadyLiked = await db.like.findFirst({
    where: {
        tweetId: +id,
        userId: user?.id,
    },
  });

  if (alreadyLiked) {
    await db.like.delete({
      where: {
        id: alreadyLiked.id,
      },
    });
  } else {
    await db.like.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        tweet: {
          connect: {
            id: +id,
          },
        },
      },
    });
  }
  res.json({ ok: true });
}

export default withApiSession(
    withHandler({
      methods: ["POST"],
      handler,
    })
  );