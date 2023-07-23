import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import TextArea from "../../components/TextArea";
import Reply from "../../components/Reply";
import useUser from "../../lib/client/useUser";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { formatDate } from "../../lib/utils";
import useMutation from "../../lib/client/useMutation";


const Detail:NextPage = () => {
  const { user, isLoading } = useUser();
  const [requiry, setRequiry] = useState(false);
  const router = useRouter();
  const { data, mutate } = useSWR(
    router.query.id ? `/api/tweet/${router.query.id}` : null
  );
  const [toggleLike] = useMutation(`/api/tweet/${router.query.id}/like`);

  useEffect(() => {
    if(requiry) {
      mutate(`/api/tweet/${router.query.id}`);
      setRequiry(false);
    }
  },[requiry]);

  const onHeartClick = () => {
    if (!data) return;
    mutate((prev: any) => prev && { ...prev, isLiked: !prev.isLiked }, false);
    toggleLike({id: data?.tweet?.id});
  };

  console.log(data);
  
  return (
    <div className="mx-auto max-w-xl">
      <div className="min-h-screen border-x-[1px] border-gray-200">
        <div className="flex items-center space-x-8 border-b-[1px] border-gray-200 p-4">
          <Link href={`/`}>
          <svg className="cursor-pointer" fill="none" width="24" height="24" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
          </svg>
          </Link>
          <div className="text-2xl font-semibold">Tweet</div>
        </div>
        {/* <!-- ============================= Tweet 내용 ============================= --> */}
        <div className="border-b-[1px] border-gray-200 px-[16px] py-[4px]">
          <div className="grid grid-cols-10 pt-[12px]">
            <div 
              className='h-[40px] w-[40px] flex text-center items-center justify-center text-lg text-white shadow-sm rounded-full shadow-sm' 
              style={{backgroundColor:`${data?.tweet?.user.userColor}`}}>
                {data?.tweet?.user.username[0]}
            </div>
            <div className="col-span-9 w-full px-2">
              <div className="flex flex-col">
                <div className="flex w-full items-center justify-between">
                  {/* <!-- 작성자 이름 --> */}
                  <div className="text-lg font-bold">{data?.tweet?.user.username}</div>
                  {/* <!-- 좋아요 버튼 --> */}
                  { !data?.isLiked ? (
                    <div onClick={onHeartClick} className="rounded-full cursor-pointer p-1 hover:bg-pink-200 hover:text-pink-800">
                      <svg fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
                      </svg>
                    </div>
                  ): (
                    <div onClick={onHeartClick} className="rounded-full cursor-pointer p-1 bg-pink-200 text-pink-800">
                      <svg fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
                      </svg>
                    </div>
                  ) }

                </div>
              </div>
            </div>
          </div>
          {/* <!-- 트윗 내용 --> */}
          <div className="w-full py-5 text-lg">{data?.tweet?.text}</div>
          {/* <!-- 게시 시간 --> */}
          <div className="text-gray-500">{formatDate(data?.tweet?.createdAt)}</div>
          {/* <!-- 댓글, 좋아요 개수 --> */}
          <div className="my-3 flex flex-row space-x-2 border-y-[1px] py-3">
            <span className="pr-3"><span className="font-bold">{data?.tweet?._count.replys}</span> Replies</span>
            <span className="pr-3"><span className="font-bold">{data?.tweet?._count.likes}</span> Likes</span>
          </div>
          {/* <!-- Reply 작성창 --> */}
          <TextArea type="reply" placehoder="Tweet your reply!" url={`/api/tweet/${router.query.id}/reply`} user={user} tweetId={data?.tweet?.id} setRequiry={setRequiry} />
        </div>
        {/* <!-- Reply 리스트 --> */}
        <div>
          {
            data?.tweet?.replys.length > 0 ?
            (
              data.tweet.replys.map((reply:any) => (
                <Reply 
                  key={reply.id}
                  userName={reply.user.username} 
                  userColor={reply.user.userColor}
                  createdAt={formatDate(reply.createdAt)}
                  text={reply.text}
                /> 
              ))
            ) : (
              <div className="flex justify-center py-32 text-gray-500">
                등록된 댓글이 없습니다.
              </div>
            )
          }
        </div>
      </div>
    </div>

  )
}

export default Detail;