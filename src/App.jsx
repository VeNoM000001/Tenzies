import React from "react";
import "./styles/App.css";
import Die from "./components/Die.jsx";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rolls, setRolls] = React.useState(0);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if ((allHeld && allSameValue) == true) {
      setTenzies(true);
      console.log("u won");
    }
  }, [dice]);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(newDieGenerator());
    }
    return newDice;
  }

  const dieElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  function newDieGenerator() {
    return {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid(),
    };
  }

  function rollDice() {
    if (tenzies == false) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : newDieGenerator();
        })
      );
      setRolls((oldrolls) => oldrolls + 1);
    } else {
      setTenzies(false);
      setDice(allNewDice);
      setRolls((oldrolls) => oldrolls - oldrolls);
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function buttonText() {
    return tenzies === true ? "Reset" : "Roll";
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze
      </p>
      <div className="die_container">{dieElements}</div>
      <h2>Number of clicks : {rolls}</h2>
      <button className="die_roll" onClick={rollDice}>
        {buttonText()}
      </button>
    </main>
  );
}

export default App;
