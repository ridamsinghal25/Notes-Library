import { CircleUserIcon, Home, NotebookPen } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";

const sideBarItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Profile", href: "/profile", icon: CircleUserIcon },
  { label: "Notes", href: "/notes", icon: NotebookPen },
];

export default function Sidebar() {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  if (isDesktop) {
    return <DesktopSidebar sidebarDesktopItems={sideBarItems} />;
  }

  return <MobileSidebar sidebarMobileItems={sideBarItems} />;
}
