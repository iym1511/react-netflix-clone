import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import "./Nav.css"

const Nav = () => {

    // 네브바 아래로 스크롤시 색 변환 ----------
    const [show, setShow] = useState(false);
    // 검색창
    const [searchValue, setSearchValue] = useState("")
    
    const navigate = useNavigate();
    

    useEffect(()=>{
        window.addEventListener("scroll", ()=>{
            
            if(window.scrollY > 50){
                setShow(true);
            }else{
                setShow(false)
            }
        })
        return ()=> {
            window.removeEventListener("scroll", ()=> {})
        }
    })
    // ----------------------------------------

    // 검색한거 찾아줌
    const handleChange = (e) => {
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`);
    }

    return (               //show가 true일때 클래스 실행
        <div className={`nav ${show && "nav__black"}`}>
            <img alt='Netflix logo' 
                src='http://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px--Netflix_2015_logo.svg.png'
                className='nav__logo'
                onClick={() => window.location.reload()}
            />
            <input type="text" value={searchValue} onChange={handleChange} className="nav__input" placeholder='영화를 검색해주세요'/>
            <img alt='User logged'
                src={require(`../img/Netflix.png`)}
                style={{width:"30px"}}
                className="nav__avatar"
            />
        </div>
    );
}
 
export default Nav;