import React from "react";

function TurnPanel({ turn, disabled, nextTurn }) {
  return turn === 0 ? (
    <div>
      <h2>Turn: {turn}</h2>
      <button disabled={disabled} onClick={nextTurn}>
        Comenzar partida
      </button>
    </div>
  ) : (
    <div>
      <h2>Turn: {turn}</h2>

      <button disabled={disabled} onClick={nextTurn}>
        Next turn
      </button>
    </div>
  );
}

export default TurnPanel;
