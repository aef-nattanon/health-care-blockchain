
import helpers from '../helpers'
const MessageType = {
  QUERY_LATEST: 0,
  QUERY_ALL: 1,
  RESPONSE_BLOCKCHAIN: 2
};

const getLatestBlock = (blockchain) => blockchain[blockchain.length - 1];

const queryChainLengthMsg = () => ({ 'type': MessageType.QUERY_LATEST });
const queryAllMsg = () => ({ 'type': MessageType.QUERY_ALL });
const responseChainMsg = (blockchain) => ({
  'type': MessageType.RESPONSE_BLOCKCHAIN, 'data': JSON.stringify(blockchain)
});
const responseLatestMsg = (blockchain) => ({
  'type': MessageType.RESPONSE_BLOCKCHAIN,
  'data': JSON.stringify([getLatestBlock(blockchain)])
});
export default { MessageType, getLatestBlock, queryChainLengthMsg, queryAllMsg, responseChainMsg, responseLatestMsg }