import fs from 'fs';

const serverFile = 'server.ts';
let code = fs.readFileSync(serverFile, 'utf8');

const oldLogic = `      if (response.candidates && response.candidates.length > 0 && response.candidates[0].content) {
        formattedMessages.push(response.candidates[0].content);
      } else {
        formattedMessages.push({
          role: 'model',
          parts: response.functionCalls.map(call => ({ functionCall: call }))
        });
      }

      // Append function responses
      formattedMessages.push({
        role: 'user',
        parts: functionResponses.map(r => ({ functionResponse: r }))
      });`;

const newLogic = `      // Add model response
      if (response.candidates && response.candidates.length > 0 && response.candidates[0].content) {
        formattedMessages.push(response.candidates[0].content);
      } else {
         formattedMessages.push({
          role: 'model',
          parts: response.functionCalls.map(call => ({ functionCall: call }))
        });
      }
      
      // Append function responses
      formattedMessages.push({
        role: 'user',
        parts: functionResponses.map(r => ({ functionResponse: { name: r.name, response: r.response, id: r.id } }))
      });`;

if (code.includes(oldLogic)) {
  code = code.replace(oldLogic, newLogic);
  fs.writeFileSync(serverFile, code);
  console.log("Replaced");
} else {
  console.log("Could not find logic to replace");
}
