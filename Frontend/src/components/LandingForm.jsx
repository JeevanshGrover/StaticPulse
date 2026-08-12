import React, { useState } from 'react'

function LandingForm({ onSubmit }) {
  const [repoUrl, setRepoUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!repoUrl.trim()) return;
    onSubmit(repoUrl);
  }

  return (
    <div>
      <h1>
        Project Audit
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />
        <button
          type="submit"
        >Analyze</button>
      </form>
    </div>
  )
}

export default LandingForm