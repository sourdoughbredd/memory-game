import { useEffect, useState } from "react";
import "./App.css";
import Score from "./components/Score";
import CardContainer from "./components/CardContainer";
import fetchNPokemonByColor from "./fetchData";

export default function App() {
  let [pokemon, setPokemon] = useState([]);
  let [clicked, setClicked] = useState([]);
  let [highScore, setHighScore] = useState(
    localStorage.getItem("highScore") || 0
  );

  // Load the pokemon only on mount/unmount
  useEffect(() => {
    async function fetchWrapper() {
      const poke = await fetchNPokemonByColor(12, "blue");
      setPokemon(shuffle(poke));
    }
    console.log("Fetching data from server!");
    fetchWrapper();
    return () => setPokemon([]);
  }, []);

  // Whenever someone clicks a card, shuffle the cards
  function shufflePokemon() {
    const newPokemon = [...pokemon];
    setPokemon(shuffle(newPokemon));
  }

  function cardOnClick(e, id) {
    if (clicked.includes(id) || clicked.length == pokemon.length - 1) {
      // User clicked same twice or has beat the game!
      processGameOver();
    } else {
      // Record that user clicked this one
      setClicked([...clicked, id]);
      shufflePokemon();
    }
  }

  function processGameOver() {
    const score = clicked.length;
    alert(
      `Game Over! Your score was ${score} out of a maximum possible score of ${pokemon.length}!`
    );
    setClicked([]);
    shufflePokemon();
    if (score > highScore) {
      localStorage.setItem("highScore", score);
      setHighScore(score);
    }
  }

  return (
    <div className="memory-game-app">
      <h1>Pokemon Memory Game</h1>
      <Score score={clicked.length} highScore={highScore}></Score>
      <CardContainer cards={pokemon} cardOnClick={cardOnClick}></CardContainer>
    </div>
  );
}

function shuffle(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const randIdx = randomInRange(0, arr.length - 1);
  return [arr[randIdx], ...shuffle(arr.toSpliced(randIdx, 1))];
}

function randomInRange(start, end) {
  return Math.floor(Math.random() * (end - start + 1) + start);
}
