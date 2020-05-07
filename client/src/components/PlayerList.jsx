import React, { useEffect } from "react";

function PlayerList({ userList }) {
  return (
    <div>
      Equipo 1<ul>{userList.filter((user, idx) => idx % 2 == 0 && <li>{user}</li>)}</ul>
      Equipo 2<ul>{userList.filter((user, idx) => !(idx % 2 == 0) && <li>{user}</li>)}</ul>
    </div>
  );
}

export default PlayerList;
