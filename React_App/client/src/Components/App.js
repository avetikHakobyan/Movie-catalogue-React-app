import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import List from './List';
import ActorSelect from './ActorSelect';
import YearSelect from './YearSelect';
import MovieAdd from './MovieAdd';
import MovieSelect from './MovieSelect';

function App() {
  const [movies, setMovies] = useState([]);

  const [option, setOption] = useState("");

  useEffect(() => {
    fetch('/movies', {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }).then(
      res => res.json()
    ).then(
      data => {
        setMovies(data);
      }
    )
  }, [])

  const handleClick = (e) => {
    switch (e.target.id) {
      case "searchActor":
        setOption("searchActor");
        break;
      case "searchYear":
        setOption("searchYear");
        break;
      case "searchMovie":
        setOption("searchMovie");
        break;
      case "addMovie":
        setOption("addMovie");
        break;
      default:
        break;
    }
  }

  return (
    <div className="App">
      <header className='position-fixed top-0 start-0 end-0 z-1'>
        <div className='bg-dark py-3'>
          <a href='http://localhost:3000' className='bold'>Movie catalogue</a>
        </div>
        <div className='bg-secondary py-4'>
          <nav className='d-flex justify-content-center gap-5 pb-4'>
            <button id='searchActor' className='btn btn-primary' type='button' onClick={handleClick}>Search by actor</button>
            <button id='searchMovie' type='button' className='btn btn-primary' onClick={handleClick}>Search by title</button>
            <button id='searchYear' type='button' className='btn btn-primary' onClick={handleClick}>Search by year</button>
          </nav>
          <button id='addMovie' type='button' className='btn btn-success' onClick={handleClick}>Add movie</button>
        </div>
      </header>
      {
        (option === "searchActor") ? <ActorSelect />
          : (option === "searchYear") ? <YearSelect /> : (option === "searchMovie") ? <MovieSelect /> : (option === "addMovie") ? <MovieAdd numMovies={movies.length} /> : <div className='mt-15'><List movies={movies} sameYear={false} /></div>
      }
    </div>
  );
}

export default App;
