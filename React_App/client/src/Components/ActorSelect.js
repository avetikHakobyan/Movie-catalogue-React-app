import React, { useEffect, useState } from "react";
import List from "./List";

export default function ActorSelect() {
    const [movies, setMovies] = useState([]);

    const fetchMovies = () => {
        fetch("/movies", {
            method: "get",
        })
            .then((res) => res.json())
            .then((data) => setMovies(data));
    }

    useEffect(() => {
        fetchMovies();
    }, [])


    const handleChange = (e) => {
        if (e.target.value === "") {
            fetchMovies();
        } else {
            fetch(`/actors/${e.target.value}`)
                .then((res) => res.json())
                .then((data) => {
                    setMovies(data);
                });
        }
    }

    return (
        <>
            <div className="input-group border rounded m-auto mb-4 w-25 mt-15">
                <label className="d-flex align-items-center text-primary ps-3" htmlFor="actorName">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 20 20">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </label>
                <input onChange={handleChange} id="actorName" type="search" className="form-control bg-transparent" placeholder="Search by actor name"></input>
            </div>
            <List movies={movies} sameYear={false} />
        </>
    )
}