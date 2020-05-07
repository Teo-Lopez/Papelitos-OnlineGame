import React, { useState, useEffect } from "react";
import Counter from "./Counter";
function GameState(props) {
  const [time, setTime] = useState(60);

  useEffect(() => {
    let timeInterval,
      timeStop = 60;
    if (props.active) {
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
  }, [props.active]);

  return (
    <div>
      <Counter time={time} />
    </div>
  );
}

export default GameState;
