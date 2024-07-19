import { CircleUserIcon, Home, NotebookPen, Settings } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";
import { ROUTES } from "../../constants/route.constants";
import { SIDEBAR_TABS } from "../../constants/sidebar.constants";

const sideBarItems = [
  { label: `${SIDEBAR_TABS.HOME}`, href: `${ROUTES.HOME}`, icon: Home },
  {
    label: `${SIDEBAR_TABS.PROFILE}`,
    href: `${ROUTES.PROFILE}`,
    icon: CircleUserIcon,
  },
  {
    label: `${SIDEBAR_TABS.NOTES}`,
    href: `${ROUTES.NOTES}`,
    icon: NotebookPen,
  },
  {
    label: `${SIDEBAR_TABS.SETTINGS}`,
    href: `${ROUTES.SETTING}`,
    icon: Settings,
  },
];

export default function Sidebar() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return <DesktopSidebar sidebarDesktopItems={sideBarItems} />;
  }

  return <MobileSidebar sidebarMobileItems={sideBarItems} />;
}
