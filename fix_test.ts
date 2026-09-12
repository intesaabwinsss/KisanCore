import fs from 'fs';

let code = fs.readFileSync('test_chat.ts', 'utf8');

const badLoop = `    formattedMessages.push({ role: 'model', parts: response.functionCalls!.map((c:any) => ({functionCall: c})) } as any);`;

const goodLoop = `    if (response.candidates && response.candidates.length > 0 && response.candidates[0].content) {
      formattedMessages.push(response.candidates[0].content as any);
    } else {
      formattedMessages.push({ role: 'model', parts: response.functionCalls!.map((c:any) => ({functionCall: c})) } as any);
    }`;

code = code.replace(badLoop, goodLoop);
fs.writeFileSync('test_chat.ts', code);
