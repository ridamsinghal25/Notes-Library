import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Container from "../Container";
import NewFeaturesModalContainer from "@/components/modals/newfeaturemodal/container/NewFeaturesModalContainer";

function LayoutWithSidebar() {
  return (
    <div>
      <Sidebar />
      <Container>
        <NewFeaturesModalContainer />
        <main className="mx-5 lgl:ml-[300px] lgl:mt-3">
          <div>
            <Outlet />
          </div>
        </main>
      </Container>
    </div>
  );
}

export default LayoutWithSidebar;
