/* 사용자 권한 확인 API */

import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import { withApiSession } from "../../../lib/server/withSession";
import withHandler from "../../../lib/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const profile = await db.user.findUnique({
    where: { id: req.session.user?.id },
  });

  res.json({
    ok: true,
    profile,
  });
}

export default withApiSession(
    withHandler({
      methods: ["GET"],
      handler,
    })
  );