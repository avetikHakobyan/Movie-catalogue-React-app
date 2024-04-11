import React, { useState } from "react";
import "../styles/Movie.css";
import Movie from "./Movie";

export default function List({ movies, sameYear }) {
    const [activeMovie, setActiveMovie] = useState(0);

    const handleClick = (e) => {
        if (e.target.title === "Minimize") {
            setActiveMovie(0);
        } else {
            const id = Number(e.currentTarget.id);
            setActiveMovie(id);
        }
    };

    return (
        <>
            {!movies.length ? (<h3 className="m-5 bold">Loading...</h3>) : (movies[0] === "Not found") ? (
                <h3 className="m-5 bold">No movies found</h3>
            ) : movies.length ? (
                <div className="grid-container mx-5">
                    {movies.map((movie) => (
                        movie.Key === activeMovie ? (
                            <div key={movie.Key} id={movie.Key} className="grid-item border-primary" onClick={handleClick}>
                                <button
                                    type="button"
                                    className="col"
                                    title="Minimize"
                                    onClick={handleClick}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-dash"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                    </svg>
                                </button>
                                <Movie movieId={activeMovie} />
                            </div>
                        ) :
                            <div key={movie.Key} id={movie.Key} className="grid-item" onClick={handleClick}>
                                {sameYear ? (
                                    <>
                                        <span className="bold">Title: </span>
                                        <span>{movie.Title}</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="bold">Title: </span>
                                        <span>{movie.Title}</span>
                                        <span className="bold"> Year: </span>
                                        <span>{movie.Year}</span>
                                    </>
                                )}
                            </div>
                    ))}
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
