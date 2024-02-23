import Link from "next/link";
import { Typography } from "@mui/material";

export const Onboard = () => {
  const role = window.sessionStorage.getItem("role");

  // Don't render the component for admins
  if (role === "admin") {
    return null;
  }

  let signupLink;
  let platformName;

  if (role === "investment") {
    signupLink = "/signup/investment-signup";
    platformName = "Investment Platform";
  } else if (role === "business") {
    signupLink = "/signup/business-signup";
    platformName = "Business Platform";
  } else {
    // Default case
    signupLink = "/"; // default link
    platformName = ""; // default platform name
  }

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#f5f5f5",
        zIndex: 2000,
        position: "sticky",
        top: 0,
      }}
    >
      <Typography variant="h6">
        Welcome to DealRoom!{" "}
        <Link href={signupLink} passHref>
          <Typography
            variant="h6"
            component="span"
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            Complete setting up your {platformName}
          </Typography>
        </Link>{" "}
        to use DealRoom.
      </Typography>
    </div>
  );
};
