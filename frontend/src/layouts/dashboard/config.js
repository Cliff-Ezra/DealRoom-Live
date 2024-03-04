import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import ChartPieIcon from "@heroicons/react/24/solid/ChartPieIcon";
import ClipboardDocumentIcon from "@heroicons/react/24/solid/ClipboardDocumentIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import EnvelopeIcon from "@heroicons/react/24/solid/EnvelopeIcon";
import FolderIcon from "@heroicons/react/24/solid/FolderIcon";
import LinkIcon from "@heroicons/react/24/solid/LinkIcon";
import QuestionMarkCircleIcon from "@heroicons/react/24/solid/QuestionMarkCircleIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import UserCircleIcon from "@heroicons/react/24/solid/UserCircleIcon";
import RectangleStackIcon from "@heroicons/react/24/solid/RectangleStackIcon";
import { SvgIcon } from "@mui/material";

export const businessItems = [
  {
    title: "Dashboard",
    path: "/business",
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
    path: "/portfolio",
    icon: (
      <SvgIcon fontSize="small">
        <UserCircleIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Investment Pipeline",
    path: "/pipeline",
    icon: (
      <SvgIcon fontSize="small">
        <RectangleStackIcon />
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

export const adminItems = [
  {
    title: "Dashboard",
    path: "/administrator",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Business Listings",
    path: "/admin/opportunity",
    icon: (
      <SvgIcon fontSize="small">
        <ClipboardDocumentIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Investor Profiles",
    path: "/admin/profile",
    icon: (
      <SvgIcon fontSize="small">
        <FolderIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Analytics & Reports",
    path: "/admin/reports",
    icon: (
      <SvgIcon fontSize="small">
        <ChartPieIcon />
      </SvgIcon>
    ),
  },
  {
    title: "User Management",
    path: "/admin/user",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Settings",
    path: "#",
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Help & Support",
    path: "#",
    icon: (
      <SvgIcon fontSize="small">
        <QuestionMarkCircleIcon />
      </SvgIcon>
    ),
  },
];
