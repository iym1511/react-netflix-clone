import axios from '../../api/axios';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {

    const {movieId} = useParams();
    const [movie, setMovie] = useState({});
    console.log('movied', movieId)

    useEffect(()=> {
        async function fetchData(){
            const request = await axios.get(`/movie/${movieId}`)
            setMovie(request.data)
        }
        fetchData();
    }, [movieId])

    if(!movie) return <div>...loding</div>

    return (  
        <div className='section'>
            <img className='modal__poster-img' src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="poster" />
        </div>
    );
}
 
export default DetailPage;