import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// REDUX TOOLKIT

import { useSelector, useDispatch } from "react-redux";

import { enrollStudent } from "../app/Features/courseDetails";

export default function CourseDetails() {
  const couserID = useParams();
  const [courseDetails, setCourseDetails] = useState(null);

  const [studentEnrollment, setstudentEnrollment] = useState(false);

  const dispatch = useDispatch();
  const courseList = useSelector((state) => state.couserDetails);
  const userDetailsstate = useSelector((state) => state.userdetails);

  // Enroll

  const EnrollStudnet = (studnetID, courseID) => {
    let payload = {
      studnetIDF: studnetID,
      courseIDF: courseID,
    };
    dispatch(enrollStudent(payload));
  };

  useEffect(() => {
    let idCourse = couserID.id;
    console.log(idCourse);
    console.log(courseList.courseDetails);
    let detailsOfCourse = courseList.courseDetails.find((elem) => {
      return elem.id == idCourse;
    });
    console.log(detailsOfCourse);
    setCourseDetails(detailsOfCourse);
    console.log(userDetailsstate.userDetailsFetched.id);
    const enrollment = () => {
      return detailsOfCourse.students.filter(function (elem) {
        console.log(userDetailsstate.userDetailsFetched.id);
        // check student ex or not
        if (elem.id === userDetailsstate.userDetailsFetched.id) {
          setstudentEnrollment(true);
          console.log(true);
        }

        return;
      });
    };

    enrollment();
  }, [EnrollStudnet]);

  return (
    <>
      {courseDetails && (
        <>
          <div className=" mx-auto bg-pink-200 h-full w-full">
            <div className="flex flex-wrap items-center justify-center mt-20">
              <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto ">
                <div className=" p-4 flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-pink-500">
                  <img
                    alt="course image"
                    src={courseDetails.thumbnail}
                    className="w-full align-middle rounded-t-lg"
                  />

                  <h4 className="text-xl font-bold text-black mt-3">
                    {courseDetails.name}
                  </h4>
                  <p className="text-md font-light mt-2 text-black">
                    {courseDetails.description}
                  </p>

                  <h2 className="text-black text-lg mt-2">
                    Duration :{" "}
                    <span className="text-xl">{courseDetails.duration}</span>
                  </h2>
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4 border-2 bg-white rounded-xl shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] mx-4">
                <div className="flex flex-wrap">
                  <div className="w-full  px-4">
                    <div className=" flex flex-col mt-4">
                      <div className="px-4 py-5 flex-auto flex flex-col gap-4">
                        <h6 className="text-xl mb-1 font-semibold">
                          Course By :{" "}
                          <span className="text-2xl font-bold">
                            {courseDetails.instructor}
                          </span>
                        </h6>
                        <h6 className="text-xl mb-1 font-semibold">
                          Location :{" "}
                          <span className="mb-4 font-bold text-lg">
                            {courseDetails.location}
                          </span>
                        </h6>
                        <h6 className="text-xl mb-1 font-semibold">
                          Enrollment Status :
                          <span className="mb-4 font-bold text-lg">
                            {courseDetails.enrollmentStatus}
                          </span>
                        </h6>
                        <h6 className="text-xl mb-1 font-semibold">
                          Pre Requisites :
                        </h6>
                        <ul className="flex gap-4">
                          {courseDetails.prerequisites.map((elem, index) => {
                            return (
                              <li
                                className="font-bold w-full  bg-black text-white rounded-lg px-4 py-2 "
                                key={elem}
                              >
                                {elem}
                              </li>
                            );
                          })}
                        </ul>
                        {/* button  */}
                        <div className="flex justify-between">
                          {studentEnrollment ? (
                            <button
                              type="button"
                              onClick={() =>
                                alert(
                                  "You are Already Enrolled In This Course !!"
                                )
                              }
                              className="inline-block rounded bg-purple-500 font-semibold px-6 pb-2 pt-2.5 text-xs uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-red-600  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            >
                              Enrolled
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                EnrollStudnet(
                                  userDetailsstate.userDetailsFetched.id,
                                  courseDetails.id
                                )
                              }
                              className="inline-block rounded bg-blue-700 font-semibold px-6 pb-2 pt-2.5 text-xs uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            >
                              Enroll
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SYLLABUS LISTING */}

            <h2 className="text-3xl px-10 md:px-20 my-10 font-bold">
              Syllabus :
            </h2>
            <div className="syllabusContainer mx-auto px-6 md:px-24 pb-24 flex flex-col justify-center items-center gap-10 ">
              {courseDetails.syllabus.map((elem, index) => {
                return (
                  <>
                    <div
                      className="py-5 w-full px-16 bg-[#F875AA] rounded-lg shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] 
          transition ease-in-out delay-150 hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] duration-300"
                    >
                      <details className="group">
                        <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                          <span className="text-xl font-bold text-black">
                            Week {elem.week} : {elem.topic}
                          </span>
                          <span className="transition group-open:rotate-180">
                            <svg
                              fill="none"
                              height="24"
                              shapeRendering="geometricPrecision"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <path d="M6 9l6 6 6-6"></path>
                            </svg>
                          </span>
                        </summary>
                        <p className="text-lg font-semibold text-black mt-3 group-open:animate-fadeIn">
                          {elem.content}
                        </p>
                      </details>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
