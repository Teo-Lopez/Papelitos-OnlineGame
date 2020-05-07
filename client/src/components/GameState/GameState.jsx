import React, { useState, useEffect } from "react";
import Counter from "./Counter";
import CurrentUser from "./CurrentUser";
function GameState({ active, game }) {
  const [time, setTime] = useState(60);

  useEffect(() => {
    let timeInterval,
      timeStop = 60;
    if (active) {
      timeInterval = setInterval(() => {
        if (timeStop <= 1) clearInterval(timeInterval);
        console.log(timeStop);
        timeStop--;
        setTime((time) => {
          return time - 1;
        });
      }, 1000);
    } else {
      clearInterval(timeInterval);
      setTime(60);
    }

    return () => clearInterval(timeInterval);
  }, [active]);

  return (
    <div>
      <Counter time={time} />
      <CurrentUser game={game} />
    </div>
  );
}

export default GameState;
