import { useState } from "react";
import useMutation from "../lib/client/useMutation";
import { useForm } from "react-hook-form";

interface paramTypes {
  text: string;
  user: number;
  image?: string;
  tweet?: number;
}


interface TextAreaProps {
    type: "tweet" | "reply";
    placehoder: string;
    user: any;
    url: string;
    tweetId?: number
    setRequiry: (requiry: boolean) => void;
    }
    
    export default function TextArea({
        type,
        placehoder,
        user,
        url,
        tweetId,
        setRequiry,
    }:TextAreaProps) {
        const [rows, setRows] = useState(0);
        const [value, setValue] = useState("");
        const [post] = useMutation(url);
        
        const {
          register,
          handleSubmit
        } = useForm();

        const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
          setValue(event.target.value);
          const textareaLineHeight = 32;
          const previousRows = event.target.rows;
          event.target.rows = 1; 
          const currentRows = Math.ceil(event.target.scrollHeight / textareaLineHeight);
          event.target.rows = currentRows;
          setRows(currentRows);

          if (previousRows !== currentRows) {
            setRows(currentRows);
          }
        };

        const onValid = (data: any) => {     
          let params:paramTypes ={user: user.id, text: data.text};
          if(type === "reply") {
            params.tweet = tweetId;
          }      
          post(params);
          setRequiry(true);
          setValue("");
        };
        const onInvalid = (errors: any) => {
          alert(errors.text.message)
        };
        
      return (
        <div className="border-gray-200 px-[16px] py-[4px]">
        <form onSubmit={handleSubmit(onValid, onInvalid)} className="grid grid-cols-10 pt-[12px]">
          <div 
            className='h-[40px] w-[40px] flex text-center items-center justify-center text-lg text-white shadow-sm rounded-full shadow-sm' 
            style={{backgroundColor:`${user?.userColor}`}}>
              {user?.username[0]}
          </div>
          <textarea 
            placeholder={placehoder}
            className="col-span-9 w-full resize-none border-0 bg-transparent px-2 py-1 text-xl focus:outline-none" 
            rows={rows}
            maxLength={250}
            value={value}
            onInput={handleInput}
            {...register("text", {
              required:true,
              minLength: {
                value: 5,
                message: "5자 이상 입력하세요."
              }
            })}
          ></textarea>
          <div className="col-span-10 my-3 flex flex-row items-center justify-end space-x-3">
            {/* {type === "tweet" ?
            (
                <>
                <label className="cursor-pointer rounded-full p-2 active:bg-sky-100">
                <svg fill="none" className="h-7 w-7" stroke="#1d9bf0" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
                </svg>
                <input 
                  className="hidden" 
                  type="file" 
                  {...register("image")}
                  accept="image/*"
                />
              </label>
              </>
            ): null
            } */}
            <button 
              className="transform rounded-full bg-sky-500 px-4 py-2 text-lg font-semibold text-white transition-transform duration-300 hover:bg-sky-600 active:scale-95">
                { type ==="tweet" ? "Tweet" : ""}
                { type ==="reply" ? "Reply" : ""}
            </button>
          </div>
        </form>
      </div>
      )};