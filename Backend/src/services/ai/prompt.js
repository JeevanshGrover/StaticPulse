
function analysisPrompt(metrics) {
    return `You are a senior software architect reviewing a codebase's static metrics.

Given these metrics, return ONLY a valid JSON object (no markdown, no code fences, no extra text) with this exact shape:
{
  "score": <number 0-100>,
  "issues": [<string>, ...],
  "suggestions": [<string>, ...],
  "strengths": [<string>, ...],
  "weaknesses": [<string>, ...]
}

Metrics:
${JSON.stringify(metrics, null, 2)}

Base the score on: presence of README/license, console.log/TODO density relative to LOC, dependency count reasonableness, and general hygiene signals. Be specific in issues and suggestions — reference the actual numbers given, not generic advice.`;
}

export { analysisPrompt };
