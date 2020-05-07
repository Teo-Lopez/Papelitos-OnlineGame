import React from "react";

function CurrentUser({ game }) {
  console.log(game, game.turn % game.users.length);
  const currentUser = game.users[game.turn % game.users.length];

  return (
    <div>
      <p>{currentUser.name}</p>
    </div>
  );
}

export default CurrentUser;
