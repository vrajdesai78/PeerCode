//@ts-ignore
import { useRouter } from "next/router";
import { useState } from "react";
import {
  HuddleClientProvider,
  getHuddleClient,
} from "@huddle01/huddle01-client";

import { useHuddleStore } from "@huddle01/huddle01-client/store";
import PeerVideoAudioElem from "../components/PeerElement";
import MeVideoElem from "../components/MyVideoElement";
import { useAccount } from "wagmi";
import _ from "lodash";

import dynamic from "next/dynamic";

const WhiteBoard = dynamic(() => import("../components/WhiteBoard"), {
  ssr: false,
});
const Editor = dynamic(() => import("../components/Editor"), {
  ssr: false,
});
const Notes = dynamic(() => import("../components/Notes"), {
  ssr: false,
});

const WORKSPACES = {
  EDITOR: "Editor",
  WHITEBOARD: "Whiteboard",
  NOTES: "Notes",
};

const Room = () => {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const { roomid } = router.query;
  const userid = _.random(1000);
  const [workspace, setWorkspace] = useState(WORKSPACES.EDITOR);
  const huddleClient = getHuddleClient(
    "a74eec0d320d1ddbcedc423d4e8fc2dce13e007ca4ad16e1acac164b909efdd7"
  );
 
  const peersKeys = useHuddleStore((state) => Object.keys(state.peers));
  const lobbyPeers = useHuddleStore((state) => state.lobbyPeers);
  const [webcam, setWebcam] = useState(false);
  const [mic,setMic] = useState<boolean>(false);
  
  const [join,setJoin] = useState<boolean>(false);
  const addr = address as string;

  const handleJoin = async () => {
    try {
      await huddleClient.join(roomid as string, {
        address: addr,
        wallet: "metamask",
        ens: "  ",
      });

      console.log("joined");
    } catch (error) {
      console.log({ error });
    }
  };
  const handleWebcam = async () => {
    if (webcam) {
      huddleClient.enableWebcam();
    } else {
      huddleClient.disableWebcam();
    }
    setWebcam((prev) => !prev);
  };

  const handleMic = async () => {
    if (mic) {
      huddleClient.enableMic();
    } else {
      huddleClient.disableMic();
    }
    setMic((prev) => !prev);
  };
  return (
    <HuddleClientProvider value={huddleClient}>
        <p className="m-2 opacity-75">RoomID: {roomid}</p>

      <main className="flex justify-evenly mt-5 ">
        <section className="mt-5">
          <div>
            <div className="w-fit flex items-center flex-col">
              <MeVideoElem webcam={webcam} />
        {!join &&  <button
                className="m-1 bg-grey p-1 rounded-md w-[306px] flex items-center justify-center"
                onClick={()=>{handleJoin()
                setJoin(true)}}
              >
                I'm Ready
              </button>}

              <button
                className=" m-1 bg-grey p-1 rounded-md w-[306px] flex items-center justify-center"
                onClick={handleMic}
              >
                {mic ? (
                  <img
                    src="./mic.svg"
                    alt="webcam on"
                    className="mx-1 mr-2 h-4 bg-grey"
                  />
                ) : (
                  <img
                    src="./micoff.svg"
                    alt="webcam off"
                    className="mx-1 mr-2 h-4 bg-grey"
                  />
                )}
                Mic
              </button>
              <button
                className=" m-1 bg-grey p-1 rounded-md w-[306px] flex items-center justify-center"
                onClick={handleWebcam}
              >
                {webcam ? (
                  <img
                    src="./cam.svg"
                    alt="webcam on"
                    className="mx-1 mr-2 h-4 bg-grey"
                  />
                ) : (
                  <img
                    src="./camoff.svg"
                    alt="webcam off"
                    className="mx-1 mr-2 h-4 bg-grey"
                  />
                )}{" "}
                Webcam
              </button>
            </div>
            {lobbyPeers[0] && <h2 className="px-4 text-lg">Lobby Peers 👾</h2>}
            {lobbyPeers[0] && <p className="cursor-pointer bg-grey p-4 mb-4 mt-2 rounded-lg" onClick={()=>{huddleClient.allowAllLobbyPeersToJoinRoom();}}>Allow everyone to join ✨ </p>}
            
          
              {lobbyPeers.map((peer) => (
                <div  className="p-4 bg-grey flex-col rounded-lg flex gap-2" key={peer.peerId}><p>{peer.displayName?peer.displayName:peer.peerId} 🧑🏼‍💻 wants to join peercoding session:</p>
                <p className="bg-main p-2 rounded-lg" onClick={()=>{huddleClient.allowLobbyPeerToJoinRoom(peer.peerId)}}>Allow ✅ </p>
                <p  className="bg-main p-2 rounded-lg" onClick={()=>{huddleClient.disallowLobbyPeerFromJoiningRoom(peer.peerId)}}> Deny 🙅🏻‍♂️</p> </div>
              ))}
           

            {peersKeys[0] && <h2>Peers</h2>}

            <div>
              {peersKeys.map((key) => (
                <PeerVideoAudioElem key={`peerId-${key}`} peerIdAtIndex={key} />
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="flex">
            <div
              className={`${
                workspace === WORKSPACES.EDITOR
                  ? " bg-main text-title "
                  : " bg-grey  border-t-0 border-b-0 border-l-0 border-r-[1px]  border-[#1D1D1C] "
              }  rounded-tl-md text-sm cursor-pointer p-1 px-2`}
              onClick={() => setWorkspace(WORKSPACES.EDITOR)}
            >
              {WORKSPACES.EDITOR}
            </div>
            <div
              className={`${
                workspace === WORKSPACES.NOTES
                  ? " bg-main text-title  "
                  : " bg-grey  "
              }  text-sm  cursor-pointer p-1 px-2`}
              onClick={() => setWorkspace(WORKSPACES.NOTES)}
            >
              {WORKSPACES.NOTES}
            </div>
            <div
              className={`${
                workspace === WORKSPACES.WHITEBOARD
                  ? " bg-main text-title "
                  : " bg-grey border-t-0 border-b-0 border-r-0 border-l-[1px]  border-[#1D1D1C] "
              } rounded-tr-md text-sm  cursor-pointer p-1 px-2`}
              onClick={() => setWorkspace(WORKSPACES.WHITEBOARD)}
            >
              {WORKSPACES.WHITEBOARD}
            </div>
          </div>
          <div className="relative w-[70vw] h-[80vh]  rounded-tl-none  bg-[#1E1E1E] rounded-md border-main border-2  ">
            {workspace === WORKSPACES.EDITOR && (
              <Editor roomid={roomid} userid={userid} />
            )}
            {workspace === WORKSPACES.WHITEBOARD && (
              <WhiteBoard roomid={roomid} userid={userid} />
            )}
            {workspace === WORKSPACES.NOTES && (
              <Notes roomid={roomid} userid={userid} />
            )}
          </div>
        </section>
      </main>
    </HuddleClientProvider>
  );
};

export default Room;
