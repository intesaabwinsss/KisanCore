import fs from 'fs';

const serverFile = 'server.ts';
let code = fs.readFileSync(serverFile, 'utf8');

const badChunk = `        {
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
        },
                 name: 'getGovernmentAnalytics',`;

const goodChunk = `        {
          name: 'trackOrder',
          description: 'Track the real-time status and details of a specific order by its Order ID. This has access to ALL orders across the platform (Farmers, Consumers, Retail).',
          parameters: {
            type: Type.OBJECT,
            properties: {
              orderId: { type: Type.STRING, description: 'The Order ID (e.g., #10243 or 10243)' }
            },
            required: ['orderId']
          }
        },
        {
          name: 'getGovernmentAnalytics',`;

code = code.replace(badChunk, goodChunk);

fs.writeFileSync(serverFile, code);
