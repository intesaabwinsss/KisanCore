import fs from 'fs';

const serverFile = 'server.ts';
let code = fs.readFileSync(serverFile, 'utf8');

const badLoop = `      // Append model's tool calls
      formattedMessages.push({
        role: 'model',
        parts: response.functionCalls.map(call => ({ functionCall: call }))
      });`;

const goodLoop = `      // Append model's tool calls
      if (response.candidates && response.candidates.length > 0 && response.candidates[0].content) {
        formattedMessages.push(response.candidates[0].content);
      } else {
        formattedMessages.push({
          role: 'model',
          parts: response.functionCalls.map(call => ({ functionCall: call }))
        });
      }`;

if (code.includes(badLoop)) {
  code = code.replace(badLoop, goodLoop);
  fs.writeFileSync(serverFile, code);
  console.log("Replaced!");
} else {
  console.log("Could not find badLoop string");
}
