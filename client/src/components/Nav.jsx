import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

// icons
import { HiOutlineHome } from "react-icons/hi";
import { HiOutlineSearchCircle } from "react-icons/hi";
import { HiOutlineLogout } from "react-icons/hi";
import { HiOutlineLogin } from "react-icons/hi";
import { HiUserCircle } from "react-icons/hi";
import { HiMiniPlus } from "react-icons/hi2";
import { HiMenu } from "react-icons/hi";
import { HiOutlineX, HiTrash } from "react-icons/hi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setKeyword } from "../redux/reducer/uiSlice";
import { logoutUser } from "../actions/user";
import AddForm from "./Form/AddForm";

const Nav = () => {
  const user = useSelector((state) => state.user?.userInfo);
  const ui = useSelector((state) => state.ui);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    try {
      dispatch(logoutUser()).then((data) => {
        toast.success("Successfully logged out!");
        navigate("/");
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddNote = async (e) => {
    console.log("DISPLAY ADD FORM");
    setToggleAdd(true);
  };

  return (
    <>
      {toggleAdd ? (
        <AddForm setToggleAdd={setToggleAdd} />
      ) : (
        <header className=" bg-neutral-900 fixed h-[80px] top-0 left-0 right-0 z-10 w-full ">
          <nav className="w-full max-w-[1440px] mx-auto flex h-[80px] items-center gap-x-6 px-4 sm:px-10 py-4 text-neutral-200">
            <Link to={user ? `/${user.username}` : "/"}>
              <HiOutlineHome className="w-[32px] h-[32px]" />
            </Link>

            <div className="relative sm:flex flex-1 search ">
              <input
                type="text"
                className="hover:shadow-md hover:shadow-primary ease-in-out delay-75 duration-100 search--input rounded-md w-full pl-10 py-2 text-dark outline-none xs text-neutral-900"
                placeholder="Search notes..."
                onChange={(e) => {
                  dispatch(setKeyword(e.target.value));
                }}
              />
              <HiOutlineSearchCircle className="text-neutral-900 w-[28px] h-[28px] absolute left-1 top-1" />
            </div>

            <HiMiniPlus
              className="w-[32px] h-[32px] cursor-pointer "
              onClick={(e) => {
                if (user) {
                  handleAddNote();
                }
                e.preventDefault();
              }}
            />
            <HiMenu
              className="w-[32px] h-[32px] flex sm:hidden cursor-pointer"
              onClick={(e) => setToggleMenu(!toggleMenu)}
            />

            {toggleMenu ? (
              <>
                <div
                  className="bg-neutral-900 absolute left-0 top-0 right-0 flex flex-col justify-end items-center px-4 py-4"
                  onClick={(e) => setToggleMenu(!toggleMenu)}
                >
                  <HiOutlineX
                    className="w-[32px] h-[32px] flex self-end cursor-pointer"
                    onClick={(e) => setToggleMenu(!toggleMenu)}
                  />
                  {user ? (
                    <div className="flex flex-col w-full">
                      <div className="flex flex-row justify-center items-center py-2 gap-x-2 ">
                        <span className="text-xl">@{user?.username}</span>
                        <HiUserCircle className="w-[32px] h-[32px]" />
                      </div>
                      <button
                        className="btn btn--yellow"
                        onClick={(e) => handleLogout(e)}
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col w-full gap-y-2 mt-2">
                      <Link to="/login">
                        <button className="btn btn--yellow">Login</button>
                      </Link>

                      <Link to="/signup">
                        <button className="btn btn--yellow">Signin</button>
                      </Link>
                    </div>
                  )}
                </div>
              </>
            ) : null}

            <div className="hidden sm:flex flex-row gap-x-4 w-auto">
              {user ? (
                <div className="flex items-center justify-end gap-x-4">
                  {/* <HiMiniPlus className='w-[32px] h-[32px] cursor-pointer ' onClick={handleAddNote}/> */}
                  <span className="text-xl">@{user?.username}</span>
                  <HiUserCircle className="w-[32px] h-[32px]" />
                  <button
                    className="btn btn--yellow"
                    onClick={(e) => handleLogout(e)}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-x-4 ">
                  <Link to="/login">
                    <button className="btn btn--yellow">Login</button>
                  </Link>

                  <Link to="/signup">
                    <button className="btn btn--yellow">Signin</button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </header>
      )}
    </>
  );
};

export default Nav;
