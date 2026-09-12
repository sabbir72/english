import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy GoogleGenAI client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    time: new Date().toISOString(),
  });
});

// AI Conversation Endpoint
app.post("/api/ai/conversation", async (req, res) => {
  try {
    const { messages, topic, mode, userLevel } = req.body;
    const ai = getGenAI();

    if (!ai) {
      // Graceful fallback response when API key is not configured
      const lastUserMsg = messages && messages.length > 0 ? messages[messages.length - 1].content : "";
      return res.json({
        reply: `Hello! I see you said: "${lastUserMsg}". (Demo mode: Please configure your GEMINI_API_KEY in the Settings menu for full live AI conversation.) Keep practicing speaking English every day!`,
        correction: mode === "teacher" ? {
          original: lastUserMsg,
          corrected: lastUserMsg,
          banglaExplanation: "নিয়মিত চর্চা করুন। জেমিনি এআই সক্রিয় হলে ব্যাকরণগত বিশ্লেষণ প্রদান করা হবে।",
          tips: "Keep your sentences simple and clear."
        } : null,
        followUpQuestion: "What is your favorite hobby?",
      });
    }

    const systemInstruction = `You are a friendly, encouraging, expert English teacher and conversation partner for Bengali-speaking learners.
Context:
- User Level: ${userLevel || "Beginner (A1/A2)"}
- Conversation Topic/Scenario: ${topic || "Daily Life"}
- Mode: ${mode === "teacher" ? "Teacher Mode" : "Normal Conversation Mode"}

Guidelines:
1. Respond in natural, conversational English suited to the user's level (${userLevel || "Beginner"}).
2. If Mode is "Teacher Mode":
   - Identify any grammar, tense, vocabulary, or word order mistakes in the user's latest response.
   - Explain the mistake kindly in simple, natural Bengali (বাংলা).
   - Provide a more natural or correct English sentence.
   - Give 1 actionable learning tip.
3. If Mode is "Normal Conversation Mode":
   - Prioritize fluent, friendly, natural conversation without over-correcting, but subtly model natural English phrasing.
4. Always include a relevant follow-up question in English to keep the conversation going.
5. Return your response in JSON format matching the schema:
{
  "reply": "Your conversational response in English",
  "correction": {
    "hasMistake": boolean,
    "original": "what user wrote",
    "corrected": "natural/correct version",
    "banglaExplanation": "সহজ বাংলায় ভুলের ব্যাখ্যা ও নিয়ম",
    "tips": "Quick tip for Bengali speakers"
  } or null,
  "followUpQuestion": "Follow-up question in English to keep conversation going",
  "vocabHighlight": [
    { "word": "example", "bangla": "বাংলা অর্থ", "partOfSpeech": "noun" }
  ]
}`;

    const formattedHistory = (messages || []).map((m: any) => `${m.role === "user" ? "Learner" : "AI Teacher"}: ${m.content}`).join("\n");

    const prompt = `Conversation history so far:\n${formattedHistory}\n\nPlease respond to the learner's last message as their English conversation partner.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const text = response.text || "{}";
    try {
      const parsed = JSON.parse(text);
      return res.json(parsed);
    } catch {
      return res.json({
        reply: text,
        correction: null,
        followUpQuestion: "Could you tell me more about that?",
      });
    }
  } catch (error: any) {
    console.error("AI Conversation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI conversation response" });
  }
});

// AI "Ask" Feature
app.post("/api/ai/ask", async (req, res) => {
  try {
    const { query, userLevel } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const ai = getGenAI();
    if (!ai) {
      return res.json({
        title: query,
        explanation: `Explanation for "${query}" (Please add GEMINI_API_KEY in Secrets for live AI analysis).`,
        banglaMeaning: "বাংলা অর্থ ও বিশদ ব্যাখ্যা এআই যুক্ত থাকলে লাইভ তৈরি হবে।",
        examples: [
          { english: "I practice English daily.", bangla: "আমি প্রতিদিন ইংরেজি চর্চা করি।" },
          { english: "She wants to learn new words.", bangla: "সে নতুন শব্দ শিখতে চায়।" }
        ],
        grammarNote: "Always check the subject and verb agreement.",
        practiceQuestion: {
          question: "Choose the correct sentence:",
          options: ["I am go to school", "I go to school", "I goes to school", "I going to school"],
          correctIndex: 1,
          explanationBangla: "Present Indefinite tense-এ 'I'-এর পর verb-এর base form বসে।"
        }
      });
    }

    const prompt = `A Bengali-speaking English learner asked: "${query}"
Learner's proficiency level: ${userLevel || "Beginner"}

Please provide a comprehensive yet clear answer tailored for Bengali speakers.
Respond in valid JSON with this exact structure:
{
  "title": "Clear English topic heading",
  "explanation": "Clear explanation in English using simple language",
  "banglaMeaning": "সহজ ও প্রাঞ্জল বাংলায় বিশদ ব্যাখ্যা",
  "pronunciation": "IPA or easy phonetic pronunciation guide (if applicable)",
  "examples": [
    { "english": "Example sentence 1", "bangla": "বাংলা অনুবাদ" },
    { "english": "Example sentence 2", "bangla": "বাংলা অনুবাদ" },
    { "english": "Example sentence 3", "bangla": "বাংলা অনুবাদ" }
  ],
  "grammarNote": "Important rule or common mistake Bengali speakers make (in simple Bangla/English)",
  "practiceQuestion": {
    "question": "Quick multiple choice question to test understanding",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanationBangla": "সঠিক উত্তরের সহজ বাংলা কারণ"
  }
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.4,
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("AI Ask error:", error);
    res.status(500).json({ error: error.message || "Failed to process query" });
  }
});

// AI Sentence Generator
app.post("/api/ai/sentence-generator", async (req, res) => {
  try {
    const { word } = req.body;
    if (!word) {
      return res.status(400).json({ error: "Word is required" });
    }

    const ai = getGenAI();
    if (!ai) {
      return res.json({
        word,
        simple: {
          sentence: `I want to ${word} my English.`,
          bangla: `আমি আমার ইংরেজি ${word} করতে চাই।`,
          structure: "Subject + want to + Verb + Object"
        },
        intermediate: {
          sentence: `Consistent practice will help you ${word} faster.`,
          bangla: `ধারাবাহিক অনুশীলন আপনাকে দ্রুত উন্নতি করতে সাহায্য করবে।`,
          structure: "Subject + will help + Object + Verb"
        },
        advanced: {
          sentence: `Substantial efforts were made to ${word} the system efficiency.`,
          bangla: `সিস্টেমের দক্ষতা উন্নত করতে ব্যাপক প্রচেষ্টা চালানো হয়েছিল।`,
          structure: "Passive voice: Subject + were made + to-infinitive"
        },
        relatedVocab: [
          { word: "progress", bangla: "অগ্রগতি", pos: "noun" },
          { word: "enhance", bangla: "বৃদ্ধি করা", pos: "verb" }
        ],
        practiceQuestion: {
          sentenceWithBlank: `Reading books helps _____ your vocabulary.`,
          options: [word, "improvingly", "improves", "improved"],
          correctAnswer: word,
          explanationBangla: "helps-এর পর bare infinitive বা to-infinitive রূপ বসে।"
        }
      });
    }

    const prompt = `Generate comprehensive learning sentences for the English word: "${word}" for Bengali-speaking learners.
Include simple, intermediate, and advanced levels with Bengali meanings, grammatical structures, related vocabulary, and a fill-in-the-blank practice question.

Return JSON with structure:
{
  "word": "${word}",
  "partOfSpeech": "verb / noun / adjective / adverb",
  "banglaMeaning": "বাংলা অর্থ",
  "simple": {
    "sentence": "Simple level sentence",
    "bangla": "বাংলা অনুবাদ",
    "structure": "Subject + Verb + Object formula"
  },
  "intermediate": {
    "sentence": "Intermediate level sentence",
    "bangla": "বাংলা অনুবাদ",
    "structure": "Grammatical formula"
  },
  "advanced": {
    "sentence": "Advanced level sentence",
    "bangla": "বাংলা অনুবাদ",
    "structure": "Grammatical formula"
  },
  "relatedVocab": [
    { "word": "English word", "bangla": "বাংলা অর্থ", "pos": "part of speech" }
  ],
  "practiceQuestion": {
    "sentenceWithBlank": "Sentence with _____ for the word",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correctAnswer": "The correct option",
    "explanationBangla": "বাংলায় ব্যাখ্যা"
  }
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("AI Sentence Generator error:", error);
    res.status(500).json({ error: error.message || "Failed to generate sentences" });
  }
});

// AI Vocabulary Builder by Topic
app.post("/api/ai/vocab-builder", async (req, res) => {
  try {
    const { topic, userLevel } = req.body;
    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const ai = getGenAI();
    if (!ai) {
      return res.json({
        topic,
        words: [
          {
            word: "Meeting",
            bangla: "সভা / বৈঠক",
            pronunciation: "মিটিং (/ˈmiː.tɪŋ/)",
            partOfSpeech: "noun",
            example: "We have an urgent team meeting at 10 AM.",
            exampleBangla: "সকাল ১০টায় আমাদের একটি জরুরি টিম মিটিং আছে।"
          },
          {
            word: "Deadline",
            bangla: "নির্দিষ্ট শেষ সময়সীমা",
            pronunciation: "ডেডলাইন (/ˈded.laɪn/)",
            partOfSpeech: "noun",
            example: "Can we submit the report before the deadline?",
            exampleBangla: "আমরা কি সময়সীমার আগে রিপোর্টটি জমা দিতে পারি?"
          },
          {
            word: "Schedule",
            bangla: "সময়সূচী / সময় নির্ধারণ করা",
            pronunciation: "শিডিউল (/ˈʃedʒ.uːl/ বা /ˈskedʒ.uːl/)",
            partOfSpeech: "noun / verb",
            example: "Please check your daily schedule.",
            exampleBangla: "অনুগ্রহ করে আপনার দৈনিক সময়সূচী পরীক্ষা করুন।"
          }
        ]
      });
    }

    const prompt = `Generate a curated list of 8 essential, practical English vocabulary words for the topic: "${topic}" for Bengali learners (Level: ${userLevel || "Beginner to Intermediate"}).
For each word provide:
- English word
- Bengali meaning (বাংলা অর্থ)
- Pronunciation in Bengali phonetics + IPA
- Part of speech
- Example sentence in English
- Bengali translation of the example sentence

Return JSON:
{
  "topic": "${topic}",
  "words": [
    {
      "word": "word",
      "bangla": "বাংলা অর্থ",
      "pronunciation": "উচ্চারণ (/IPA/)",
      "partOfSpeech": "noun / verb / adj",
      "example": "English sentence",
      "exampleBangla": "বাংলা অনুবাদ"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("AI Vocab Builder error:", error);
    res.status(500).json({ error: error.message || "Failed to build vocabulary" });
  }
});

// AI Pronunciation Feedback
app.post("/api/ai/pronunciation-feedback", async (req, res) => {
  try {
    const { targetText, spokenText } = req.body;
    if (!targetText) {
      return res.status(400).json({ error: "Target text is required" });
    }

    const ai = getGenAI();
    if (!ai) {
      const match = spokenText?.trim().toLowerCase() === targetText.trim().toLowerCase();
      return res.json({
        accuracyScore: match ? 95 : 75,
        targetText,
        spokenText: spokenText || "Not recognized clearly",
        status: match ? "Great job!" : "Good attempt!",
        ipa: "/tɑːr.ɡɪt/",
        syllables: targetText.split(" ").join(" · "),
        stressInfo: "Stress the primary syllable.",
        banglaTips: "স্পষ্টভাবে প্রতিটি সিলেবল উচ্চারণ করার চেষ্টা করুন। জিহ্বা ও ঠোঁটের অবস্থান খেয়াল রাখুন।",
        correctiveAdvice: "Keep practicing speaking with slow and normal playback."
      });
    }

    const prompt = `Analyze this English pronunciation attempt by a Bengali-speaking learner:
Target text: "${targetText}"
User's speech recognition result: "${spokenText || ""}"

Evaluate phonetic accuracy, syllable stress, and typical Bengali accent challenges (such as /v/ vs /b/, /p/ aspiration, /s/ vs /sh/, vowel lengthening, silent letters).

Return JSON:
{
  "accuracyScore": number between 40 and 100,
  "targetText": "${targetText}",
  "spokenText": "${spokenText || ""}",
  "status": "Excellent" | "Good Progress" | "Needs Practice",
  "ipa": "IPA representation of target text",
  "syllables": "Syllable breakdown with dot e.g. im·prove",
  "stressInfo": "Which syllable has primary stress (e.g. stress on second syllable 'PROVE')",
  "banglaTips": "বাংলায় সহজ উপদেশ যা বাঙালি শিক্ষার্থীদের সাধারণ ভুলের (যেমন v/b, p, th) সমাধান দেয়",
  "correctiveAdvice": "1-2 practical English speaking tips"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("AI Pronunciation Feedback error:", error);
    res.status(500).json({ error: error.message || "Failed to generate pronunciation feedback" });
  }
});

// Vite middleware / production serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BoliEnglish server running on port ${PORT}`);
  });
}

startServer();
