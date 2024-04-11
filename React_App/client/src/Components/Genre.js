import React from "react";
import "../styles/Movie.css";

export default function Genre({ genre = [''] }) {
    return (
        <>
            <span className="bold">Genre: </span>
            {
                (genre.length) ? <ol>
                    {
                        (
                            genre.map((genre, i) => <li key={i}>{genre}</li>)
                        )
                    }
                </ol> : <span>No genre found</span>
            }

        </>
    )
}