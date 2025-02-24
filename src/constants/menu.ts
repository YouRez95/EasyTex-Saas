import { Folder, Home, Pin, Settings } from "lucide-react";

export const PRIMARY_MENU = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Folders",
    url: "/dashboard/folders",
    icon: Folder,
  },
  {
    title: "Favorites",
    url: "/dashboard/favorites",
    icon: Pin,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];