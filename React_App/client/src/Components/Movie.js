import React, { useEffect, useState } from "react";
import Actor from "./Actor";
import Genre from "./Genre";
import "../styles/Movie.css";

export default function Movie({ movieId }) {
    const [movie, setMovie] = useState({});
    useEffect(() => {
        fetch(`/movies/${movieId}`)
            .then((res) => res.json())
            .then((data) => {
                setMovie(data);
            });
    }, [movieId]);

    return (
        <>
            <span className="bold">Title: </span>
            <span>{movie.Title}</span>
            <span className="bold"> Year: </span>
            <span>{movie.Year}</span>
            <span className="bold">Runtime: </span>
            <span>{movie.Runtime}</span>
            <span className="bold"> Revenue: </span>
            <span>{movie.Revenue}</span>
            <Actor actors={movie.Actors} />
            <Genre genre={movie.Genre} />
        </>
    );
}
