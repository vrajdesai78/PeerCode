//@ts-ignore
import { useRouter } from "next/router";
import { useState } from "react";
import Editor from "../components/Editor";
import WhiteBoard from "../components/WhiteBoard";
import {
  HuddleClientProvider,
  getHuddleClient,
} from "@huddle01/huddle01-client";

import { useHuddleStore } from "@huddle01/huddle01-client/store";
import PeerVideoAudioElem from "../components/PeerElement";
import MeVideoElem from "../components/MyVideoElement";
import { useAccount } from "wagmi";

const WORKSPACES = {
  EDITOR: "Editor",
  WHITEBOARD: "Lorem",
};

const Room = () => {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const { roomid } = router.query;

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
              {lobbyPeers.map((peer) => (
                <div>{peer.peerId}</div>
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
                  : " bg-grey"
              }  rounded-tl-md text-sm cursor-pointer p-1 px-2`}
              onClick={() => setWorkspace(WORKSPACES.EDITOR)}
            >
              {WORKSPACES.EDITOR}
            </div>
            <div
              className={`${
                workspace === WORKSPACES.WHITEBOARD
                  ? " bg-main text-title "
                  : " bg-grey  "
              } rounded-tr-md text-sm  cursor-pointer p-1 px-2`}
              onClick={() => setWorkspace(WORKSPACES.WHITEBOARD)}
            >
              {WORKSPACES.WHITEBOARD}
            </div>
          </div>
          <div className="w-[70vw] h-[80vh]  rounded-tl-none  bg-[#1E1E1E] rounded-md border-main border-2 pb-20 ">
            {workspace === WORKSPACES.EDITOR && <Editor roomID={roomid} />}
            {workspace === WORKSPACES.WHITEBOARD && <WhiteBoard />}
          </div>
        </section>
      </main>
    </HuddleClientProvider>
  );
};

export default Room;
