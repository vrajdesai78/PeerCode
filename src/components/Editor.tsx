import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import Editor from "@monaco-editor/react";
import { initSocket } from "../utils";

const EditorComponent: React.FC<{
  roomid: string | string[] | undefined;
  userid: number;
}> = (roomid, userid) => {
  const [code, setCode] = useState("const ");
  const [language, setLanguage] = useState("javascript");
  const socketRef = React.useRef<any>(null);
  const onChange = (action: string, data: any) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleEditorChange = (value: any) => {
    socketRef.current?.emit("message", { room: roomid, userid, code: value });
    setCode(value);
  };
  useEffect(() => {
    socketRef.current?.on("message", (data: any) => {
      if (roomid === data?.room && userid !== data?.userid) {
        setCode(data?.code);
      }
    });
  }, [socketRef.current]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      console.log("editor socket init");
    };
    init();
  }, []);
  return (
    <div className="pb-20 h-full">
      <div className=" absolute top-0 right-0 rounded-lg z-10">
        <select
          id="languages"
          className="p-2 rounded-bl-lg rounded-tr-md border-main border-l-0 border-b-0"
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
          value={language}
        >
          <option value="javascript">Javascript</option>
          <option value="c">C</option>
          <option value="java">Java</option>
          <option value="python">python</option>
        </select>
      </div>
      <Editor
        height={"100%"}
        width={`100%`}
        language={language}
        value={code}
        theme={"vs-dark"}
        defaultValue="// Add Code Here"
        onChange={_.debounce(handleEditorChange, 1000)}
      />
    </div>
  );
};
export default EditorComponent;
