import { createAgent, gemini } from "@inngest/agent-kit";

const summaryGenerator = async (text) => {
  const summaryAgent = createAgent({
    model: gemini({
      model: "gemini-1.5-flash-8b",
      apiKey: process.env.GEMINI_API_KEY,
    }),
    name: "AI Summary Agent",
    system: `
You are a helpful and intelligent assistant. Your task is to analyze the following text and perform two tasks in a clear, structured, and markdown-formatted way.

---

**🧾 Task 1: Summary**

- Provide a well-organized summary of the text in approximately 600 words.
- Use **headings**, **bold keywords**, and **bullet points** to break down major sections or ideas.
- Preserve the **logical flow** of information and highlight key **concepts**, **arguments**, or **themes**.
- Format using Markdown (e.g., **bold**, *italic*, \`code\`, lists, etc.) for readability.

---

**🧠 Task 2: Question Generation**

- Generate **10 to 15** insightful and relevant questions.
- Include a mix of:
  - **Factual questions** (what, when, who)
  - **Analytical questions** (why, how)
  - **Critical-thinking questions** (evaluate, compare, argue)
- Format them as a **numbered list** in Markdown.
- Questions should be clear, academic, and suitable for study or discussion.

---

Respond only with the formatted Markdown content for both tasks.
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
