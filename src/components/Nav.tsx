import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Nav() {
  return (
    <div className="top-0 flex border-0 border-b-[1px] border-[#282828] justify-around">
      <div className="flex m-3  relative items-center jutify-center ">
        <img src="./logo.svg" alt="logo" className="mr-2 h-5" />
        <h1 className="text-title text-2xl pb-1 ">peercode</h1>
      </div>
      <div className="flex items-center">
        <h2></h2>
        <button className="text-subtitle text-sm bg-grey cursor-not-allowed px-2 pl-4 py-1 rounded-md">
          Find Peer <sup className="text-[10px]  bg-grey">soon</sup>
        </button>
        <button className=" text-sm hover:opacity-95 flex mx-5 bg-main text-title border-0 px-2 cursor-pointer py-1 rounded-md  items-center">
          <img
            src="./meet.svg"
            alt="comments"
            className="mx-1 mr-2 h-4 bg-main"
          />
          Join a Room
        </button>
        <div className="">
          {" "}
          <ConnectButton label="Connect Wallet" accountStatus={"full"} />
        </div>
      </div>
    </div>
  );
}

export default Nav;
