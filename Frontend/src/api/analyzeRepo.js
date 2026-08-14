
async function analyzeRepo(repoUrl) {
    const API_URL = import.meta.env.DEV 
                    ? "http://localhost:5000/api/v1" //replace this with your local backend URL
                    :import.meta.env.VITE_API_URL; 
    const res = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl }),
    });

    const json = await res.json();

    if(!res.ok) throw new Error(json.message || "something went wrong")
    
    return json.data;
}

export default analyzeRepo;