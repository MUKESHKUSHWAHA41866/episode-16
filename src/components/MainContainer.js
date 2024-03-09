import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
    const movie = useSelector((store) => store.movies?.nowPlayingMovies);
    if (!movie ) return;
    // console.log(movies);

    const mainMovies = movie[0];
    // console.log(mainMovies);

    const {original_title, overview, id} = mainMovies
    return (
        <div className="pt-[30%] bg-black md:pt-0">
           <VideoTitle title={original_title} overview= {overview} />
           <VideoBackground movieId= {id} />
        </div>
    )
}

export default MainContainer;