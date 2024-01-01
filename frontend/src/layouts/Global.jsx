import React from "react";
import { Outlet } from "react-router-dom";
import Dialog from "../components/Dialog";

export default function Global() {
  return (
    <>
      <Dialog />
      <Outlet />
    </>
  );
}
