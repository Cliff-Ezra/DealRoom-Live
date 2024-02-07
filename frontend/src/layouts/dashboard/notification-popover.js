import Link from "next/link";
import React from "react";
import {
  Box,
  Typography,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  Tooltip,
  IconButton,
  Divider,
} from "@mui/material";
import EnvelopeOpen from "@heroicons/react/24/solid/EnvelopeOpenIcon";

export const NotificationPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const systemIcon = "/assets/avatars/avatar-neha-punita.png";

  // Sample data for notifications
  const notifications = [
    {
      icon: systemIcon,
      title: "Complete Business Sign-Up Form",
      message: "Sign-Up your Business",
      path: "signup/business-signup",
      timestamp: "Jan 18, 4:56 PM",
    },
    {
      icon: systemIcon,
      title: "Complete Investment Sign-Up Form",
      message: "Sign-Up your Investment",
      path: "signup/investment-signup",
      timestamp: "Jan 21, 8:02 PM",
    },
    {
      icon: systemIcon,
      title: "Add business contacts",
      message: "Enter contacts affiliated with your business",
      path: null,
      timestamp: "Jan 18, 5:56 PM",
    },
  ];

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 400 } }}
    >
      <Box sx={{ py: 1.5, px: 2 }}>
        <Typography variant="overline">Notifications</Typography>
        <Tooltip title="Mark all as read">
          <IconButton>
            <EnvelopeOpen />
          </IconButton>
        </Tooltip>
        {/* Loop through the notifications */}
        {notifications.map((notification, index) => (
          <React.Fragment key={notification.title}>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={notification.icon} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <>
                    <Typography variant="subtitle2">{notification.title}</Typography>
                    {notification.path ? (
                      <Link href={notification.path} style={{ color: "#6266F1" }}>
                        <Typography color="#6266F1" variant="body2">
                          {notification.message}
                        </Typography>
                      </Link>
                    ) : (
                      <Typography color="text.secondary" variant="body2">
                        {notification.message}
                      </Typography>
                    )}
                  </>
                }
                secondary={notification.timestamp}
              />
            </ListItem>
            {index < notifications.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Box>
    </Popover>
  );
};
