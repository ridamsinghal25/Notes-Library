import { gemini } from "../utils/gemini.js";
import fs from "fs/promises";
import {
  PUBLIC_EXTRACTED_TEXT_PATH,
  TMP_EXTRACTED_TEXT_PATH,
} from "../constants.js";

export async function documentAnalyzer(file) {
  const pdfBuffer = await fetch(file).then((response) =>
    response.arrayBuffer()
  );

  const contents = [
    {
      text: `You are a highly accurate PDF extraction assistant. The PDF you are given may contain a mix of typed text and handwritten notes (including scanned or lightly OCR'd content). Your task is to extract all legible text exactly as it appears, and preserve the structure page by page.

For each page:
- Use a heading like '**Page 1**', '**Page 2**', etc.
- If the content is handwritten but legible, extract it normally.
- Do NOT summarize, rewrite, or rephrase anything.
- Maintain line breaks, bullet points, spacing, abbreviations, and original formatting wherever possible.
- If technical terms or diagrams appear as text, preserve them exactly as-is.

Be accurate, cautious, and neutral in transcription.

And if these characters in any order appears at the start of page do not include them:

Deepak-  
I-TIMO  
DATE  
PAGE No.

Example:
**Page 1:**
UNIT-1
DATE
PAGE No
Deepak-
What is Mobile Computing (M.C.) ?
Mobile Computing is the ability to connect
portable devices to wireless enabled n/w
to access data & services while on the move
It is a convenient technique to transmit
& receive voice, text + audio & video with
no temporal or special constraints.

The new formated text will be

**Page 1:**
UNIT-1
What is Mobile Computing (M.C.) ?
Mobile Computing is the ability to connect
portable devices to wireless enabled n/w
to access data & services while on the move
It is a convenient technique to transmit
& receive voice, text + audio & video with
no temporal or special constraints.
`,
    },
    {
      inlineData: {
        mimeType: "application/pdf",
        data: Buffer.from(pdfBuffer).toString("base64"),
      },
    },
  ];

  const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
  });

  let filePath;
  if (response.text) {
    if (process.env.DEPLOYED_PLATFORM === "vercel") {
      filePath = TMP_EXTRACTED_TEXT_PATH;
    } else {
      filePath = PUBLIC_EXTRACTED_TEXT_PATH;
    }

    fs.writeFile(filePath, response.text);
  }

  return { text: response.text, extractedFilePath: filePath };
}
