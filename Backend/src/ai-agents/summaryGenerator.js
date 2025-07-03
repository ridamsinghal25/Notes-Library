import { createAgent, gemini } from "@inngest/agent-kit";

const summaryGenerator = async (text) => {
  const summaryAgent = createAgent({
    model: gemini({
      model: "gemini-1.5-flash-8b",
      apiKey: process.env.GEMINI_API_KEY,
    }),
    name: "AI Summary Agent",
    system: `
    You are a helpful and intelligent assistant. Your task is to analyze the following text and perform two tasks:
    
    **Task 1: Summary**  
    - Write a comprehensive summary of the text in approximately 600 words.  
    - Ensure the summary captures the main ideas, key events, arguments, or facts.  
    - Use clear, academic, and concise language.  
    - Preserve the logical flow of information and highlight important themes or messages.  
    
    **Task 2: Question Generation**  
    - Generate 10 to 15 insightful and relevant questions based on the text.  
    - Include a mix of question types: factual, analytical, and critical-thinking.  
    - Questions should reflect a deep understanding of the material and could be used for studying or discussion.  
    - Format questions in a numbered list.
      `,
  });

  const response = await summaryAgent.run(`
Summarize the following text and generate 10-15 important questions based on it.

Text:
"""
${text}
"""
`);

  return response.output[0].content;
};

export default summaryGenerator;
