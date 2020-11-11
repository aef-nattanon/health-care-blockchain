import crypto from '../helpers/crypto'
export default class ParticipantBlock {
  constructor(index, previousHash, timestamp, data, hash) {
    this.index = index;
    this.previousHash = previousHash.toString();
    this.timestamp = timestamp;
    this.hash = hash.toString();
    this.setData(data);
  }

  setData(data) {
    // this.data = crypto.encryption(data)
    this.data = data
  }

  getData() {
    // return crypto.decryption(this.data)
    return this.data
  }
}
