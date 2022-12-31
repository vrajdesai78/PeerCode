import { io } from "socket.io-client";
import axios from 'axios';

export const initSocket = async () => {
  const options = {
    "force new connection": true,
    reconnectionAttempt: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };
  return io("localhost:1234" as string, options);
};

export function generateCode() {

  let code = "";
  for (let i = 0; i < 12; i++) {
    let number = Math.floor(Math.random() * 36);
    let character = number < 10 ? String(number) : String.fromCharCode(number - 10 + 65);
    code += character;
  }

  return code;
}
export const uploadToIPFS = async (event:any) => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post('https://api.ipfs.io/api/v0/add', formData);
  const ipfsHash = response.data.Hash;

  console.log(`File uploaded to IPFS with hash: ${ipfsHash}`);
}
