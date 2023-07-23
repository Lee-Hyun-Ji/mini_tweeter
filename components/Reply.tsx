interface ReplyProps {
    userName: string;
    userColor: string;
    createdAt: string;
    text: string;
}

export default function Reply({
    userName,
    userColor,
    createdAt,
    text
}: ReplyProps) {
  return (
    <div className="border-b-[1px] border-gray-100 p-[16px]">
    <div className="grid grid-cols-10">
    <div 
        className='h-[40px] w-[40px] flex text-center items-center justify-center text-lg text-white shadow-sm rounded-full shadow-sm' 
        style={{backgroundColor:`${userColor}`}}>
          {userName[0]}
      </div>
      <div className="col-span-9 w-full px-2">
        <div className="flex flex-col">
          <div className="mb-2 flex w-full items-center justify-between">
            {/* <!-- 작성자 이름 --> */}
            <div className="text-lg font-bold">{userName}</div>
            <div className="text-sm">{createdAt}</div>
          </div>
          {/* <!-- Reply 내용 --> */}
          <div className="w-full">{text}</div>
        </div>
      </div>
    </div>
  </div>
  )};