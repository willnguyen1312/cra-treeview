import React, { useState } from "react";

import styles from "./App.module.css";

function App() {
  const [counter, setCounter] = useState(0);
  return (
    <div className={styles.wrapper}>
      <h1>Counter: {counter}</h1>
      <button onClick={() => setCounter(counter + 1)}>Click me</button>
    </div>
  );
}

export default App;
