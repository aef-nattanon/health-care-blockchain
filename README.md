```

HTTP_PORT=3001 P2P_PORT=6001 PEERS=ws://localhost:6002,ws://localhost:6003 SECRET_KEY=x]vf4yp0yf npm start
HTTP_PORT=3002 P2P_PORT=6002 PEERS=ws://localhost:6001,ws://localhost:6003 SECRET_KEY=x]vf4yp0yf npm start
HTTP_PORT=3003 P2P_PORT=6003 PEERS=ws://localhost:6001,ws://localhost:6002 SECRET_KEY=x]vf4yp0yf npm start

curl -H "Content-type:application/json" --data '{"data" : "Some data to the first block"}' http://localhost:3001/mineBlock
curl -H "Content-type:application/json" --data '{"data" : "Some data to the first block"}' http://localhost:3003/mineBlock
```