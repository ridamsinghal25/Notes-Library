import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function LayoutWithSidebar() {
  return (
    <div>
      <Sidebar />
      <main className="mx-5 mt-16 lgl:ml-[300px] lgl:mt-3">
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default LayoutWithSidebar;