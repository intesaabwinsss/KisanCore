import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function run() {
  try {
    const tools = [{
      functionDeclarations: [
        {
          name: 'trackOrder',
          description: 'Track the real-time status and details of a specific order by its Order ID. This has access to ALL orders across the platform (Farmers, Consumers, Retail).',
          parameters: {
            type: Type.OBJECT,
            properties: {
              orderId: { type: Type.STRING, description: 'The Order ID (e.g., #10243 or 10243)' }
            },
            required: ['orderId']
          }
        }
      ]
    }];

    const formattedMessages = [{ role: 'user', parts: [{text: 'where is Order #10243'}] }];
    
    let response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: formattedMessages,
      config: {
        tools,
        temperature: 0.7,
      }
    });

    console.log("FIRST RESPONSE:", JSON.stringify(response.functionCalls));
    
    // simulate execute
    const functionResponses = response.functionCalls!.map((call: any) => ({
      id: call.id, name: call.name, response: { status: 'IN_TRANSIT' }
    }));

    if (response.candidates && response.candidates.length > 0 && response.candidates[0].content) {
      formattedMessages.push(response.candidates[0].content as any);
    } else {
      formattedMessages.push({ role: 'model', parts: response.functionCalls!.map((c:any) => ({functionCall: c})) } as any);
    }
    formattedMessages.push({ role: 'user', parts: functionResponses.map((r:any) => ({functionResponse: r})) } as any);

    response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: formattedMessages,
      config: { tools, temperature: 0.7 }
    });
    console.log("SECOND RESPONSE:", response.text);

  } catch (e: any) {
    console.error("ERROR:", e);
  }
}
run();
