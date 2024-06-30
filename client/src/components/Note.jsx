import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import CodeEditor from "@uiw/react-textarea-code-editor";
import remarkGfm from "remark-gfm";

const Note = ({ note }) => {
  const params = useParams();
  let tags = note.tags.trim();
  tags = tags.split(" ");
  // tags.length === 1 ? :

  return (
    <Link
      to={{ pathname: `/${params.profile}/${note._id}`, note: note }}
      className="note gap-y-4 min-h-[280px] cursor-pointer bg-neutral-900 rounded-md text-neutral-200 shadow-md hover:shadow-neutral-700"
    >
      <div className="title text-xl font-semibold h-[14] ">{note.title}</div>
      <CodeEditor
        name="body"
        value={note.body}
        data-color-mode="dark"
        language="js"
        placeholder="Please enter JS code."
        onChange={(evn) => setForm({ body: evn.target.value })}
        margin={0}
        padding={0}
        className="bg-neutral-900 text-neutral-200"
        style={{
          overflowY: "scroll",
          borderRadius: "2px",
          minHeight: "100px",
          scrollbarWidth: "none",
          scrollbarColor: "#fff",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
      />
      <div className="flex flex-wrap gap-x-2 gap-y-[2px]">
        {tags.map((tag, index) => {
          return (
            <span className="tag text-neutral-900 bg-yellow-500" key={index}>
              {tag}
            </span>
          );
        })}
      </div>
      {/* <p className="">{note.createdAt.toString()}</p> */}
    </Link>
  );
};

export default Note;
