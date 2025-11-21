import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from '../constants';

let chatSession: Chat | null = null;

const initializeChat = () => {
  if (chatSession) return chatSession;

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key is missing. AI features will not work.");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: AI_SYSTEM_INSTRUCTION,
      temperature: 0.8, // Slightly higher creativity for the persona
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<AsyncGenerator<string, void, unknown> | null> => {
  const session = initializeChat();
  
  if (!session) {
    async function* mockGenerator() {
      const mockResponse = "🌸 哎呀，我的靈力似乎耗盡了 (API Key 缺失)。請聯繫幽影櫻大人修復我的連結！";
      const words = mockResponse.split('');
      for (const word of words) {
        await new Promise(resolve => setTimeout(resolve, 30));
        yield word;
      }
    }
    return mockGenerator();
  }

  try {
    const result = await session.sendMessageStream({ message });
    
    async function* streamGenerator() {
      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          yield c.text;
        }
      }
    }
    
    return streamGenerator();
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
     async function* errorGenerator() {
      yield "⚡ 通訊干擾... (AI Core Error)";
    }
    return errorGenerator();
  }
};