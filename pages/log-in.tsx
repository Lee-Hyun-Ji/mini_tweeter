import { NextPage } from "next";
import React, { useEffect } from "react";
import TwitterIcon from "../components/TwitterIcon";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { useRouter } from "next/router";
import useMutation from "../lib/client/useMutation";

const Login:NextPage = () => {
    const router = useRouter();
    const [loginUser, {loading, data, error}] = useMutation("/api/users/login");

    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();
      const onValid = (validData: any) => {
        loginUser(validData);
      };
      const onInvalid = (errors: any) => {
        console.log(errors);
      };

    useEffect(() => {
        if(data?.isSuccess) router.push('/');
        else if(data?.msg !== undefined ) alert(data?.msg);
    },[data]);
    
  return (
<div className="mx-auto max-w-xl">
  <div className="h-screen p-16">
    <div className="flex h-full justify-cente flex-col rounded-lg border-2 border-gray-200 items-center px-16 py-20">
        <div>
            <TwitterIcon size="48" />
        </div>
        <div className="text-3xl font-semibold py-6">
          트위터에 로그인하기
        </div>
        <form 
            onSubmit={handleSubmit(onValid, onInvalid)}
            className="w-full flex flex-col space-y-6 my-5">
        <div>
            <Input 
                register={{...register('email', {
                    validate: (email) =>
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) ||
                    '잘못된 이메일 형식입니다.',
                })}}
                name="email"
                type="text"
                label="이메일 주소"
                isError={errors.email && true}
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
        <Button text="로그인" />
        </form>
        <div className="flex w-full mt-6 text-left text-lg">
          <span className="mr-2">계정이 없으신가요? </span>
          <span className="text-blue-600 font-semibold cursor-pointer" onClick={() => (router.replace(`/create-account`))}>가입하기</span>
        </div>
      </div>
    </div>
  </div>

  )
}

export default Login;