import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";

// REDUX TOOLKIT

import { useSelector, useDispatch } from "react-redux";
import { makeUserLogin } from "../app/Features/userLog";
import { fetchUserDetails } from "../app/Features/userDetails";

export default function Login() {
  const authState = useSelector((state) => state.authentication);

  // LOGIC

  const navigate = useNavigate();

  // Rect Redux

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(authState.isLoading);
    if (authState.isUserLogedIn) {
      navigate("/student/home");
    }
  }, [authState.isUserLogedIn]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginUser = async (dataObject) => {
    // setError("");
    console.log(dataObject);
    console.log(authState);
    // Redux CALL

    dispatch(makeUserLogin(dataObject))
      .unwrap()
      .then((dataF) => {
        console.log(dataF);
        dispatch(fetchUserDetails(dataF.token));
      });
  };

  return (
    <>
      <div className="flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-700 min-h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-xl text-center font-bold  text-white">
            Designed By @Rohit_Soni
          </h2>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(loginUser)} className="space-y-6">
            <Input
              label={"email"}
              labelClass={`block text-sm font-medium leading-6 text-gray-900`}
              labelText={"Email address"}
              type={"email"}
              className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              name="email"
              {...register("Email", {
                required: "Email is required",
                validate: {
                  maxLength: (v) =>
                    v.length <= 50 ||
                    "The email should have at most 50 characters",
                  matchPattern: (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "Email address must be a valid address",
                },
              })}
            />
            {errors.email?.message && (
              <small className="text-base text-red-500">
                {errors.email.message}
              </small>
            )}
            <div>
              <div className="mt-2">
                <Input
                  label={"password"}
                  labelClass={`block text-sm font-medium leading-6 text-gray-900`}
                  labelText={"Enter Password"}
                  type={"password"}
                  className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6`}
                  name="password"
                  {...register("Password", {
                    validate: {
                      maxLength: (v) =>
                        v.length <= 50 ||
                        "The Password should have at most 50 characters",
                      minLength: (v) =>
                        v.length >= 8 ||
                        "The Password should have at least 8 characters",
                    },
                  })}
                />
                {errors.password?.message && (
                  <small className="text-base text-red-500">
                    {errors.password.message}
                  </small>
                )}
              </div>
            </div>
            <div className="text-sm">
              <button
                onClick={() =>
                  alert(
                    "Currently We Are Working On This Feature Check Your Mail We Send Your Password There !! \n Thank you !!"
                  )
                }
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
