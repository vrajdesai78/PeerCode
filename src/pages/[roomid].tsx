//@ts-ignore
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import {
  useHuddle01,
  useVideo,
  useAudio,
  useLobby,
  useRoom,
  useEventListener,
  usePeers,
} from "@huddle01/react/hooks";
import { useAccount } from "wagmi";
import _ from "lodash";
import VideoElem from "../components/Video";
import AudioElem from "../components/Audio";
import { BasicIcons } from "../components/BasicIcons";

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
  const router = useRouter();
  const { roomid } = router.query;
  const userid = _.random(1000);
  const [workspace, setWorkspace] = useState(WORKSPACES.EDITOR);

  const { initialize, roomState } = useHuddle01();
  const { joinLobby } = useLobby();
  const { joinRoom, isRoomJoined, leaveRoom } = useRoom();
  const {
    fetchVideoStream,
    stopVideoStream,
    produceVideo,
    stopProducingVideo,
    stream: camStream,
  } = useVideo();
  const {
    fetchAudioStream,
    stopAudioStream,
    produceAudio,
    stopProducingAudio,
    stream: micStream,
  } = useAudio();

  const { peers } = usePeers();

  const videoRef = useRef<HTMLVideoElement>(null);

  const [join, setJoin] = useState<boolean>(false);
  useEffect(() => {
    initialize(process.env.NEXT_PUBLIC_PROJECT_ID as string);
  }, [roomid]);

  const handleJoin = async () => {
    joinLobby(roomid as string);
  };

  useEventListener("lobby:joined", () => {
    joinRoom();
  });

  useEventListener("app:cam-on", (stream) => {
    produceVideo(stream);
  });

  useEventListener("app:cam-off", () => {
    if (isRoomJoined) {
      stopProducingVideo();
    }
  });

  useEventListener("app:mic-on", (stream) => {
    produceVideo(stream);
  });

  useEventListener("app:mic-off", () => {
    stopProducingAudio();
  });

  useEffect(() => {
    if (camStream && videoRef.current) {
      videoRef.current.srcObject = camStream;
    }
  }, [camStream]);

  return (
    <>
      <div className="m-2 opacity-75">RoomState: {roomState}</div>

      <main className="flex justify-evenly mt-5 ">
        <section className="mt-5">
          <div>
            <div className="w-fit flex items-center flex-col">
              <div className="mx-1 h-[176px] w-[306px] flex items-center border-2 rounded bg-grey border-main">
                {!camStream ? (
                  <img
                    src="./person.svg"
                    alt="comments"
                    className="mx-auto w-full h-20 bg-grey"
                  />
                ) : (
                  <video
                    className="min-h-full min-w-full object-cover"
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                  ></video>
                )}
              </div>
              {!join && (
                <button
                  className="m-1 bg-grey p-1 rounded-md w-[306px] flex items-center justify-center"
                  onClick={async () => {
                    await handleJoin();
                    setJoin(true);
                  }}
                >
                  I'm Ready
                </button>
              )}

              <div className="flex w-full flex-row items-center justify-center gap-8">
                {!camStream ? (
                  <button
                    onClick={() => {
                      fetchVideoStream();
                    }}
                    className="bg-brand-500 flex h-10 w-10 items-center justify-center rounded-xl"
                  >
                    {BasicIcons.inactive["cam"]}
                  </button>
                ) : (
                  <button
                    onClick={stopVideoStream}
                    className={
                      "flex h-10 w-10 items-center justify-center rounded-xl"
                    }
                  >
                    {BasicIcons.active["cam"]}
                  </button>
                )}
                {!micStream ? (
                  <button
                    onClick={() => {
                      fetchAudioStream();
                    }}
                    className="bg-brand-500 flex h-10 w-10 items-center justify-center rounded-xl"
                  >
                    {BasicIcons.inactive["mic"]}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      stopAudioStream();
                    }}
                    className={
                      "flex h-10 w-10 items-center justify-center rounded-xl"
                    }
                  >
                    {BasicIcons.active["mic"]}
                  </button>
                )}
               {isRoomJoined && <button
                  onClick={() => {
                    leaveRoom();
                    setJoin(false);
                  }}
                  className="bg-brand-500 flex h-10 w-10 items-center justify-center rounded-xl"
                >
                  {BasicIcons.close}
                </button>}
              </div>
            </div>
            {peers[0] && <h2 className="px-4 text-lg">Lobby Peers 👾</h2>}

            {peers[0] && <h2>Peers</h2>}

            <div>
              {Object.values(peers).map((peer) => (
                <div
                  className="mx-1 h-[176px] w-[306px] flex items-center border-2 rounded bg-grey border-main"
                  key={peer.peerId}
                >
                  {peer.cam && <VideoElem track={peer.cam} key={peer.peerId} />}
                  {peer.mic && <AudioElem track={peer.mic} key={peer.peerId} />}
                </div>
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
    </>
  );
};

export default Room;
