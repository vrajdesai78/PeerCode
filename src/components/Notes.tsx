import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { initSocket } from "../utils";
import _ from "lodash";

const Notes: React.FC<{
  roomid: string | string[] | undefined;
  userid: number;
}> = ({ roomid, userid }) => {
  const [value, setValue] = useState("");
  const socketRef = React.useRef<any>(null);
  const handleChange = (e: any) => null;
  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "header",
    "blockquote",
    "code-block",
    "indent",
    "list",
    "direction",
    "align",
    "link",
    "image",
    "video",
    "formula",
  ];
  const handleEditorChange = (value: any) => {
    socketRef.current?.emit("notes", { room: roomid, userid, value: value });
    setValue(value);
  };
  useEffect(() => {
    socketRef.current?.on("notes", (data: any) => {
      if (roomid === data?.room && userid !== data?.userid) {
        setValue(data?.value);
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
    <div className="w-full overflow-scroll h-full bg-white text-grey">
      <ReactQuill
        value={value}
        onChange={_.debounce(handleEditorChange, 500)}
        formats={formats}
      />
    </div>
  );
};

export default Notes;
