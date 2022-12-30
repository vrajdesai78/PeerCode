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

  const addr = address as string;

  const handleJoin = async () => {
    try {
      await huddleClient.join(roomid as string, {
        address: addr,
        wallet: "metamask",
        ens: "pratham.eth",
      });

      console.log("joined");
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <HuddleClientProvider value={huddleClient}>
      <main className="flex justify-evenly mt-5 ">
        <section className="mt-5">
          <div>
            <div>
              <button onClick={handleJoin}>Join Room</button>
              <button onClick={() => huddleClient.enableWebcam()}>
                Enable Webcam
              </button>
              <button onClick={() => huddleClient.disableWebcam()}>
                Disable Webcam
              </button>
            </div>

            <MeVideoElem />

            {lobbyPeers[0] && <h2>Lobby Peers</h2>}
            <div>
              {lobbyPeers.map((peer, index) => (
                <div key={index}>{peer.peerId}</div>
              ))}
            </div>

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
