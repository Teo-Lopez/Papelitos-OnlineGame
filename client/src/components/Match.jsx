import React, { useState, useEffect } from "react";
import PlayerList from "./PlayerList";
import WordForm from "./WordForm";
import TurnPanel from "./TurnPanel";
import GameState from "./GameState/GameState";
function Match(props) {
  const { socket, match } = props;
  const [game, setGame] = useState(null);
  const [ready, setReady] = useState(false);
  const [newWord, setNewWord] = useState("");
  const [isWordListEmpty, setIsWordListEmpty] = useState(true);
  const [active, setActive] = useState(false);
  // ----------- Server Communication ------- //
  const sendNewMatch = () => {
    socket.emit("newMatch", { matchId: match.params.matchId, user: props.username });
  };
  const retrieveMatch = () => {
    console.log("requesting game");
    socket.emit("getActiveGame", `${match.params.matchId}`);
  };
  const updateGame = (game) => {
    socket.emit("updateGame", game);
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
    const newGame = { ...game };
    newGame.turn++;
    changeActiveWord(newGame);
    setGame(newGame);
    setActive(!active);
    updateGame(newGame);
  };

  // ----------- Effects ------ //
  useEffect(() => {
    sendNewMatch();
    setReady(true);
  }, []);

  useEffect(() => {
    if (game) {
      if (game.words.length) setIsWordListEmpty(false);
      else setIsWordListEmpty(true);
    }
  }, [game]);

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
        <TurnPanel turn={game.turn} disabled={isWordListEmpty || active} nextTurn={nextTurn} />
        {isWordListEmpty && <p>Introduce algunas palabras para jugar.</p>}
        <p>Palabras actuales: {game.words.length}</p>
        <PlayerList userList={game.users.map((user) => user.name)} />
        <WordForm submit={postWord} />
      </div>
      <div>
        <h2>State</h2>
        <GameState active={active} game={game} />
      </div>
    </div>
  ) : (
    <p>Requesting game...</p>
  );
}

export default Match;
