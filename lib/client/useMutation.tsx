import { useState } from "react";

interface responseData {
    isSuccess: boolean;
    msg?: string;
    data?: any;
}

interface UseMutationState {
    loading: boolean;
    data?: responseData;
    error?: object;
  }

export default function useMutation(url: string): [(data: any) => void, UseMutationState] {
    const [state, setSate] = useState<UseMutationState>({
        loading: false,
        data: undefined,
        error: undefined,
      });

    
    function mutation(data: any) {
        setSate((prev) => ({...prev, loading: true}));
        fetch(url, {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })
        .then((res) =>  res.json().catch(() => {}))
        .then((data) => setSate((prev) => ({...prev, data})))
        .catch((error) => setSate((prev) => ({...prev, error})))
        .finally(() => setSate((prev) => ({...prev, loading: false})));
    }
    
    return [mutation, {...state}];
}