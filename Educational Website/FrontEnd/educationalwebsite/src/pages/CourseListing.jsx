import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// REDUX TOOLKIT

import { useSelector, useDispatch } from "react-redux";
import { fetchCourseDetails } from "../app/Features/courseDetails";

export default function CourseListing() {
  const [couseDetails, setCouseDetails] = useState([]);

  const authState = useSelector((state) => state.authentication);
  const courseList = useSelector((state) => state.couserDetails);

  const [searchParam, setSearchParam] = useState("");

  const searchCourse = (event) => {
    let courseName = event.target.value;
    console.log(courseName);
    setSearchParam(courseName);
    if (courseName == "") {
      setCouseDetails(courseList.courseDetails);
    }
  };

  // Rect Redux

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(authState.isLoading);
    if (authState.isUserLogedIn) {
      dispatch(fetchCourseDetails())
        .unwrap()
        .then((dataF) => {
          console.log(dataF);
          setCouseDetails(dataF);
        });
    }
  }, [authState.isUserLogedIn]);

  const filterCourses = () => {
    if (searchParam == "") {
      return;
    }
    console.log(searchParam);
    console.log(courseList.courseDetails);
    const SearchC = courseList.courseDetails.filter((elem, index) => {
      return elem.name == searchParam || elem.instructor == searchParam;
    });
    console.log(SearchC);
    setCouseDetails(SearchC);
  };

  return (
    <>
      {authState.isUserLogedIn && (
        <>
          <div className="mt-16 text-2xl w-full text-black p-8 flex flex-wrap gap-5 justify-between items-center bg-green-500">
            {/* search by Name */}
            <div className="searchbyName md:min-w-[400px] w-full">
              <div className="mb-3">
                <div className=" mb-4 flex w-full flex-wrap items-stretch">
                  <input
                    type="text"
                    value={searchParam}
                    onChange={searchCourse}
                    className=" m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out  focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none "
                    placeholder="Search by Name"
                  />

                  {/* <!--Search button--> */}
                  <button
                    onClick={filterCourses}
                    className="  flex items-center rounded-r bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                    type="button"
                    id="button-addon1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {/* search by Name */}

            <div className="filter_A_Z"></div>
          </div>
          <div className="contentContainer bg-green-500  h-full w-full">
            {couseDetails.length ? (
              couseDetails.map((course, index) => {
                return (
                  <>
                    <div
                      key={course.id}
                      className="p-10  grid grid-cols-1 sm:grid-cols-1 justify-items-center gap-5"
                    >
                      {/* <!--Card 1--> */}
                      <div
                        className=" w-full bg-white lg:max-w-full lg:flex rounded-lg shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] 
          transition ease-in-out delay-150 hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] duration-300 
          "
                      >
                        <div
                          className={`h-48 md:mb-4  lg:h-auto lg:w-48 flex-none bg-contain sm:bg-cover  bg-no-repeat rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-[url('${course.thumbnail}')]`}
                          title={`${course.name}`}
                        >
                          <div className=" mx-4 md:flex md:justify-center h-auto md:min-h-full overflow-hidden rounded-xl  bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                            <img
                              className="md:w-auto md:h-52"
                              src={`${course.thumbnail}`}
                              alt="img-blur-shadow"
                              layout="fill"
                            />
                          </div>
                        </div>
                        <div className=" border-gray-400 lg:border-l-0  lg:border-gray-400  rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                          <div className="mb-8">
                            <h2 className="text-gray-900 font-bold text-xl mb-2">
                              {course.name}
                            </h2>
                            <p className="text-gray-700 text-base mb-3">
                              {course.description}
                            </p>
                            <span className="text-xl ">By :</span>{" "}
                            <h3 className="text-lg inline-block font-bold">
                              {course.instructor}
                            </h3>
                          </div>
                          <div className="flex justify-between">
                            <Link
                              to={`/student/courselist/details/${course.id}`}
                              type="button"
                              className="inline-block rounded bg-blue-700 font-semibold px-6 pb-2 pt-2.5 text-xs uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            >
                              Course Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <>
                <h2 className="text-xl">No Results Found !</h2>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
