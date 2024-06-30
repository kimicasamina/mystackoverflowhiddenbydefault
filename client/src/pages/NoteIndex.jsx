import React, { useState } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote, updateNote } from "../actions/notes";
import { HiOutlineX, HiTrash } from "react-icons/hi";
import { HiEye } from "react-icons/hi";
import { HiEyeOff } from "react-icons/hi";
import { HiPencil } from "react-icons/hi";
import { HiBookmark } from "react-icons/hi";
import CodeEditor from "@uiw/react-textarea-code-editor";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
// import Markdown from 'react-markdown'

const NoteIndex = () => {
  const params = useParams();
  const notes = useSelector((state) => state?.notes);
  const note = notes.find((note) => {
    if (note._id === params.id) {
      return note;
    }
  });

  console.log(note);
  // const tags = note.tags.split(" ")
  const [form, setForm] = useState({
    title: note?.title,
    body: note?.body,
    tags: note?.tags,
    user: params?.profile,
  });

  const [toggleExit, setToggleExit] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    console.log(e.target);
    console.log("PARAMS", params.id);
    dispatch(deleteNote(params.id));
    navigate(-1);
  };

  const handleOnSubmit = async (e) => {
    dispatch(updateNote(form, params.id));
    setToggleExit(true);
    navigate(-1);
  };

  return (
    <>
      <div className={`${toggleExit ? "hidden" : "form "}`}>
        <div className="form--btn">
          <HiOutlineX
            className="w-[32px] h-[32px] cursor-pointer"
            onClick={(e) => {
              setToggleExit(true);
              navigate(-1);
            }}
          />
          <HiTrash
            className="w-[32px] h-[32px] cursor-pointer"
            onClick={(e) => handleDelete(e)}
          />
        </div>

        <>
          <div className="flex flex-col">
            <label htmlFor="" className="">
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
            <label htmlFor="" className="">
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
              // backgroundColor: '#110d0d',
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
        </>

        {/* {
            toggleEdit ? (
              <>
                <div className="flex flex-col">
                <label htmlFor="" className="">Title</label>
                <input type="text" name="title" className="input border rounded-lg" value={form.title} placeholder='Hello World' onChange={(e) => setForm({...form, title: e.target.value})} />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="">Tags</label>
                <input type="text" name="tags" value={form.tags}  className="input border rounded-lg" placeholder='javascript node express ' onChange={(e) => setForm({...form, tags: e.target.value})} />
              </div>
              <CodeEditor
                value={note.body}
                data-color-mode="dark"
                language="js"
                placeholder="Please enter JS code."
                onChange={(e) => setForm({...form, body: e.target.value })}
                padding={16}
                style={{
                  backgroundColor: '#110d0d',
                  height: "100%",
                  fontSize: "18px",
                  overflowY: "scroll",
                  scrollbarWidth: "none",
                  borderRadius: "10px",
                  fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
                />
                  <button className="btn btn--dark" onClick={(e) => handleOnSubmit(e)}>Submit</button>
              </>
            ):(
              <CodeEditor
              value={note.body}
              data-color-mode="dark"
              language="js"
              placeholder="Please enter JS code."
              // onChange={(e) => setForm({...form, body: e.target.value })}
              padding={16}
              onKeyDown={(e) => e.preventDefault()}
              // onClick={null}
              style={{
                backgroundColor: '#110d0d',
                height: "100%",
                fontSize: "18px",
                overflowY: "scroll",
                scrollbarWidth: "none",
                borderRadius: "10px",
                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
              }}
              />
              
            )
          } */}
      </div>
    </>
  );
};

export default NoteIndex;
