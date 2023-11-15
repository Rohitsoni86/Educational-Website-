import React, { useState, useEffect } from "react";
import { BsFillPhoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaGenderless } from "react-icons/fa";
import { MdToken } from "react-icons/md";
import { toggleUserLog, removeToken } from "../app/Features/userLog";

import { fetchStudentCourses } from "../app/Features/studentEnrolledCourses";

// REDUX TOOLKIT

import { useSelector, useDispatch } from "react-redux";
import { fetchCourseDetails } from "../app/Features/courseDetails";

export default function StudentDetails() {
  const userDetailsstate = useSelector((state) => state.userdetails);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(userDetailsstate);
    if (!userDetailsstate.isLoading) {
      console.log(userDetailsstate.userDetailsFetched);
      let userID = userDetailsstate.userDetailsFetched.id;

      // setuserPresent(true);
      dispatch(fetchCourseDetails())
        .unwrap()
        .then((dataF) => {
          console.log(dataF);
          dispatch(fetchStudentCourses(userID));
        });
    } else {
      console.log(userDetailsstate.isLoading);
      return;
    }
  }, [userDetailsstate.isLoading]);

  const makeLogout = () => {
    localStorage.clear();
    dispatch(toggleUserLog());
    dispatch(removeToken());

    navigate("/login");
  };

  return (
    <>
      {userDetailsstate.isLoading ? (
        <>
          <h2 className="text-2xl text-black font-bold">
            Please Login First !!
          </h2>
        </>
      ) : (
        <div className="flex flex-col px-8 md:p-0 justify-center items-center w-screen h-[100vh] from-purple-900 via-indigo-800 to-indigo-500 bg-gradient-to-br ">
          <div class="max-w-sm content-center flex flex-col justify-center mx-auto bg-white  mt-[10vh] rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700   bg-opacity-10  ">
            <div class="  rounded-t-lg   flex flex-col justify-center items-center mt-6    max-w-[24rem]">
              <img
                class="w-44 h-44 object-cover  mb-2  "
                src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                alt="logo"
              />
            </div>
            <div class="flex flex-col px-5  md:px-10 md:pb-3">
              <h1 class="text-3xl text-center text-gray-900 font-semibold">
                {userDetailsstate.userDetailsFetched.name.toUpperCase()}
              </h1>
              <div class="mb-2 mt-2">
                <h1 class="text-base text-white font-semibold underline">
                  Bio
                </h1>

                <p class="text-base text-gray-800 mt-2 font-semibold">
                  {" "}
                  <span className="text-md font-bold text-black">
                    Age:
                  </span>{" "}
                  {userDetailsstate.userDetailsFetched.age}
                </p>
              </div>
              <div class="mb-2 mt-2">
                <h1 class="text-base text-white font-semibold underline">
                  Contact Details :
                </h1>
                <div class="mt-2 flex items-center">
                  <BsFillPhoneFill size={30} />
                  <h1 class="text-base text-gray-900 ml-5 font-semibold">
                    {" "}
                    <span className="text-md font-bold text-black">
                      Phone :
                    </span>{" "}
                    {userDetailsstate.userDetailsFetched.phone}
                  </h1>
                </div>
                <div class="mt-2 flex items-center">
                  <MdEmail size={30} />
                  <h1 class="text-base text-gray-900 ml-5 font-semibold">
                    {" "}
                    <span className="text-md font-bold text-black">
                      Email :
                    </span>{" "}
                    {userDetailsstate.userDetailsFetched.email}
                  </h1>
                </div>
                <div class="mt-2 flex items-center">
                  <MdToken size={30} />

                  <h1 class="text-base text-gray-900 ml-5 font-semibold">
                    <span className="text-md font-bold text-black">Id :</span>{" "}
                    {userDetailsstate.userDetailsFetched.token.substring(0, 12)}
                  </h1>
                </div>
                <div class="mt-2 flex items-center">
                  <FaGenderless size={30} />
                  <h1 class="text-base text-gray-900 ml-5 font-semibold">
                    <span className="text-md font-bold text-black">
                      Gender :
                    </span>
                    {userDetailsstate.userDetailsFetched.gender}
                  </h1>
                </div>
                <button
                  onClick={makeLogout}
                  className="bg-gray-200 mt-4 hover:bg-gray-300 text-black shadow-lg hover:shadow-2xl w-full font-bold py-2 px-4 rounded-full  md:ms-0"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
