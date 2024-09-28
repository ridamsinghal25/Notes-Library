import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Container from "../Container";
import NewFeatures from "../modals/NewFeatures";

function LayoutWithSidebar() {
  return (
    <div>
      <Sidebar />
      <Container>
        <NewFeatures />
        <main className="mx-5 mt-16 lgl:ml-[300px] lgl:mt-3">
          <div>
            <Outlet />
          </div>
        </main>
      </Container>
    </div>
  );
}

export default LayoutWithSidebar;
