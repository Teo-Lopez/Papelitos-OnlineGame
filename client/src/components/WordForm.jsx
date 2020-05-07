import React, { useState } from "react";

function WordForm({ submit }) {
  const [word, setWord] = useState("");
  const submitForm = (e) => {
    e.preventDefault();
    submit(word);
    setWord("");
  };

  const onChange = (e) => {
    setWord(e.currentTarget.value);
  };

  return (
    <div>
      Añade palabras o frases a la partida:
      <form onSubmit={submitForm}>
        <label>
          <input name="newWord" onChange={onChange} value={word}></input>
        </label>
      </form>
    </div>
  );
}

export default WordForm;
