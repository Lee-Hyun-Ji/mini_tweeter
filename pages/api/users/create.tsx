/* 새로운 사용자 생성 API */

import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../../lib/server/withHandler";
import db from "../../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, email, password, userColor } = req.body;

  const user = await db.user.findFirst({
    where: {
      OR: [
        { username },
        { email },
      ],
    },
  });

  if (user) {
    if(user.username === username) return res.status(400).json({isSuccess: false, msg: "이미 존재하는 사용자 이름입니다."});
    if(user.email === email) return res.status(400).json({isSuccess: false, msg: "이미 존재하는 이메일 주소입니다."});
  }
  
  await db.user.create({
    data: {
        username,
        email,
        password,
        userColor
    }
  });
  return res.status(201).json({isSuccess: true, msg: "신규 계정 생성 완료"});
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });