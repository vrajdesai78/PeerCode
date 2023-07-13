import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { generateCode } from "../utils";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [inputRoomId, setInputRoomId] = useState("");
  const [index, setIndex] = useState(0);
  const list = ["demo-1.png", "demo-2.png", "demo-3.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => index + 1);
    }, 1750);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const createRoom = async () => {
    const apiCall = await fetch("/api/create-room", {
      method: "POST",
    });
    const { data } = await apiCall.json();
    router.push(`/${data.roomId}`);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-evenly mt-5 sm:mt-10 items-center">
        <div className=" sm:w-[40vw]">
          <h3 className="text-subtitle text-[20px]">
            Brainstorm! Wireframe! Jot Down! Collaborate!
          </h3>
          <h2 className="text-[45px] text-title mb-2">
            Take <span className="text-main">Development Collaboration</span> to
            the next level
          </h2>
          <h1></h1>
          <h3 className="text-[18px] text-subtitle ml-1">
            Built using <span className="text-main">{"Huddle01's"}</span> Web3
            video infrastructure
          </h3>
          <button className="text-subtitle text-lg bg-grey cursor-not-allowed px-2 pl-4 mt-3  py-1 rounded-md">
            Find Peer <sup className="text-[10px]  bg-grey">soon</sup>
          </button>
          {isConnected ? (
            <div className="flex mt-2 justify-start">
              <div className="flex">
                <button
                  onClick={() => router.push(inputRoomId)}
                  className=" mt-3 text-lg hover:opacity-95 flex mx-5 bg-main text-title border-0 px-2 cursor-pointer py-1 rounded-md  items-center"
                >
                  <img
                    src="./meet.svg"
                    alt="comments"
                    className="mx-1 mr-2 h-4 bg-main"
                  />
                  Join a Room
                </button>
                <input
                  onChange={(e) => {
                    setInputRoomId(e.target.value);
                  }}
                  value={inputRoomId}
                  placeholder="Enter RoomID:"
                  className=" mt-3 h-10 text-lg  bg-grey outline-none placeholder:px-2 px-2 text-title  rounded-md  items-center"
                />
              </div>
              <button
                className=" mt-3 text-lg hover:opacity-95 flex mx-5 bg-main text-title border-0 px-2 cursor-pointer py-1 rounded-md  items-center"
                onClick={async () => {
                  await createRoom();
                }}
              >
                Create a Room
              </button>
            </div>
          ) : (
            <div className=" flex mt-4">
              <ConnectButton label="Connect Wallet" accountStatus={"full"} />
            </div>
          )}
        </div>
        <img
          src={list[index % list.length]}
          alt="demo"
          className="sm:w-[50vw] m-2"
        />
      </div>
    </>
  );
}
