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
          <p>Esta web es una herramienta sencilla para gestionar los turnos y equipos para el juego papelitos.</p>
          <p>
            Este juego consiste en formar equipos con los amigos y, por rondas, sacar papelitos de una caja donde estarán escritas palabras,
            frases, expresiones... cualquier cosa!
          </p>
          <p>Durante la primera ronda se juega a modo Tabú, teniendo que describir la palabra evitando las pistas más obvias.</p>
          <p>En la segunda se hace un dibujo al estilo pictionary.</p>
          <p>
            En la tercera tienes que decir una sola palabra que lo describa o este relacionada y tus compañeros han de averiguarlo solo con
            eso!
          </p>
          <p>
            Las rondas están todavía por implementar. Para el pictionary recomendamos una app de pizarra compartida como:
            <a href="https://awwapp.com/"> esta de awwapp</a>
          </p>

          <form onSubmit={submitUsername}>
            <label>
              Elige tu nombre de usuario:
              <input name="username" placeholder="Nombre" value={username} onChange={onChange}></input>
            </label>
          </form>
        </div>
      ) : (
        <div>
          <p>Esta web es una herramienta sencilla para gestionar los turnos y equipos para el juego papelitos.</p>
          <p>
            Este juego consiste en formar equipos con los amigos y, por rondas, sacar papelitos de una caja donde estarán escritas palabras,
            frases, expresiones... cualquier cosa!
          </p>
          <p>Durante la primera ronda se juega a modo Tabú, teniendo que describir la palabra evitando las pistas más obvias.</p>
          <p>En la segunda se hace un dibujo al estilo pictionary.</p>
          <p>
            En la tercera tienes que decir una sola palabra que lo describa o este relacionada y tus compañeros han de averiguarlo solo con
            eso!
          </p>
          <p>
            Las rondas están todavía por implementar. Para el pictionary recomendamos una app de pizarra compartida como:
            <a href="https://awwapp.com/"> esta de awwapp</a>
          </p>

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
