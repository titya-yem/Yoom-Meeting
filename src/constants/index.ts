import { sidebarLinksTypes } from "@/types";
import Home from "@/../public/icons/Home.svg";
import UpComming from "@/../public/icons/upcoming.svg";
import Previous from "@/../public/icons/previous.svg";
import Recordings from "@/../public/icons/Video.svg";
import Personal from "@/../public/icons/add-personal.svg";

export const sidebarLinks: sidebarLinksTypes[] = [
  {
    label: "Home",
    route: "/",
    imgUrl: Home,
  },
  {
    label: "Upcoming",
    route: "/upcoming",
    imgUrl: UpComming,
  },
  {
    label: "Previous",
    route: "/previous",
    imgUrl: Previous,
  },
  {
    label: "Recordings",
    route: "/recording",
    imgUrl: Recordings,
  },
  {
    label: "Personal Room",
    route: "/personal-room",
    imgUrl: Personal,
  },
];
