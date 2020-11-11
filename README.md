```

HTTP_PORT=3001 P2P_PORT=6001 PEERS=ws://localhost:6002,ws://localhost:6003,ws://localhost:6004 SECRET_KEY=x]vf4yp0yf npm start
HTTP_PORT=3002 P2P_PORT=6002 PEERS=ws://localhost:6001,ws://localhost:6003,ws://localhost:6004 SECRET_KEY=x]vf4yp0yf npm start
HTTP_PORT=3003 P2P_PORT=6003 PEERS=ws://localhost:6001,ws://localhost:6002,ws://localhost:6004 SECRET_KEY=x]vf4yp0yf npm start
HTTP_PORT=3004 P2P_PORT=6004 PEERS=ws://localhost:6001,ws://localhost:6002,ws://localhost:6003 SECRET_KEY=x]vf4yp0yf npm start


curl -H "Content-type:application/json" --data '{"data" : {"first_name": "firstname", "last_name" : "last_name"}}' http://localhost:3002/mineParticipant

```
http://localhost:3001/participants/

http://localhost:3001/participants/1/data

http://localhost:3001/peers/