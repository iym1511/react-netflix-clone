import { useEffect } from "react";

// 바깥창 클릭하면 꺼지게
const useOnClickOutside = (ref, handler) => {

    useEffect(()=> {
        const listner = (e) => {
            console.log('ref',ref.current);
            if(!ref.current || ref.current.contains(e.target)){
                return;
            }else{
                handler()
            }
        }
        document.addEventListener("mousedown", listner)
        document.addEventListener("touchstart", listner)
        return () => {
            document.addEventListener("mousedown", listner)
            document.addEventListener("touchstart", listner)
        };
    }, []);
  
}
 
export default useOnClickOutside;