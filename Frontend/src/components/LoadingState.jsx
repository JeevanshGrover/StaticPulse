import { useState, useEffect } from "react";

const MESSAGES = [
  "Cloning repository…",
  "Scanning files…",
  "Running static analysis…",
  "Generating AI report…",
];

export default function LoadingState() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => {
        if (i >= MESSAGES.length - 1) {
          clearInterval(interval);
          return i;
        }
        return i + 1;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-state">
      <div className="spinner" />
      <p className="loading-message">{MESSAGES[index]}</p>
    </div>
  );
}