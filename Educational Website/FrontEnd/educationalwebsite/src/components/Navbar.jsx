import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AiFillCodeSandboxCircle } from "react-icons/ai";
import { makeUserLogin } from "../app/Features/userLog";

import { toggleUserLog, removeToken } from "../app/Features/userLog";

// Redux
import { useSelector, useDispatch } from "react-redux";

export default function Navbar() {
  const navigate = useNavigate();

  // Rect Redux

  const dispatch = useDispatch();
  const authenticationState = useSelector((state) => state.authentication);

  let Links = [
    { name: "Home", link: "/student/home" },
    { name: "Learn Someting New", link: "/student/courselist" },
  ];

  let [open, setOpen] = useState(false);

  const makeLogout = () => {
    localStorage.clear();
    dispatch(toggleUserLog());
    dispatch(removeToken());

    navigate("/login");
  };

  return (
    <div className="shadow-md z-1000 w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-black text-white py-4 md:px-10 px-7 ">
        {authenticationState.isUserLogedIn ? (
          <Link
            to="/student/dashboard"
            className="font-bold text-2xl cursor-pointer hover:text-red-600 font-[Poppins] 
      text-gray-300"
          >
            Dashboard
          </Link>
        ) : (
          "XXXX"
        )}

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer text-white md:hidden"
        >
          {open ? (
            <MdClose className="text-white" />
          ) : (
            <GiHamburgerMenu className="text-white" />
          )}
        </div>

        <ul
          className={`md:flex md:gap-5 pb-4 px-10 md:px-0 md:items-center md:pb-0 absolute md:static  md:z-auto z-[-1] left-0 w-full bg-black md:w-auto md:pl-0  transition-all duration-500 ease-in ${
            open ? "top-18" : "top-[-490px]"
          }`}
        >
          {authenticationState.isUserLogedIn ? (
            Links.map((link) => (
              <li
                key={link.name}
                className="md:ml-8 pl-9 md:pl-0 hover:underline  text-xl md:my-0 my-7"
              >
                <NavLink
                  to={link.link}
                  className="text-blue-600 font-semibold hover:text-gray-400 duration-500"
                >
                  {link.name}
                </NavLink>
              </li>
            ))
          ) : (
            <>
              <li className="md:ml-8 hover:underline  text-xl md:my-0 my-7">
                <NavLink
                  to="/login"
                  className="text-blue-600 font-semibold hover:text-gray-400 duration-500"
                >
                  Login
                </NavLink>
              </li>
              <li className="md:ml-8 hover:underline  text-xl md:my-0 my-7">
                <NavLink
                  to="/signup"
                  className="text-blue-600 font-semibold hover:text-gray-400 duration-500"
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          )}

          {/* Logout Button*/}

          {authenticationState.isUserLogedIn ? (
            <li>
              {" "}
              <button
                onClick={makeLogout}
                className="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded-full mx-4 md:ms-0"
              >
                Logout
              </button>
            </li>
          ) : null}

          {/* Logout Button*/}
        </ul>
      </div>
    </div>
  );
}
