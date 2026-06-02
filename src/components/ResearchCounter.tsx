import { useState } from "react";

export default function ResearchCounter() {
  const [count, setCount] = useState(3);

  return (
    <div className="panel" style={{ margin: "24px 0" }}>
      <h3>Interactive MDX Component</h3>
      <p>
        MDX pages can hydrate React components. Current selected research
        threads: <strong>{count}</strong>.
      </p>
      <button
        className="button primary"
        type="button"
        onClick={() => setCount((value) => value + 1)}
      >
        Add thread
      </button>
    </div>
  );
}
