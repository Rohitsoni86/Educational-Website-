import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { markAsComplete } from "../app/Features/studentEnrolledCourses";
import { fetchStudentCourses } from "../app/Features/studentEnrolledCourses";

export default function Dashboard() {
  const [courseDetails, setCouseDetails] = useState([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const authState = useSelector((state) => state.authentication);
  const userD = useSelector((state) => state.userdetails);
  const courseList = useSelector((state) => state.couserDetails);
  const studentCourseList = useSelector((state) => state.studentEnrollCDetails);

  const [reloadpage, setReloadPage] = useState(true);

  const markComplete = (studnetID, courseID) => {
    console.log(studnetID, courseID);

    let payload = {
      studnetIDF: studnetID,
      courseIDF: courseID,
    };
    dispatch(markAsComplete(payload));
    setReloadPage(!reloadpage);
  };

  useEffect(() => {
    console.log(userD);
    console.log(userD.userDetailsFetched);

    if (authState.isUserLogedIn) {
      console.log(userD.userDetailsFetched.id);
      let userID = userD.userDetailsFetched.id;
      setCouseDetails(studentCourseList.studenEnCourses);
      console.log(studentCourseList.studenEnCourses);
    } else {
      alert("Please Login First !!!");
      navigate("/login");
    }
  }, [markComplete]);

  return (
    <>
      {courseDetails && (
        <div className="mt-16 min-h-screen  z-auto text-2xl bg-gray-800 w-screen text-black  p-5 md:p-8 flex justify-center items-center flex-wrap gap-20 md:gap-10 md:grid md:justify-items-center  md:grid-cols-2 xl:grid-cols-3">
          {courseDetails.map((course, index) => {
            let statusOfCourse = course.students.find((student) => {
              return student.id === userD.userDetailsFetched.id;
            });

            console.log(statusOfCourse.completed);

            return (
              <>
                <div
                  key={course.id}
                  className="flex m-5 w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md "
                >
                  <div className=" mx-4 -mt-6 md:min-h-[200px] overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                    <img
                      src={`${course.thumbnail}`}
                      alt="img-blur-shadow"
                      layout="fill"
                    />
                  </div>
                  <div className="p-6">
                    <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                      {course.name}
                    </h5>
                    <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                      {course.description}
                    </p>
                  </div>
                  <div className="p-6">
                    {statusOfCourse.completed ? (
                      <button
                        onClick={() =>
                          markComplete(userD.userDetailsFetched.id, course.id)
                        }
                        className="select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                      >
                        Completed
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          markComplete(userD.userDetailsFetched.id, course.id)
                        }
                        className="select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                      >
                        Mark As Complete
                      </button>
                    )}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      )}
    </>
  );
}
