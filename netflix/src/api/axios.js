import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: ProcessingInstruction.env.REACT_APPMOVIE_DB_API_KEY,
    language: "ko-KR",
  },
});

export default instance;
