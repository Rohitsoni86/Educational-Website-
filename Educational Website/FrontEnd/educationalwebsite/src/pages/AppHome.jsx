import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

import { useSelector } from "react-redux";

export default function AppHome() {
  const authenticationState = useSelector((state) => state.authentication);

  return (
    <div className="headerContainer">
      <Navbar />
      <div className="headingContainer h-full  w-full flex flex-col justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}
