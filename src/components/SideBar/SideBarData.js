import React from "react";
import * as FaIcons from "react-icons/fa";
import { SiAiqfome, SiMicrosoftteams, SiGooglemaps } from "react-icons/si";
import { BiPalette, BiPaperPlane, BiPlanet } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import GroupData from './GroupData';

export const SideBarData = [
  {
    title: "Home",
    icon: <SiAiqfome />,
    link: "/",
  },
  {
    title: "Account",
    icon: <CgProfile />,
    link: "/account",
  },
  {
    title: "Task Group",
    icon: <FaIcons.FaTasks />,
    link: "/group",
    subIcon: <MdKeyboardArrowDown />,
    subNav: []
  },
  {
    title: "Friends",
    icon: <FaIcons.FaUserFriends />,
    link: "/friend",
    subIcon: <MdKeyboardArrowDown />,
    subNav: []
  },
  {
    title: "Team",
    icon: <SiMicrosoftteams />,
    link: "/team",
    subIcon: <MdKeyboardArrowDown />,
    sublink: "/group/one",
    subNav: [
      {
        name: "Family",
        icon: <BiPlanet />,
      },
      {
        name: "AppCener",
        icon: <BiPlanet />,
      },
      {
        name: "CS5313",
        icon: <BiPlanet />,
      },
    ],
  },
  {
    title: "TaskMap",
    icon: <SiGooglemaps />,
    link: "/taskMap",
  },
];
