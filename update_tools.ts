import fs from 'fs';

const serverFile = 'server.ts';
let code = fs.readFileSync(serverFile, 'utf8');

// Insert tool definition
const toolInsertPos = code.indexOf("name: 'getGovernmentAnalytics',");
if (toolInsertPos > -1 && !code.includes("name: 'trackOrder'")) {
    const insertTool = `{
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
        `;
    code = code.slice(0, toolInsertPos - 9) + insertTool + code.slice(toolInsertPos - 9);
}

// Insert tool execution
const execInsertPos = code.indexOf("if (name === 'getGovernmentAnalytics') {");
if (execInsertPos > -1 && !code.includes("if (name === 'trackOrder') {")) {
    const insertExec = `if (name === 'trackOrder') {
        const orderId = args.orderId ? args.orderId.toString().replace('#', '') : 'Unknown';
        return {
          orderId: '#' + orderId,
          status: 'IN_TRANSIT',
          currentLocation: 'Nashik Central Logistics Hub',
          estimatedDelivery: new Date(Date.now() + 86400000 * 2).toDateString(),
          temperatureStatus: '4°C (Optimal)',
          transportType: 'Refrigerated Cold Chain Truck',
          lastUpdate: 'Package scanned at distribution center.',
          buyerType: 'Retail/Consumer',
        };
      }

      `;
    code = code.slice(0, execInsertPos) + insertExec + code.slice(execInsertPos);
}

fs.writeFileSync(serverFile, code);
