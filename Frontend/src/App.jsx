import analyzeRepo from "./api/analyzeRepo.js"
import { useState } from 'react'
import './App.css'
import LandingForm from "./components/LandingForm.jsx"
import loadingState from "./components/LoadingState.jsx"
import Dashboard from "./components/Dashboard.jsx"
import ErrorState from "./components/ErrorState.jsx"
import LoadingState from "./components/LoadingState.jsx"
import Navbar from "./components/Navbar.jsx"

function App() {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const handleAnalyze = async (repoUrl) => {
    setStatus("loading");
    try {
      const result = await analyzeRepo(repoUrl)
      setData(result)
      setStatus("success")
      console.log("data received- \n", result)
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setData(null);
    setError(null)
  }

  return (
    <div className="app-shell">
      <Navbar />
      {status === "loading" && <LoadingState />}
      {status === "success" && <Dashboard data={data} onReset={handleReset} />}
      {status === "error" && <ErrorState message={error} onRetry={handleReset} />}
      {status === "idle" && <LandingForm onSubmit = {handleAnalyze} />}
    </div>
  )
}

export default App
