import express from 'express'
import bodyParser from 'body-parser'
import WebSocket from 'ws'
import models from './src/models'
import helpers from './src/helpers'
import blockchainsLogic, { MessageType } from './src/blockchain/logic'
import { write, broadcast, initErrorHandler, initMessageHandler } from './src/socket_servers'

const Block = models.ParticipantBlock
const http_port = process.env.HTTP_PORT || 3001;
const p2p_port = process.env.P2P_PORT || 6001;
const initialPeers = process.env.PEERS ? process.env.PEERS.split(',') : [];

let sockets = [];

const getGenesisBlock = () => {
  return new Block(0, `0`, 1465154705, '', "816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7");
};

let blockchain = [getGenesisBlock()];

const initHttpServer = () => {
  const app = express();
  app.use(bodyParser.json());

  app.get('/blocks', (req, res) => res.send(JSON.stringify(blockchain)));
  app.get('/blocks/:index', (req, res) => {
    res.send(JSON.stringify(blockchain[req.params.index]))
  });
  app.post('/mineBlock', (req, res) => {
    const newBlock = blockchainsLogic.generateNextBlock(req.body.data, blockchain, Block);
    blockchain = blockchainsLogic.addBlock(newBlock, blockchain)
    broadcast(sockets, blockchainsLogic.responseLatestMsg(blockchain));
    console.log('block added: ' + JSON.stringify(newBlock));
    res.send();
  });
  app.get('/peers', (req, res) => {
    res.send(sockets.map(s => s._socket.remoteAddress + ':' + s._socket.remotePort));
  });
  app.post('/addPeer', (req, res) => {
    connectToPeers([req.body.peer]);
    res.send();
  });
  app.listen(http_port, () => console.log('Listening http on port: ' + http_port));
};


const initP2PServer = () => { //init
  const server = new WebSocket.Server({ port: p2p_port });
  server.on('connection', ws => initConnection(ws));
  console.log('listening websocket p2p port on: ' + p2p_port);

};
const initConnection = (ws) => { //init
  sockets.push(ws);
  initMessageHandler(ws, blockchain, sockets, getGenesisBlock, (b) => { blockchain = b });
  initErrorHandler(ws, sockets, (s) => { sockets = s });
  write(ws, blockchainsLogic.queryChainLengthMsg());
};

const connectToPeers = (newPeers) => { //init
  newPeers.forEach((peer) => {
    const ws = new WebSocket(peer);
    ws.on('open', () => initConnection(ws));
    ws.on('error', () => {
      console.log('connection failed')
    });
  });
};

connectToPeers(initialPeers);
initHttpServer();
initP2PServer();