import React, { useState, useEffect } from "react";
import PlayerList from "./PlayerList";
import WordForm from "./WordForm";
import TurnPanel from "./TurnPanel";
import GameState from "./GameState/GameState";

function Match(props) {
  // ------- Props ------ //
  const { socket, match } = props;

  //------- State Values ------ /
  const [game, setGame] = useState(null);
  const [ready, setReady] = useState(false);
  const [newWord, setNewWord] = useState("");
  const [isWordListEmpty, setIsWordListEmpty] = useState(true);
  const [timeLeft, settimeLeft] = useState(60);
  // ----------- Server Communication ------- //
  socket.on("timeLeft", (time) => {
    settimeLeft(time);
  });

  const sendNewMatch = () => {
    socket.emit("newMatch", { matchId: match.params.matchId, user: props.username });
  };
  const retrieveMatch = () => {
    console.log("requesting game");
    socket.emit("getActiveGame", `${match.params.matchId}`);
  };

  const updateGame = (game) => {
    socket.emit("updateGame", { matchId: match.params.matchId, updatedGame: game });
  };

  const postWord = (newWord) => {
    socket.emit("postWord", { matchId: match.params.matchId, newWord });
  };

  // -------- Game Management ------- //
  const chooseRandomWord = (list) => list[Math.floor(Math.random() * list.length)];
  const removeWord = (list, word) => list.splice(list.indexOf(word), 1);
  const changeActiveWord = (game) => {
    game.activeWord = chooseRandomWord(game.words);
    removeWord(game.words, game.activeWord);
  };

  const nextTurn = () => {
    const newGame = { ...game, activePlayer: { ...game.activePlayer } };
    newGame.turn++;
    changeActiveWord(newGame);
    setGame(newGame);
    updateGame(newGame);
  };

  // ----------------------- Effects ------------------ //
  // --- Comienzo ---- //
  useEffect(() => {
    sendNewMatch();
    setReady(true);
  }, []);

  // --- Cambios en Game --- //
  useEffect(() => {
    if (game) {
      if (game.words.length) setIsWordListEmpty(false);
      else setIsWordListEmpty(true);
    }
  }, [game]);

  // --- Partida Recibida de Server --- //
  useEffect(() => {
    if (ready) {
      console.log(ready);
      socket.on("activeGame", (game) => setGame(game));
      retrieveMatch();
    }
    return () => {
      socket.off("activeGame");
    };
  }, [ready]);

  return game ? (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div>
        <TurnPanel turn={game.turn} disabled={isWordListEmpty || game.activeTurn} nextTurn={nextTurn} />
        {isWordListEmpty && <p>Introduce algunas palabras para jugar.</p>}
        <p>Palabras actuales: {game.words.length}</p>
        <PlayerList userList={game.users.map((user) => user.name)} />
        <WordForm submit={postWord} />
      </div>
      <div>
        <h2>State</h2>
        <GameState active={game.activeTurn} game={game} timeLeft={timeLeft} />
      </div>
    </div>
  ) : (
    <p>Requesting game...</p>
  );
}

export default Match;
