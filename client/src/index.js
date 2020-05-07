import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Match from "./components/Match";
import * as serviceWorker from "./serviceWorker";
import socketIOClient from "socket.io-client";

function Index(props) {
  const lastUser = window.localStorage.getItem("user") || "";
  const [socket, setsocket] = useState(null);
  const [username, setUsername] = useState(lastUser);

  const setUser = (name) => {
    window.localStorage.setItem("user", name);
    setUsername(name);
  };

  useEffect(() => {
    setsocket(socketIOClient("http://localhost:5000"));
    //Si el componente se desmonta la cierra
    // return () => {
    //   socket && socket.disconnect();
    // };
  }, []);

  return socket ? (
    <React.StrictMode>
      <Router>
        <Route exact path="/" render={(match) => <App {...match} username={username} setUser={setUser} socket={socket} />} />
        {username ? (
          <Route path="/:matchId" render={(match) => <Match {...match} username={username} socket={socket} />} />
        ) : (
          <Redirect to="/" />
        )}
      </Router>
    </React.StrictMode>
  ) : (
    <p>Waiting for connection...</p>
  );
}

ReactDOM.render(<Index />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
