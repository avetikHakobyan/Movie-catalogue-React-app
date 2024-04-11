const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const PORT = 8888;
const WEB_ROOT = path.join(__dirname, 'client', 'public');
const movies = require('./data/IMDBmovieData.json');


const sortMovies = (movies) => {
    movies.sort((a, b) => {
        return a.Title.localeCompare(b.Title);
    });
}

app.use(express.static(WEB_ROOT));

app.use(express.json());

app.get('/movies', (req, res) => {
    sortMovies(movies);
    movieInfo = [];
    movieInfo = movies.map((movie) => { return { "Key": movie.Key, "Title": movie.Title, "Year": movie.Year } });
    res.json(movieInfo);
})

app.get('/movies/:id', (req, res) => {
    let foundMovie;
    let movieId = Number(req.params.id);
    foundMovie = movies.find((movie) => movie.Key === movieId);
    if (foundMovie === undefined) {
        res.json();
    } else {
        res.json(foundMovie);
    }
})

app.get('/titles/:title', (req, res) => {
    let movieName = req.params.title;
    let nameMovies = [];

    movies.map((movie) => {
        if ((movie.Title).toLowerCase().includes(movieName.toLowerCase())) {
            nameMovies.push({ "Key": movie.Key, "Title": movie.Title, "Year": movie.Year })
        }
    });

    sortMovies(nameMovies);

    if (nameMovies.length === 0) {
        res.json(["Not found"]);
    } else {
        res.json(nameMovies);
    }
})

app.get('/actors/:name?', (req, res) => {
    let actorName = req.params.name;
    let playedMovies = [];

    movies.map((movie) => {
        if (movie.Actors.some(actor => (actor).toLowerCase().includes(actorName.toLowerCase()))) {
            playedMovies.push({ "Key": movie.Key, "Title": movie.Title, "Year": movie.Year })
        }
    });

    sortMovies(playedMovies);

    if (playedMovies.length === 0) {
        res.json(["Not found"]);
    } else {
        res.json(playedMovies);
    }
})

app.get('/years/:year?', (req, res) => {
    let year = Number(req.params.year);
    let yearMovies = [];

    movies.map((movie) => {
        if (movie.Year === year) {
            yearMovies.push({ "Key": movie.Key, "Title": movie.Title })
        }
    })

    sortMovies(yearMovies);
    if (yearMovies.length === 0) {
        res.json(["Not found"]);
    } else {
        res.json(yearMovies);
    }
})

app.post('/movies', (req, res) => {
    let movie = req.body;
    let moviesFile = null;
    let newMovie = "";

    fs.readFile("./data/IMDBmovieData.json", (err, data) => {

        moviesFile = JSON.parse(data);
        moviesFile.push(movie);
        newMovie = JSON.stringify(moviesFile);

        fs.writeFile("./data/IMDBmovieData.json", newMovie, er => {
            if (er) {
                res.json({
                    success: false
                });
            } else {
                res.json({
                    success: true
                });
            }
        });
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})