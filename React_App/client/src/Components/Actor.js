import React from "react";
import "../styles/Movie.css";

export default function Actor({ actors = [''] }) {
    return (
        <>
            <span className="bold">Actors: </span>
            {
                (actors.length) ? <ol>
                    {
                        (
                            actors.map((actor, i) => <li key={i}>{actor}</li>)
                        )
                    }
                </ol> : <span>No actors found</span>
            }

        </>
    )
}