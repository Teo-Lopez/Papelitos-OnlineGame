import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Link } from "react-router-dom";
import socketIOClient from "socket.io-client";

function App(props) {
  const [matchList, setMatchList] = useState([]);
  const [matchName, setMatchName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const { history, socket } = props;

  //Efecto para cambio de socket, si este es valido, actida la alerta de nuevas partidas
  useEffect(() => {
    socket.on("matchList", (list) => {
      console.log("something happens");
      setMatchList(list);
    });

    socket.emit("getList");
    return () => {
      socket.off("matchList");
    };
  }, []);

  //Efecto para partida duplicada
  useEffect(() => {
    if (matchList.includes(matchName)) {
      setError(true);
      return;
    }
    setError(false);
  }, [matchName, matchList]);

  const onChange = (e) => {
    switch (e.currentTarget.name) {
      case "matchName":
        setMatchName(e.currentTarget.value);
        break;
      case "username":
        setUsername(e.currentTarget.value);
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    if (error) return;
    history.push(`/${matchName}`);
  };

  const submitUsername = (e) => {
    e.preventDefault();
    props.setUser(username);
  };

  return (
    <div className="App">
      <h1>PAPELITOS</h1>
      {!props.username ? (
        <div>
          <form onSubmit={submitUsername}>
            <label>
              <input name="username" placeholder="Nombre" value={username} onChange={onChange}></input>
            </label>
          </form>
        </div>
      ) : (
        <div>
          <h3>Crea tu partida</h3>
          <form onSubmit={onSubmit}>
            <label>
              Nombre de la partida: <input name="matchName" value={matchName} onChange={onChange}></input>
              {error && <p>Ya existe ese nombre de partida!</p>}
            </label>
          </form>
          <h3>O unete a una:</h3>

          {matchList.map((match) => (
            <div>
              <Link to={`/${match}`}>{match}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
