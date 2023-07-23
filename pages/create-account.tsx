import { NextPage } from "next";
import React, { useEffect } from "react";
import TwitterIcon from "../components/TwitterIcon";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import useMutation from "../lib/client/useMutation";
import { useRouter } from "next/router";
import { getRandomHexColor } from "../lib/utils";

const CreateAccount:NextPage = () => {
  const router = useRouter();
  const [createUser, {loading, data, error}] = useMutation("/api/users/create");
  
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({
        mode: "onChange"
      });

      const onValid = (data: any) => {   
        data.userColor = getRandomHexColor();     
        createUser(data);
      };
      const onInvalid = (errors: any) => {
        console.log(errors);
      };
      
      useEffect(() => {
        if(data?.isSuccess) {
          alert("[계정 생성 완료]!\n생성한 계정으로 로그인해주세요.");
          router.push('/log-in');
        }
        else if(data?.msg !== undefined ) alert(data?.msg);
    },[data]);

  return (
    <div className="mx-auto max-w-xl">
      <div className="h-screen p-16">
        <div className="flex h-full justify-cente flex-col rounded-lg border-2 border-gray-200 items-center px-16 py-20">
            <div>
                <TwitterIcon size="48"/>
            </div>
            <div className="text-3xl font-semibold py-6">
              계정을 생성하세요
            </div>
            <form 
                onSubmit={handleSubmit(onValid, onInvalid)}
                className="w-full flex flex-col space-y-6 my-5">
            <Input 
                register={register("username", {
                  required: true,
                })}
                name="username"
                type="text"
                label="사용자 이름"
                required
            />
            <div>
            <Input 
                register={{...register('email', {
                    validate: (email) =>
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) ||
                      '잘못된 이메일 형식입니다.',
                  })}}
                name="email"
                type="text"
                isError={errors.email && true}
                label="이메일 주소"
                required
            />
            <span className="text-red-500 text-sm">
                      {errors.email?.message}
              </span>
            </div>
            <Input 
                register={register("password", {
                  required: true,
                })}
                name="password"
                type="password"
                label="비밀번호"
                required
            />
            <Button text="가입하기" />
            </form>
          </div>
        </div>
      </div>

  )
}

export default CreateAccount;