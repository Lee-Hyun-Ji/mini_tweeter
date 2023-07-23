import Link from "next/link";

interface TweetProps {
    id: number;
    userName: string;
    userColor: string;
    createdAt: string;
    text: string;
    replyCnt: number;
    likeCnt: number;
}
    
export default function Tweet({
    id,
    userName,
    userColor,
    createdAt,
    text,
    replyCnt,
    likeCnt
}: TweetProps) {
  return (
    <Link href={`/tweet/${id}`}>
    <div className="cursor-pointer border-b-[1px] border-gray-200 px-[16px] py-[4px] hover:bg-gray-100">
    <div className="grid grid-cols-10 pt-[12px]">
      <div 
        className='h-[40px] w-[40px] flex text-center items-center justify-center text-lg text-white shadow-sm rounded-full shadow-sm' 
        style={{backgroundColor:`${userColor}`}}>
          {userName[0]}
      </div>
      <div className="col-span-9 w-full px-2">
        <div className="flex flex-col">
          <div className="mb-2 flex w-full items-center justify-between">
            {/* <!-- 작성자 이름/작성일 --> */}
            <div className="text-lg font-bold">{userName}</div>
            <div className="text-sm">{createdAt}</div>
          </div>
          {/* <!-- 트윗 내용 --> */}
          <div className="w-full">{text}</div>
          {/* <!-- 댓글, 좋아요 개수 --> */}
          <div className="my-3 flex flex-row space-x-2 text-gray-500">
            <svg fill="none" className="h-6 w-6" stroke="#808080" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"></path>
            </svg>
            <span className="pr-3">{replyCnt}</span>
            <svg fill="none" className="h-6 w-6" stroke="#808080" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
            </svg>
            <span className="pr-3">{likeCnt}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  </Link>
  )};