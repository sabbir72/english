import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy OpenAI (ChatGPT) client
let openaiClient: OpenAI | null = null;
function getOpenAI(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey,
    });
  }
  return openaiClient;
}

// Fallback GoogleGenAI client (if OPENAI_API_KEY is not set but GEMINI_API_KEY is)
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

// Unified AI generator supporting ChatGPT primary with Gemini fallback
async function executeAIPrompt({
  systemPrompt,
  userPrompt,
  chatMessages,
  temperature = 0.6,
}: {
  systemPrompt: string;
  userPrompt?: string;
  chatMessages?: { role: "user" | "assistant" | "system"; content: string }[];
  temperature?: number;
}): Promise<any | null> {
  // 1. Try ChatGPT (OpenAI)
  const openai = getOpenAI();
  if (openai) {
    try {
      const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        { role: "system", content: systemPrompt },
      ];

      if (chatMessages && chatMessages.length > 0) {
        for (const m of chatMessages) {
          messages.push({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content,
          });
        }
      }

      if (userPrompt) {
        messages.push({ role: "user", content: userPrompt });
      }

      const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
      const completion = await openai.chat.completions.create({
        model,
        messages,
        response_format: { type: "json_object" },
        temperature,
      });

      const content = completion.choices[0]?.message?.content || "{}";
      const parsed = JSON.parse(content);
      return { ...parsed, _engine: `ChatGPT (${model})` };
    } catch (err: any) {
      console.error("OpenAI ChatGPT call failed, falling back:", err?.message || err);
    }
  }

  // 2. Fallback to Gemini if OpenAI key is not configured
  const gemini = getGenAI();
  if (gemini) {
    try {
      let combinedPrompt = `System: ${systemPrompt}\n\n`;
      if (chatMessages && chatMessages.length > 0) {
        combinedPrompt += "Conversation:\n" + chatMessages.map((m) => `${m.role}: ${m.content}`).join("\n") + "\n\n";
      }
      if (userPrompt) {
        combinedPrompt += `Task/User Request: ${userPrompt}\n\n`;
      }
      combinedPrompt += "Respond ONLY with valid JSON.";

      const response = await gemini.models.generateContent({
        model: "gemini-2.5-flash",
        contents: combinedPrompt,
        config: {
          responseMimeType: "application/json",
          temperature,
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      return { ...parsed, _engine: "Gemini 2.5 Flash" };
    } catch (err: any) {
      console.error("Gemini fallback call failed:", err?.message || err);
    }
  }

  return null;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);
  const hasGemini = Boolean(process.env.GEMINI_API_KEY);
  res.json({
    status: "ok",
    aiEngine: hasOpenAI ? "ChatGPT (OpenAI)" : (hasGemini ? "Gemini Fallback" : "ChatGPT Demo Mode"),
    hasOpenAIKey: hasOpenAI,
    hasGeminiKey: hasGemini,
    model: hasOpenAI ? (process.env.OPENAI_MODEL || "gpt-4o-mini") : (hasGemini ? "gemini-2.5-flash" : "gpt-4o-mini (simulated)"),
    time: new Date().toISOString(),
  });
});

// 1. AI Conversation Endpoint (ChatGPT powered)
app.post("/api/ai/conversation", async (req, res) => {
  try {
    const { messages, topic, mode, userLevel } = req.body;
    const lastUserMsg = messages && messages.length > 0 ? messages[messages.length - 1].content : "";

    const systemPrompt = `You are a warm, encouraging, expert English Teacher and conversation partner powered by ChatGPT for Bengali-speaking learners.
Context:
- User Proficiency Level: ${userLevel || "Beginner (A1/A2)"}
- Conversation Scenario: ${topic || "Daily Life"}
- Mode: ${mode === "teacher" ? "English Teacher Mode" : "Free Conversation Mode"}

Guidelines:
1. Respond in clear, natural, spoken English appropriate for the learner's level.
2. In "English Teacher Mode":
   - Carefully review the user's latest statement for grammar, tense, vocabulary, or word order mistakes.
   - If there is a mistake, explain kindly in simple, accessible Bengali (বাংলা), provide the corrected sentence, and state the rule.
   - If the sentence is already correct, set hasMistake to false and praise their phrasing.
   - Provide a natural "betterAlternative" sentence and a practical Bengali tip.
3. In "Free Conversation Mode":
   - Keep the conversation flowing smoothly like a real friend while modeling natural expressions.
4. Always include a follow-up question in English to keep the conversation going.
5. Provide Bengali translation ("banglaTranslation") for your response so the learner can cross-check.

Return ONLY a valid JSON object matching this schema:
{
  "reply": "Your conversational response in English",
  "banglaTranslation": "আপনার উত্তরের সহজ বাংলা অনুবাদ",
  "correction": {
    "hasMistake": boolean,
    "original": "what the user wrote",
    "corrected": "natural and grammatically correct English version",
    "banglaExplanation": "সহজ বাংলায় ভুলের কারণ ও সঠিক নিয়ম",
    "tips": "বাঙালি শিক্ষার্থীদের জন্য প্রয়োজনীয় পরামর্শ"
  } or null,
  "betterAlternative": "A more native/idiomatic way to express the same thought",
  "tipBangla": "ইংরেজি কথোপকথন উন্নত করার ১টি সহজ বাংলা টিপস",
  "followUpQuestion": "A friendly follow-up question in English to keep speaking"
}`;

    const history = (messages || []).slice(-8).map((m: any) => ({
      role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
      content: m.content || "",
    }));

    const result = await executeAIPrompt({
      systemPrompt,
      chatMessages: history,
      temperature: 0.7,
    });

    if (result) {
      return res.json(result);
    }

    // Graceful offline/demo response with ChatGPT styling
    const isTeacher = mode === "teacher";
    return res.json({
      reply: `That's great! You said: "${lastUserMsg}". Consistency is key to mastering English. Could you tell me more about your daily routine?`,
      banglaTranslation: `চমৎকার! আপনি বললেন: "${lastUserMsg}"। নিয়মিত অনুশীলনই ইংরেজি শেখার মূল চাবিকাঠি। আপনার দৈনন্দিন রুটিন সম্পর্কে কি আর একটু বলতে পারেন?`,
      correction: isTeacher
        ? {
            hasMistake: false,
            original: lastUserMsg,
            corrected: lastUserMsg,
            banglaExplanation: "আপনার বাক্যটি সুন্দর ও অর্থবোধক হয়েছে। প্রতিনিয়ত এভাবে বলার চেষ্টা করুন।",
            tips: "প্রতিদিন অন্তত ৫টি নতুন বাক্য নিজে নিজে ইংরেজিতে উচ্চারণ করে বলুন।",
          }
        : null,
      betterAlternative: `I usually spend my time practicing English speaking with ChatGPT every day.`,
      tipBangla: "কথা বলার সময় দ্বিধা না করে স্বতঃস্ফূর্তভাবে বলা চালিয়ে যান।",
      followUpQuestion: "What time do you usually wake up in the morning?",
      _engine: "ChatGPT Demo",
    });
  } catch (error: any) {
    console.error("AI Conversation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI conversation response" });
  }
});

// 2. AI "Ask" Feature (Grammar, Vocabulary & Nuances)
app.post("/api/ai/ask", async (req, res) => {
  try {
    const query = req.body.query || req.body.question;
    const userLevel = req.body.userLevel || "Beginner";

    if (!query) {
      return res.status(400).json({ error: "Query or question is required" });
    }

    const systemPrompt = `You are an expert English Language Professor & ChatGPT Tutor for Bengali speakers.
Learner query: "${query}"
Learner proficiency level: ${userLevel}

Provide a comprehensive, crystal-clear explanation tailored specifically for Bengali learners.
Return ONLY valid JSON with this exact schema:
{
  "title": "Clear English topic heading",
  "explanation": "Clear explanation in English using simple language",
  "banglaMeaning": "সহজ ও প্রাঞ্জল বাংলায় বিশদ ব্যাখ্যা ও নিয়ম",
  "pronunciation": "IPA or easy Bengali phonetic pronunciation guide (if applicable)",
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

    const result = await executeAIPrompt({
      systemPrompt,
      userPrompt: `Explain this English concept or answer this question for a Bengali learner: "${query}"`,
      temperature: 0.3,
    });

    if (result) {
      // Normalize response so all frontend keys match
      return res.json({
        ...result,
        answer: result.explanation || result.answer,
        banglaExplanation: result.banglaMeaning || result.banglaExplanation,
      });
    }

    // High quality demo fallback
    return res.json({
      title: query,
      explanation: `In English, "${query}" is commonly used in everyday conversations, writing, and formal communication.`,
      answer: `In English, "${query}" is commonly used in everyday conversations, writing, and formal communication.`,
      banglaMeaning: `"${query}" সম্পর্কে বাংলায়: এটি নিয়মিত ব্যাকরণ ও কথোপকথনে ব্যবহৃত হয়। সাবজেক্ট ও ভার্বের সঙ্গতি বজায় রেখে বাক্য গঠন করুন।`,
      banglaExplanation: `"${query}" সম্পর্কে বাংলায়: এটি নিয়মিত ব্যাকরণ ও কথোপকথনে ব্যবহৃত হয়। সাবজেক্ট ও ভার্বের সঙ্গতি বজায় রেখে বাক্য গঠন করুন।`,
      pronunciation: `/${query.toLowerCase().replace(/[^a-z]/g, "")}/`,
      examples: [
        { english: `I practice "${query}" regularly.`, bangla: `আমি নিয়মিত এটি অনুশীলন করি।` },
        { english: `She explained how to use it properly.`, bangla: `তিনি ব্যাখ্যা করলেন কীভাবে এটি সঠিকভাবে ব্যবহার করতে হয়।` },
        { english: `Good habits make English easy to learn.`, bangla: `ভালো অভ্যাস ইংরেজি শেখাকে সহজ করে তোলে।` },
      ],
      grammarNote: "Subject + Verb agreement is crucial for Bengali learners (e.g., He goes, not He go).",
      practiceQuestion: {
        question: "Choose the correct sentence:",
        options: ["I am go to school", "I go to school", "I goes to school", "I going to school"],
        correctIndex: 1,
        explanationBangla: "Present Indefinite tense-এ 'I'-এর পর verb-এর base form বসে।",
      },
      _engine: "ChatGPT Demo",
    });
  } catch (error: any) {
    console.error("AI Ask error:", error);
    res.status(500).json({ error: error.message || "Failed to process query" });
  }
});

// 3. AI Sentence Generator (Supports /api/ai/sentence-generator & /api/ai/generate-sentences)
const handleSentenceGenerator = async (req: express.Request, res: express.Response) => {
  try {
    const word = req.body.word || req.body.keywordOrTopic || "improve";
    const tenseOrStructure = req.body.tenseOrStructure || "Present Simple";
    const level = req.body.level || req.body.userLevel || "Beginner";

    const systemPrompt = `You are a ChatGPT Sentence Generator for Bengali-speaking English learners.
Target: "${word}"
Tense/Structure focus: "${tenseOrStructure}"
Level: "${level}"

Generate practical, natural English sentences across Simple, Intermediate, and Advanced tiers with Bengali meanings, formulas, and a fill-in-the-blank practice question.
Return ONLY valid JSON with this exact schema:
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
    "correctAnswer": "${word}",
    "explanationBangla": "বাংলায় সহজ ব্যাখ্যা"
  },
  "sentences": [
    { "level": "Simple", "text": "Simple sentence", "bangla": "বাংলা", "structure": "Formula" },
    { "level": "Intermediate", "text": "Intermediate sentence", "bangla": "বাংলা", "structure": "Formula" },
    { "level": "Advanced", "text": "Advanced sentence", "bangla": "বাংলা", "structure": "Formula" }
  ]
}`;

    const result = await executeAIPrompt({
      systemPrompt,
      userPrompt: `Generate comprehensive sentences for "${word}" under structure "${tenseOrStructure}".`,
      temperature: 0.3,
    });

    if (result) {
      return res.json(result);
    }

    // High quality demo fallback
    return res.json({
      word,
      partOfSpeech: "verb",
      banglaMeaning: "উন্নতি করা / বাড়ানো",
      simple: {
        sentence: `I want to ${word} my English speaking skills.`,
        bangla: `আমি আমার ইংরেজি বলার দক্ষতা উন্নত করতে চাই।`,
        structure: "Subject + want to + Verb + Object",
      },
      intermediate: {
        sentence: `Consistent daily practice will help you ${word} faster.`,
        bangla: `ধারাবাহিক দৈনিক অনুশীলন আপনাকে দ্রুত উন্নতি করতে সাহায্য করবে।`,
        structure: "Subject + will help + Object + bare infinitive",
      },
      advanced: {
        sentence: `Substantial efforts were made to ${word} the system efficiency.`,
        bangla: `সিস্টেমের কার্যদক্ষতা বৃদ্ধি করতে ব্যাপক প্রচেষ্টা চালানো হয়েছিল।`,
        structure: "Passive voice: Subject + were made + to-infinitive",
      },
      relatedVocab: [
        { word: "progress", bangla: "অগ্রগতি", pos: "noun" },
        { word: "enhance", bangla: "বৃদ্ধি করা", pos: "verb" },
        { word: "fluent", bangla: "সাবলীল", pos: "adjective" },
      ],
      practiceQuestion: {
        sentenceWithBlank: `Reading books every day helps _____ your vocabulary.`,
        options: [word, "improvingly", "improves", "improved"],
        correctAnswer: word,
        explanationBangla: "helps-এর পর bare infinitive (verb base form) বসে।",
      },
      sentences: [
        { level: "Simple", text: `I want to ${word} my English speaking.`, bangla: "আমি আমার ইংরেজি বলা উন্নত করতে চাই।", structure: "Subject + want to + Verb" },
        { level: "Intermediate", text: `Daily practice will ${word} your confidence.`, bangla: "দৈনিক চর্চা আপনার আত্মবিশ্বাস বৃদ্ধি করবে।", structure: "Subject + Modal + Verb + Object" },
        { level: "Advanced", text: `Continuous reading significantly helps ${word} comprehension.`, bangla: "নিরবচ্ছিন্ন পাঠ বোধগম্যতা উল্লেখযোগ্যভাবে বৃদ্ধি করে।", structure: "Adverb + Verb + Noun" },
      ],
      _engine: "ChatGPT Demo",
    });
  } catch (error: any) {
    console.error("AI Sentence Generator error:", error);
    res.status(500).json({ error: error.message || "Failed to generate sentences" });
  }
};

app.post("/api/ai/sentence-generator", handleSentenceGenerator);
app.post("/api/ai/generate-sentences", handleSentenceGenerator);

// 4. AI Vocabulary Builder by Topic (Supports /api/ai/vocab-builder & /api/ai/generate-vocab)
const handleVocabBuilder = async (req: express.Request, res: express.Response) => {
  try {
    const topic = req.body.topic || req.body.vocabTopic || "Job Interview";
    const userLevel = req.body.userLevel || "Beginner to Intermediate";

    const systemPrompt = `You are a ChatGPT Vocabulary Specialist for Bengali English learners.
Topic: "${topic}"
Level: "${userLevel}"

Generate 8 essential, practical, high-frequency English vocabulary words for this scenario.
Return ONLY valid JSON with this schema:
{
  "topic": "${topic}",
  "words": [
    {
      "word": "word",
      "bangla": "বাংলা অর্থ",
      "pronunciation": "বাংলা উচ্চারণ (/IPA/)",
      "partOfSpeech": "noun / verb / adjective / adverb",
      "example": "Natural English sentence",
      "exampleBangla": "বাংলা অনুবাদ"
    }
  ]
}`;

    const result = await executeAIPrompt({
      systemPrompt,
      userPrompt: `Generate 8 essential English words for the scenario: "${topic}".`,
      temperature: 0.3,
    });

    if (result) {
      return res.json({
        ...result,
        vocab: result.words || [],
      });
    }

    return res.json({
      topic,
      words: [
        {
          word: "Meeting",
          bangla: "সভা / বৈঠক",
          pronunciation: "মিটিং (/ˈmiː.tɪŋ/)",
          partOfSpeech: "noun",
          example: "We have an urgent team meeting at 10 AM.",
          exampleBangla: "সকাল ১০টায় আমাদের একটি জরুরি টিম মিটিং আছে।",
        },
        {
          word: "Deadline",
          bangla: "নির্দিষ্ট শেষ সময়সীমা",
          pronunciation: "ডেডলাইন (/ˈded.laɪn/)",
          partOfSpeech: "noun",
          example: "Can we submit the report before the deadline?",
          exampleBangla: "আমরা কি সময়সীমার আগে রিপোর্টটি জমা দিতে পারি?",
        },
        {
          word: "Schedule",
          bangla: "সময়সূচী / সময় নির্ধারণ করা",
          pronunciation: "শিডিউল (/ˈʃedʒ.uːl/ বা /ˈskedʒ.uːl/)",
          partOfSpeech: "noun / verb",
          example: "Please check your daily schedule.",
          exampleBangla: "অনুগ্রহ করে আপনার দৈনিক সময়সূচী পরীক্ষা করুন।",
        },
        {
          word: "Colleague",
          bangla: "সহকর্মী",
          pronunciation: "কলিগ (/ˈkɒl.iːɡ/)",
          partOfSpeech: "noun",
          example: "My colleagues are very helpful and friendly.",
          exampleBangla: "আমার সহকর্মীরা অত্যন্ত সহযোগিতাপূর্ণ এবং বন্ধুসুলভ।",
        },
      ],
      vocab: [
        { word: "Meeting", bangla: "সভা / বৈঠক", pronunciation: "মিটিং (/ˈmiː.tɪŋ/)", partOfSpeech: "noun", example: "We have an urgent team meeting at 10 AM.", exampleBangla: "সকাল ১০টায় আমাদের একটি জরুরি টিম মিটিং আছে।" },
        { word: "Deadline", bangla: "নির্দিষ্ট শেষ সময়সীমা", pronunciation: "ডেডলাইন (/ˈded.laɪn/)", partOfSpeech: "noun", example: "Can we submit the report before the deadline?", exampleBangla: "আমরা কি সময়সীমার আগে রিপোর্টটি জমা দিতে পারি?" },
      ],
      _engine: "ChatGPT Demo",
    });
  } catch (error: any) {
    console.error("AI Vocab Builder error:", error);
    res.status(500).json({ error: error.message || "Failed to build vocabulary" });
  }
};

app.post("/api/ai/vocab-builder", handleVocabBuilder);
app.post("/api/ai/generate-vocab", handleVocabBuilder);

// 5. AI Pronunciation Feedback (ChatGPT Powered)
app.post("/api/ai/pronunciation-feedback", async (req, res) => {
  try {
    const { targetText, spokenText } = req.body;
    if (!targetText) {
      return res.status(400).json({ error: "Target text is required" });
    }

    const systemPrompt = `Analyze this English pronunciation attempt by a Bengali-speaking learner:
Target text: "${targetText}"
Spoken speech recognition result: "${spokenText || ""}"

Evaluate phonetic accuracy, syllable stress, and typical Bengali accent challenges (such as /v/ vs /b/, /p/ aspiration, /s/ vs /sh/, vowel lengthening, silent letters).
Return ONLY valid JSON with this schema:
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

    const result = await executeAIPrompt({
      systemPrompt,
      userPrompt: `Target: "${targetText}" | Spoken: "${spokenText || ""}"`,
      temperature: 0.2,
    });

    if (result) {
      return res.json(result);
    }

    const match = spokenText?.trim().toLowerCase() === targetText.trim().toLowerCase();
    return res.json({
      accuracyScore: match ? 95 : 75,
      targetText,
      spokenText: spokenText || "Not recognized clearly",
      status: match ? "Excellent" : "Good Progress",
      ipa: "/tɑːr.ɡɪt/",
      syllables: targetText.split(" ").join(" · "),
      stressInfo: "Stress the primary syllable clearly.",
      banglaTips: "স্পষ্টভাবে প্রতিটি সিলেবল উচ্চারণ করার চেষ্টা করুন। ঠোঁট ও জিহ্বার অবস্থান লক্ষ্য করুন।",
      correctiveAdvice: "Listen to the native audio and speak along with it at normal speed.",
      _engine: "ChatGPT Demo",
    });
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
    console.log(`BoliEnglish ChatGPT-powered server running on port ${PORT}`);
  });
}

startServer();

