import React from "react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import { HiOutlineX, HiTrash } from "react-icons/hi";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { HiEye } from "react-icons/hi";
import { HiEyeOff } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../../actions/notes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddForm = ({ setToggleAdd }) => {
  const user = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: "",
    body: "",
    tags: "",
    user: user._id,
  });

  const [toggleExit, setToggleExit] = useState(false);
  const [togglePreview, setTogglePreview] = useState(false);

  const [markdown, setMarkdown] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault(e);
    console.log("FORM DATA:", form);

    try {
      dispatch(addNote(form));
      toast.success("Added new note");
      setToggleAdd(false);
    } catch (err) {
      false;
      console.log(err);
    }
  };

  return (
    <div className={`${toggleExit ? "hidden z-[-1]" : "form "}`}>
      <div className=" form--btn">
        <HiOutlineX
          className="w-[32px] h-[32px] cursor-pointer"
          onClick={(e) => {
            setToggleExit(true);
            setToggleAdd(false);
            navigate(`/${user.username}`);
          }}
        />
      </div>
      <div className="form--editor h-[100vh] flex flex-col gap-y-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="input border rounded-lg"
            value={form.title}
            placeholder="Hello World"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="tags" className="">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            value={form.tags}
            className="input border rounded-lg"
            placeholder="javascript node express "
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />
        </div>

        <CodeEditor
          name="body"
          value={form.body}
          data-color-mode="dark"
          language="js"
          placeholder="Please enter JS code."
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          padding={16}
          style={{
            backgroundColor: "#110d0d",
            height: "100%",
            fontSize: "18px",
            overflowY: "scroll",
            scrollbarWidth: "none",
            borderRadius: "10px",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        />

        <button className="btn btn--dark" onClick={(e) => handleOnSubmit(e)}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddForm;
