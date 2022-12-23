import { useRouter } from "next/router";
import { useState } from "react";
import Editor from "../components/Editor";
import WhiteBoard from "../components/WhiteBoard";

const WORKSPACES = {
  EDITOR: "Editor",
  WHITEBOARD: "Whiteboard",
};

const Room = () => {
  const router = useRouter();
  const { roomid } = router.query;
  const [workspace, setWorkspace] = useState(WORKSPACES.EDITOR);
  return (
    <main className="flex justify-evenly mt-5">
      <section>
        <div className="w-[400px] h-[250px] bg-grey rounded-md border-main border-[1px] m-3"></div>
        <div className="w-[400px] h-[250px] bg-grey rounded-md border-gray-600 border-[1px] m-3"></div>
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
        <div className="w-[70vw] h-[80vh] rounded-tl-none  bg-grey rounded-md border-main border-[1px] ">
          {workspace === WORKSPACES.EDITOR && <Editor />}
          {workspace === WORKSPACES.WHITEBOARD && <WhiteBoard />}
        </div>
      </section>
    </main>
  );
};

export default Room;
