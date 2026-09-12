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
          description: 'Track the real-time status and details of a specific order by its Order ID.',
          parameters: {
            type: Type.OBJECT,
            properties: {
              orderId: { type: Type.STRING }
            },
            required: ['orderId']
          }
        }
      ]
    }];

    const formattedMessages: any[] = [{ role: 'user', parts: [{text: 'where is Order #10243'}] }];
    
    let response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: formattedMessages,
      config: { tools, temperature: 0.7 }
    });

    if (response.candidates && response.candidates.length > 0 && response.candidates[0].content) {
        formattedMessages.push(response.candidates[0].content as any);
    } 
    
    const functionResponses = response.functionCalls!.map((call: any) => ({
      id: call.id, name: call.name, response: { status: 'IN_TRANSIT' }
    }));

    formattedMessages.push({
      role: 'user',
      parts: functionResponses.map((r:any) => ({functionResponse: { name: r.name, response: r.response, id: r.id }}))
    });
    
    response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: formattedMessages,
      config: { tools, temperature: 0.7 }
    });
    console.log("SECOND CALL SUCCESSFUL:", response.text);

  } catch (e: any) {
    console.error("ERROR:", e);
  }
}
run();
