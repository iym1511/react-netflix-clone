import axios from "../api/axios";
import { useEffect, useState } from "react";
import "./Row.css"
import MovieModal from "./MovieModal";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


            // App의값 props해줌
const Row = ({ isLargeRow, title, id, fetchUrl }) => {
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});

        useEffect(() => {
            fetchMovieData();
        }, []);
        
        const fetchMovieData = async () => {
            const request = await axios.get(fetchUrl);
            console.log("request", request);
            setMovies(request.data.results);
        };

        const handleClick=(movie)=>{
            setModalOpen(true)
            setMovieSelected(movie)
        }

    return (  
        <div className="row">
            <h2>{title}</h2>
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                navigation // arrow 버튼 사용 유무
                pagination={{ clickable: true }}  //페이지 버튼 보이게 할지
                loop={true} // 스크롤 처음부터 하게해주는것
                breakpoints={{
                    1378: {
                        slidesPerView: 6,
                        slidesPerGroup: 6,
                    },
                    1998: {
                        slidesPerView: 5,
                        slidesPerGroup: 5,
                    },
                    625: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                    },
                    0: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                    },
                }} // 해상도에 따라 포여지는 카드스와이퍼 개수 지정
            >
                <div id={id} className="row__posters" style={{border:"1px solid red"}}>sdsasadads
                    {
                        movies.map((movie)=>(        
                        <SwiperSlide>
                            <img key={movie.id} 
                            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                            src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name}
                            onClick={()=>handleClick(movie)}
                            />
                        </SwiperSlide>
                        ))
                    }
                </div>
            </Swiper>
            {
                modalOpen && (
                    <MovieModal
                    {...movieSelected} setModalOpen={setModalOpen}
                    />
                )
                    
                
            }

        </div>
    );
}
 
export default Row;
