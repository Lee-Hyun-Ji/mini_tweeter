/* Reply 생성 API */

import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../../lib/server/withHandler";
import db from "../../../../lib/db";
import { withApiSession } from "../../../../lib/server/withSession";


async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
    const {
      body: { text, tweet },
      session: { user },
    } = req;

    const reply = await db.reply.create({
      data: {
        text,
        user: {
          connect: {
            id: user?.id,
          },
        },
        tweet: {
            connect: {
                id:tweet
            }
        }
      },
    });
    res.json({
      ok: true,
      reply,
    });

}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);