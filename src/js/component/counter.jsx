import React, { useState, useEffect } from "react";

const Counter = () => {
  let [countDown, setCountDown] = useState(false);
  let [count, setCount] = useState(1);
  let [alert, setAlert] = useState(0);
  let [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!countDown) {
      const timer = setInterval(increaseTime, 1000);

      if (alert === count) {
        window.alert("Timer reached");
        resetCounter();
      }

      return () => clearInterval(timer);
    }

    console.log(`Alert:${alert}, Count:${count}`);

    if (countDown) {
      const timer = setInterval(decreaseTime, 1000);

      return () => clearInterval(timer);
    }
  }, [paused, countDown, alert, count]);

  const increaseTime = () => {
    if (!paused) {
      return setCount((count) => count + 1);
    }
  };

  const decreaseTime = () => {
    if (!paused) {
      return setCount((count) => count - 1);
    }
  };

  const createCountDown = (e) => {
    setCount(e);
    setCountDown(true);
  };

  const pauseCounter = () => {
    setPaused(!paused);
    console.log("State paused", paused);
  };

  const resetCounter = () => {
    setCount(0);
    setCountDown(false);
    console.log(`Counter reset ${count}`);
  };

  return (
    <div className="clock-container">
      <div className="controls">
        <form
          className="count-down"
          onSubmit={(e) => {
            e.preventDefault();
            createCountDown(e.target[0].value);
          }}
        >
          <h5>Countdown</h5>
          <input type="number" />
          <button>Submit</button>
        </form>
        <form
          className="count-down"
          onSubmit={(e) => {
            e.preventDefault();
            setAlert(parseInt(e.target[0].value));
          }}
        >
          <h5>Time Alert</h5>
          <input type="number" />
          <button>Submit</button>
        </form>
        <div className="button-controls">
          <button
            onClick={pauseCounter}
            className={paused ? "resume" : "paused"}
          >
            {paused ? "resume" : "pause"}
          </button>
          <button onClick={() => resetCounter()}>Reset</button>
        </div>
      </div>
      <div className="clock">
        <div className="four">
          {count < 1000 ? 0 : Math.floor((count / 1000) % 10)}
        </div>
        <div className="three">
          {count < 100 ? 0 : Math.floor((count / 100) % 10)}
        </div>
        <div className="two">
          {count < 10 ? 0 : Math.floor((count / 10) % 10)}
        </div>
        <div className="one">{count % 10}</div>
      </div>
    </div>
  );
};

export default Counter;
