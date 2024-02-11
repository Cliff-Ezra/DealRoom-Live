import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import LinkIcon from "@heroicons/react/24/solid/LinkIcon";
import EnvelopeIcon from "@heroicons/react/24/solid/EnvelopeIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import ClipboardDocumentIcon from "@heroicons/react/24/solid/ClipboardDocumentIcon";
import FolderIcon from "@heroicons/react/24/solid/FolderIcon";
import BankNotesIcon from "@heroicons/react/24/solid/BankNotesIcon";
import ChartPieIcon from "@heroicons/react/24/solid/ChartPieIcon";
import QuestionMarkCircleIcon from "@heroicons/react/24/solid/QuestionMarkCircleIcon";

import { SvgIcon } from "@mui/material";
import UserCircleIcon from "@heroicons/react/24/solid/UserCircleIcon";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";

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
    path: "#",
    icon: (
      <SvgIcon fontSize="small">
        <ClipboardDocumentIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Investor Profiles",
    path: "#",
    icon: (
      <SvgIcon fontSize="small">
        <FolderIcon />
      </SvgIcon>
    ),
  },
  {
    title: "User Management",
    path: "#",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Financial Overview",
    path: "#",
    icon: (
      <SvgIcon fontSize="small">
        <BankNotesIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Analytics & Reports",
    path: "#",
    icon: (
      <SvgIcon fontSize="small">
        <ChartPieIcon />
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
