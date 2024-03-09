import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";

const useMovieTrailer =(movieId) => {

    const dispatch = useDispatch();

    const trailerVideo = useSelector(store => store.movies.trailerVideo);

    // const [trailerId, setTrailerId] = useState(null);

    const getMovieVideos= async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/"+ movieId +"/videos?language=en-US",API_OPTIONS )
        const json = await data.json();

        // const mm = await("https://api.themoviedb.org/3/movie/popular")
        // const json = await mm.json();
        // console.log(json);
        const filterData = json.results.filter(video => video.type === "Trailer");
        const trailer = filterData.length ?  filterData[0] : json.results[0];
        // console.log(trailer);
        // setTrailerId(trailer.key)
        dispatch(addTrailerVideo(trailer))
    };

    useEffect(() => {
       !trailerVideo && getMovieVideos();
    },[]);

}

export default useMovieTrailer;