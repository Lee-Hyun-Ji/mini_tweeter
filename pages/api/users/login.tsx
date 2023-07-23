import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../../lib/server/withHandler";
import db from "../../../lib/db";
import { withApiSession } from "../../../lib/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {email, password} = req.body;
  console.log(email, password);
  const user = await db.user.findUnique({
    where: {
      email
    }
  });
  if (!user) {
    return res.status(404).json({isSuccess: false, msg: "존재하지 않는 계정입니다."});
  }
  if(user.password !== password) {
    return res.status(405).json({isSuccess: false, msg: "잘못된 비밀번호입니다."});
  }

  req.session.user = {
    id: user.id
  };
  await req.session?.save();
  return res.status(200).json({isSuccess: true, msg: "로그인 성공"});
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
    isPrivate: false,
  })
);