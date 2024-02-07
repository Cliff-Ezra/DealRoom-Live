import { Tab, Tabs } from "@mui/material";
import { useCallback, useState } from "react";
import { ProfileContact } from "src/sections/profile/profile-contact";
import { ProfileOpportunity } from "src/sections/profile/profile-opportunity";
import { ProfileFinance } from "src/sections/profile/profile-finance";
import { ProfilePassword } from "src/sections/profile/profile-password";
import { ProfileAccount } from "src/sections/profile/profile-account";

export const ProfileForm = () => {
  const [method, setMethod] = useState("contact");

  // Handle Tab Change
  const handleMethodChange = useCallback((event, value) => {
    setMethod(value);
  }, []);

  return (
    <>
      <Tabs
        onChange={handleMethodChange}
        sx={{ mb: 3 }}
        value={method}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Contact Information" value="contact" />
        <Tab label="Investment Opportunity" value="opportunity" />
        <Tab label="Financial Requirements" value="finance" />
        <Tab label="Security Settings" value="security" />
        <Tab label="Account Management" value="account" />
      </Tabs>

      {method === "contact" && <ProfileContact />}

      {method === "opportunity" && <ProfileOpportunity />}

      {method === "finance" && <ProfileFinance />}

      {method === "security" && <ProfilePassword />}

      {method === "account" && <ProfileAccount />}
    </>
  );
};
