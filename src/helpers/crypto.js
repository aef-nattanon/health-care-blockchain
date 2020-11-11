import CryptoJS from 'crypto-js'

const calculateHash = (index, previousHash, timestamp, data) => {
  return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
};
const calculateHashForBlock = (block) => {
  return calculateHash(block.index, block.previousHash, block.timestamp, block.data);
};

export default { calculateHash, calculateHashForBlock }