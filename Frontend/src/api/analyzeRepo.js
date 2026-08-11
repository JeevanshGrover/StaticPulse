
async function analyzeRepo(repoUrl) {
    const res = await fetch(`http://localhost:5000/api/v1/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl }),
    });

    const json = await res.json();

    //TODO: remove the complete message
    if(!res.ok) throw new Error(json.message || "something went wrong in analyzeRepo")
    
    return json.data;
}

export default analyzeRepo;