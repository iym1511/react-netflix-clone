// 쉬운설명※ :input에 입력할때마다 랜더링이되서 최적화를위해 
// 작성후 0.5초뒤에 한번에 나오게하려고 만든 Hooks

// 코드설명※ : ex) '사람' 입력후 0.5초뒤에 랜더되는데 
// 0.5초가 되기전에 추가입력하면 다시 0.5초부터 카운트 시작

import {useState, useEffect} from "react";

const useDebounce = (value, delay) => {

    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(()=>{
        const handler = setTimeout(()=> {
            setDebounceValue(value)
        }, delay) // 정해진 딜레이 이후 작동

        return () => { // 원래있던 setTimeout 없엠
            clearTimeout(handler)
        }

    }, [value, delay]) // 벨류나 딜레이가 바뀌면 호출

    return (    
        debounceValue
    );
}

export default useDebounce;