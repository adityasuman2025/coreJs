const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8080 });

console.log('WebSocket server listening on ws://localhost:8080');

wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket');
  
  // Send live error rate every 1.5 seconds
  const interval = setInterval(() => {
    // Generate realistic error rate around 0.2% to 4.5%
    const errorRate = (Math.random() * 4 + 0.2).toFixed(2);
    ws.send(JSON.stringify({ errorRate: parseFloat(errorRate), timestamp: new Date().toISOString() }));
  }, 1500);

  ws.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});
