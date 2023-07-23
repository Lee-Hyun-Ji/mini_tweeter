import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import TwitterIcon from "../components/TwitterIcon";
import TextArea from "../components/TextArea";
import Tweet from "../components/Tweet";
import useUser from "../lib/client/useUser";
import useSWR from "swr";
import { formatDate } from "../lib/utils";

const Home:NextPage = () => {
  const { user, isLoading } = useUser();
  const [requiry, setRequiry] = useState(false);
  const { data, mutate } = useSWR("/api/tweet");

  useEffect(() => {
    if(requiry) {
      mutate("/api/tweet");
      setRequiry(false);
    }
  },[requiry])
  
  return (
    <div className="mx-auto max-w-xl">
      <div className="min-h-screen border-x-[1px] border-gray-200">
        <div className="flex items-center justify-center border-b-[1px] border-gray-200 p-4">
          <TwitterIcon size="32" />
        </div>
        {/* <!-- Tweet 작성창 --> */}
        <div className="border-b-[1px]">
          <TextArea type="tweet" placehoder="What is happening?" url="/api/tweet" user={user} setRequiry={setRequiry}/>
        </div>
        {/* <!-- 게시글 리스트 --> */}
        <div>
          {
            data?.tweetList?.length > 1 ?
            (
              data?.tweetList.map((tweet:any) => (
                <Tweet
                  key={tweet.id}
                  id={tweet.id}
                  userName={tweet.user.username}
                  userColor={tweet.user.userColor}
                  createdAt={formatDate(tweet.createdAt)}
                  text={tweet.text}
                  replyCnt={tweet._count.replys}
                  likeCnt={tweet._count.likes}
                />
              ))
            ) : (
              <div className="flex justify-center py-32 text-gray-500">
                게시된 Tweet이 없습니다.
              </div>
            )
          }
        </div>
      </div>
    </div>

  )
}

export default Home;