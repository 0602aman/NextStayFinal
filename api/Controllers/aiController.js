const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function generateContent(req, res) {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: 'No prompt provided' });
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);

        res.json({ text: text });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'Failed to generate content' });
    }
}

module.exports = {
    generateContent,
};
