import React, { useState, useEffect } from "react";
import "./App.css";

const countryCapitalMap = {
  France: "Paris",
  Germany: "Berlin",
  Italy: "Rome",
  Spain: "Madrid",
  Japan: "Tokyo",
};

function shuffleArray(array) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function App() {
  const [buttons, setButtons] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [status, setStatus] = useState({}); // {label: "color"}

  useEffect(() => {
    const items = Object.entries(countryCapitalMap).flat();
    setButtons(shuffleArray(items));
  }, []);

  const handleClick = (label) => {
    if (selected.length === 2 || matched.includes(label)) return;

    setSelected((prev) => [...prev, label]);
    setStatus((prev) => ({ ...prev, [label]: "blue" }));
  };

  useEffect(() => {
    if (selected.length === 2) {
      const [first, second] = selected;
      const isMatch =
        countryCapitalMap[first] === second ||
        countryCapitalMap[second] === first;

      if (isMatch) {
        setStatus((prev) => ({ ...prev, [first]: "green", [second]: "green" }));
        setTimeout(() => {
          setMatched((prev) => [...prev, first, second]);
          setSelected([]);
        }, 1000);
      } else {
        setStatus((prev) => ({ ...prev, [first]: "red", [second]: "red" }));
        setTimeout(() => {
          setStatus((prev) => ({ ...prev, [first]: "", [second]: "" }));
          setSelected([]);
        }, 1000);
      }
    }
  }, [selected]);

  return (
    <div className="App">
      <h1>Country-Capital Quiz</h1>
      <div className="grid">
        {buttons.map((label) =>
          matched.includes(label) ? null : (
            <button
              key={label}
              onClick={() => handleClick(label)}
              className={status[label] || ""}
            >
              {label}
            </button>
          )
        )}
      </div>
      {matched.length === buttons.length && (
        <h2 className="congrats">🎉 Congratulations! You matched all pairs!</h2>
      )}
    </div>
  );
}

export default App;