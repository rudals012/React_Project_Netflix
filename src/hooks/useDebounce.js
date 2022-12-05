import React, { useEffect, useState } from 'react'

export const useDebounce = (value,delay) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay); // 작성한 글자마다 설정한 delay시간이 지났을때 setTimeout 실행 

        return () => { //설정한 delay시간이 지나기 전에 글자를 작성할 경우엔 실행이 안됨
            clearTimeout(handler);
        }

    },[value,delay]);

    return debounceValue;
}