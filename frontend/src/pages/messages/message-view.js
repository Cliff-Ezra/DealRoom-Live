import Head from "next/head";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import {
  Avatar,
  Card,
  Box,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  IconButton,
  Button,
  Tooltip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import DownloadIcon from "@mui/icons-material/Download";
import AttachmentIcon from "@mui/icons-material/Attachment";

const Page = () => {
  const message = {
    avatar: "/assets/avatars/avatar-anika-visser.png",
    from: "Marcus Finn",
    email: "marcus.finn@domain.com",
    to: "sofia@dev.com",
    subject: "Website Redesign Quote",
    date: "Feb 28, 2024",
    body: `Hey there,

I hope this email finds you well. I'm glad you liked my projects, and I would be happy to provide you with a quote for a similar project.

Please let me know your requirements and any specific details you have in mind, so I can give you an accurate quote.

Looking forward to hearing from you soon.

Best regards,

Marcus Finn`,
    attachments: [
      { name: "file1.pdf", size: "1.2 MB" },
      { name: "file2.pdf", size: "0.9 MB" },
      { name: "file3.pdf", size: "1.5 MB" },
    ],
  };

  return (
    <>
      <Head>
        <title>Message</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 1 }}>
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ cursor: "pointer", height: 36, width: 36 }} src={message.avatar} />
            }
            title={message.from}
            subheader={
              <>
                <Typography variant="body2" color="text.secondary">
                  {message.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  To: {message.to}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {message.date}
                </Typography>
              </>
            }
            action={
              <>
                <Tooltip title="Reply">
                  <IconButton aria-label="reply">
                    <ReplyIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </>
            }
          />
          <Divider />
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3 }}>
              {message.subject}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              {message.body}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Attachments:</strong>
              <List sx={{ display: "flex", flexDirection: "row", p: 0 }}>
                {message.attachments.map((attachment, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <AttachmentIcon />
                    </ListItemIcon>
                    <ListItemText primary={attachment.name} secondary={attachment.size} />
                  </ListItem>
                ))}
              </List>
            </Typography>
            <Button
              startIcon={<DownloadIcon />}
              variant="contained"
              sx={{ backgroundColor: "inherit", color: "inherit", fontSize: "0.8rem" }}
            >
              Download All
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
