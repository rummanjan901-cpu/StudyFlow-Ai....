/**
 * AI Assistant System - OpenAI Integration
 */

const OPENAI_API_KEY = "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";
const API_URL = "https://api.openai.com/v1/chat/completions";

/**
 * 1. Core function to communicate with OpenAI
 */
async function getAIResponse(message, systemPrompt = "You are a helpful study assistant.") {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini", // Efficient and fast for study dashboards
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: message }
                ],
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error.message || "Failed to fetch AI response");
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error("AI API Error:", error);
        return "Sorry, I encountered an error processing that request.";
    }
}

/**
 * 2. Summarize Text Function
 * Converts long notes into concise, bulleted short notes
 */
export async function summarizeText(text) {
    const prompt = `Please summarize the following text into concise, high-level study notes using bullet points: \n\n${text}`;
    return await getAIResponse(prompt, "You are an expert at academic summarization.");
}

/**
 * 3. Generate Quiz Function
 * Returns 3 MCQs based on provided text
 */
export async function generateQuiz(text) {
    const prompt = `Based on the following text, generate 3 Multiple Choice Questions. 
    Format the output as a simple list with options A, B, C, D and indicate the correct answer.
    
    Text: ${text}`;
    
    return await getAIResponse(prompt, "You are a quiz generation bot. Be accurate and challenging.");
}

/**
 * Example Usage (Hooking into UI):
 * 
 * document.querySelector('#summarize-btn').addEventListener('click', async () => {
 *    const input = document.querySelector('#note-input').value;
 *    const summary = await summarizeText(input);
 *    document.querySelector('#output-area').innerText = summary;
 * });
 */
