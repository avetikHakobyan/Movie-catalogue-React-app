import React from "react";

export default function MovieAdd({ numMovies }) {

    const handleSubmit = () => {
        const elTitle = document.querySelector('#title');
        const elGenre = document.querySelector('#genre');
        const elActors = document.querySelector('#actors');
        const elYear = document.querySelector('#year');
        const elRuntime = document.querySelector('#runtime');
        const elRevenue = document.querySelector('#revenue');

        let newMovie = {
            "Key": numMovies + 1,
            "Title": elTitle.value,
            "Genre": elGenre.value.split(", "),
            "Actors": elActors.value.split(", "),
            "Year": elYear.value,
            "Runtime": elRuntime.value,
            "Revenue": elRevenue.value
        }

        fetch('/movies', {
            mode: 'cors',
            method: "post",
            headers: {
                "Content-Type": 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(newMovie)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert("Form submitted successfully")
                } else {
                    alert("Form submission failed")
                }
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="mt-15 w-50 m-auto text-start border p-5">
                <div className="mb-3">
                    <label className="bold form-label" htmlFor="title">Title: </label>
                    <input id="title" type="text" className="form-control input-control" placeholder="Enter movie title" required></input>
                </div>
                <div className="mb-3">
                    <label className="bold form-label" htmlFor="genre">Genre: </label>
                    <input id="genre" type="text" className="form-control input-control" placeholder="Enter movie genre separated by commas" required pattern="^[a-zA-Z]+(,\s[a-zA-Z]+)*$"></input>
                </div>
                <div className="mb-3">
                    <label className="bold form-label" htmlFor="actors">Actors: </label>
                    <input id="actors" type="text" className="form-control input-control" placeholder="Enter movie actors separated by commas" required pattern="^[a-zA-Z]+(,\s[a-zA-Z]+)*$"></input>
                </div>
                <div className="mb-3">
                    <label className="bold form-label" htmlFor="year">Year: </label>
                    <input id="year" type="number" className="form-control input-control w-50" placeholder="Enter movie year" required></input>
                </div>
                <div className="mb-3">
                    <label className="bold form-label" htmlFor="runtime">Runtime: </label>
                    <input id="runtime" type="number" className="form-control input-control w-50" placeholder="Enter movie runtime" required></input>
                </div>
                <div className="mb-3">
                    <label className="bold form-label" htmlFor="revenue">Revenue: </label>
                    <input id="revenue" type="number" className="form-control input-control w-50" placeholder="Enter movie revenue" required></input>
                </div>
                <input type="submit" className="btn btn-primary" value="Submit"></input>
            </form>
        </>
    )
}