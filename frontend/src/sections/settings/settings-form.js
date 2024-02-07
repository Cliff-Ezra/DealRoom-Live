import { useCallback, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
  Tab,
  Tabs,
} from "@mui/material";
import { SettingsNotifications } from "src/sections/settings/settings-notifications";
import { SettingsProfile } from "src/sections/settings/settings-profile";
import { SettingsPassword } from "src/sections/settings/settings-password";
import { SettingsAccount } from "src/sections/settings/settings-account";

export const SettingsForm = () => {
  const [method, setMethod] = useState("profile");
  const [values, setValues] = useState({
    password: "",
    confirm: "",
  });

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

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
        <Tab label="Profile Management" value="profile" />
        <Tab label="Security Settings" value="security" />
        <Tab label="Notification Settings" value="notification" />
        <Tab label="Account Management" value="account" />
      </Tabs>

      {method === "profile" && <SettingsProfile />}

      {method === "security" && <SettingsPassword />}

      {method === "notification" && <SettingsNotifications />}

      {method === "account" && <SettingsAccount />}
    </>
  );
};
