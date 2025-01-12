import React from "react";
import { Outlet } from "react-router-dom";
import Container from "../Container";

function LayoutWithoutSidebar() {
  return (
    <div>
      <Container>
        <main>
          <div>
            <Outlet />
          </div>
        </main>
      </Container>
    </div>
  );
}

export default LayoutWithoutSidebar;
