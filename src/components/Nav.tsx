//@ts-ignore
import React from "react";
import Link from "next/link";
import { create as ipfsHttpClient } from "ipfs-http-client";


const projectId = process.env.PROJECT_ID;
const projectSecret = process.env.INFURA_API_SECRET;
const authorization = "Basic " + Buffer.from((projectId + ":" + projectSecret),"base64");

const ipfs = ipfsHttpClient({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers:{
    authorization
  }
})

const onSubmitHandler = async (event: { preventDefault: () => void; target: any; }) => {

  event.preventDefault();
  const form = event.target;
  const files = form.files;

  if (!files || files.length === 0) {
    return alert("No files selected");
  }

  const file = files[0];
  const result = await ipfs.add(file);


 

  form.reset();
};

function Nav() {
  return (
    <div className="top-0 flex border-0 border-b-[1px] border-[#282828] justify-around">
      <div className="flex m-3  relative items-center jutify-center ">
        <img src="./logo.svg" alt="logo" className="mr-2 h-5" />
        <Link href="/">
          <h1 className="text-title text-2xl pb-1 ">peercode</h1>
        </Link>
      </div>
      {/* <div>
      <input type="file" onChange={(e)=>onSubmitHandler(e)} />
    </div> */}
    </div>
  );
}

export default Nav;
