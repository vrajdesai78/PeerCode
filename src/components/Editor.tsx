import React, { useState, useEffect, useRef } from "react";

import Editor from "@monaco-editor/react";
import { initSocket } from "../utils";

const EditorComponent: React.FC<any> = ({ roomID }) => {
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
    socketRef.current?.send({ room: roomID, code: value });
    setCode(value);
  };
  useEffect(() => {
    socketRef.current?.on("message", (data: any) => {
      if (roomID === data?.room) {
        setCode(data?.code);
      }
    });
  }, [socketRef.current]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
    };
    init();
  }, []);
  return (
    <>
      <div className="">
        <select
          id="languages"
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
        onChange={handleEditorChange}
      />
    </>
  );
};
export default EditorComponent;
