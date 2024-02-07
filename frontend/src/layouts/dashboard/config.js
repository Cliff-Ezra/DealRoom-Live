import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import LinkIcon from "@heroicons/react/24/solid/LinkIcon";
import EnvelopeIcon from "@heroicons/react/24/solid/EnvelopeIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import { SvgIcon } from "@mui/material";
import UserCircleIcon from "@heroicons/react/24/solid/UserCircleIcon";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import QuestionMarkCircleIcon from "@heroicons/react/24/solid/QuestionMarkCircleIcon";

export const businessItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Matches",
    path: "/matches",
    icon: (
      <SvgIcon fontSize="small">
        <LinkIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Messages",
    path: "/messages",
    icon: (
      <SvgIcon fontSize="small">
        <EnvelopeIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Profile",
    path: "#",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Settings",
    path: "/settings",
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
  },
];

export const investmentItems = [
  {
    title: "Dashboard",
    path: "/investment",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "My Portfolio",
    path: "#",
    icon: (
      <SvgIcon fontSize="small">
        <UserCircleIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Explore Opportunities",
    path: "/opportunities",
    icon: (
      <SvgIcon fontSize="small">
        <MagnifyingGlassIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Messages",
    path: "#",
    icon: (
      <SvgIcon fontSize="small">
        <EnvelopeIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Profile",
    path: "/profile",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Learn",
    path: "/help",
    icon: (
      <SvgIcon fontSize="small">
        <QuestionMarkCircleIcon />
      </SvgIcon>
    ),
  },
];
