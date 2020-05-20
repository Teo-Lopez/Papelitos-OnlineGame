import React, { useState, useEffect } from "react";
import Counter from "./Counter";
import CurrentUser from "./CurrentUser";
function GameState({ active, game, timeLeft }) {
  const [time, setTime] = useState(60);

  // useEffect(() => {
  //   let timeInterval,
  //     timeStop = 60;
  //   if (active) {
  //     timeInterval = setInterval(() => {
  //       if (timeStop <= 1) clearInterval(timeInterval);
  //       console.log(timeStop);
  //       timeStop--;
  //       setTime((time) => {
  //         return time - 1;
  //       });
  //     }, 1000);
  //   } else {
  //     clearInterval(timeInterval);
  //     setTime(60);
  //   }

  //   return () => clearInterval(timeInterval);
  // }, [active]);

  return (
    <div>
      <Counter time={timeLeft} />
      <CurrentUser currentPlayer={game.activePlayer ? game.activePlayer.name : "nada"} />
      {window.localStorage.getItem("user") == game.activePlayer.name ? (
        <p>Palabra actual: {game.activeWord}</p>
      ) : (
        <p>No es tu turno, no puedes ver la palabra.</p>
      )}
    </div>
  );
}

export default GameState;
