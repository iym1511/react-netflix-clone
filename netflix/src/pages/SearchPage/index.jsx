import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from '../../api/axios';
import useDebounce from "../../hooks/useDebounce";
import './SearchPage.css'

// 영화 데이터 가져오기
const SearchPage = () => {
    
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    const searchTerm = query.get("q");

    // 최적화
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    
    const fetchSearchMovie = async (searchTerm) => {
        try {
            const request = await axios.get(`/search/multi?include_adult=false&query=${debouncedSearchTerm}`)
            setSearchResults(request.data.results);
        }catch(error){
            console.log("error", error);
        }
    }

    useEffect(()=> {
        if(debouncedSearchTerm) {
            fetchSearchMovie(debouncedSearchTerm)
        }    
    },[debouncedSearchTerm]);
    
    const renderSearchResults = () => {
        return searchResults.length > 0 ? (
            <div className="search-container">
                {searchResults.map((movie) => {
                    if(movie.backdrop_path !== null && movie.media_type !== "person"){
                                                // 보이는 이미지                  내부 이미지
                        const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path
                        return(
                            <div className="movie" key={movie.id}>
                                <div onClick={()=>navigate(`/${movie.id}`)} className="movie__column-poster">
                                    <img src={movieImageUrl} alt="movie" className="movie__poster"/>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        ) : (
            <div className="no-results">
                <div className="no-results__text">
                    <p>
                        찾고자하는 검색어"{debouncedSearchTerm}"에 맞는 영화가 없습니다
                    </p>
                </div>
            </div>
        )
    }

    return (  
        renderSearchResults()
    );
}
 
export default SearchPage;