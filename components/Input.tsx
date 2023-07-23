import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  type: "text" | "password";
  isError?: boolean;
  register: UseFormRegisterReturn;
  required: boolean;
}

export default function Input({
  label,
  name,
  type,
  isError=false,
  register,
  required,
}: InputProps) {
    const [value, setValue] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);     
      };
    
  return (
    <div className="w-full relative">
        <input 
            type={type}
            id={name} 
            required={required} 
            {...register} 
            className={`rounded-md border-[1px] transition-all duration-300 border-gray-400 bg-none px-2 h-16 text-lg w-full 
                       focus:outline-none focus:border-[2px] peer pt-4 ${isError ? ' focus:border-red-500' : ' focus:border-sky-500'}`}
            value={value} 
            onChange={handleChange}
        />
        <label
            htmlFor={name}
            className={`absolute text-gray-500 transition-all duration-300 
                    peer-focus:top-2 peer-focus:left-2 peer-focus:text-sm 
                    ${isError ? ' peer-focus:text-red-500' : ' peer-focus:text-sky-500'}
                    ${value === "" ? ' top-4 left-4 text-lg cursor-text' : ' top-2 left-2 text-sm'}
                    `}>
            {label}
        </label>
    </div>
  );
}