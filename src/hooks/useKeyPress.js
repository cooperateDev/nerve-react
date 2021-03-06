import { useState, useEffect } from "react";

export function useKeyPress(targetKey) {
  var [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    if (key == targetKey) {
      setKeyPressed(true);
    }
  }

  // If released key is our target key then set to false
  function upHandler({ key }) {
    if (key == targetKey) {
      setKeyPressed(false);
    }
  }

  function func() {
    if (window) {
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);

      // Remove event listeners on cleanup
      function cleanupFunc() {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      }

      return cleanupFunc;
    }
  }
  // Add event listeners
  useEffect(func, []);
  // Empty array should ensure that effect is only run on mount and unmount
  // State for keeping track of whether key is pressed
  return keyPressed;
}
