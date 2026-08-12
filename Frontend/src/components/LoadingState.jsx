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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
      }}
    >
      <div className="spinner" />
      <p style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 16 }}>
        {MESSAGES[index]}
      </p>
    </div>
  );
}