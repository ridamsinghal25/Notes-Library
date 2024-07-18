import { CircleUserIcon, Home, NotebookPen, Settings } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";
import { ROUTES } from "@/constants";

const sideBarItems = [
  { label: "Home", href: `${ROUTES.HOME}`, icon: Home },
  { label: "Profile", href: `${ROUTES.PROFILE}`, icon: CircleUserIcon },
  { label: "Notes", href: `${ROUTES.NOTES}`, icon: NotebookPen },
  { label: "Settings", href: `${ROUTES.ACCOUNT}`, icon: Settings },
];

export default function Sidebar() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return <DesktopSidebar sidebarDesktopItems={sideBarItems} />;
  }

  return <MobileSidebar sidebarMobileItems={sideBarItems} />;
}
