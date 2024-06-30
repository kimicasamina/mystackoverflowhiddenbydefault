import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../actions/user";

const Login = () => {
  const user = useSelector((state) => state.user?.userInfo);
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const {data} = await axios.post('/user/login', form)
      // console.log("LOGIN RESPONSE:", data)

      dispatch(loginUser(form)).then((data) => {
        console.log(data);
        toast.success("Successfully logged in.");
        // navigate('/')
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.message || err);
    }
  };

  if (user) {
    return <Navigate to={`/${user.username}`} />;
  }

  return (
    <>
      <form
        action=""
        className="section-layout max-w-screen-sm mx-auto flex flex-col gap-y-4 mt-12 sm:mt-24"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2 className="text-4xl text-center text-neutral-200 mb-4">
          LOGIN ACCOUNT
        </h2>
        <div className="flex flex-col ">
          <label htmlFor="email" className="">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            className="border border-black rounded-md p-2 text-black"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="password" className="">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            className="border border-black rounded-md p-2 text-black"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <span className="text-neutral-200">
          Already have an Account?
          <Link to="/signup" className="text-yellow-500 font-semibold">
            {" "}
            Signup
          </Link>
        </span>
        <button type="submit" className="btn btn--yellow mx-auto mt-4">
          SUBMIT
        </button>
      </form>
    </>
  );
};

export default Login;
