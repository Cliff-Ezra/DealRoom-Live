import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FormControlLabel,
  Unstable_Grid2 as Grid,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Head from "next/head";
import { useState } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CompanyCard } from "src/sections/opportunities/opportunity-card";

const opportunities = [
  {
    id: "1",
    createdAt: "2023-12-18T09:33:00",
    title: "Muko Iron And Steel",
    industry: "Agriculture",
    description:
      "Muko hosts hematite deposits of iron ore with 150 million tones. This haematite Iron Ore, show characteristics of high-quality iron ore (55-68% Fe).",
    amount: "$240K",
    project_status: "Pre-Feasibility",
    investment_type: "Joint Venture",
    match: "80% Match",
  },
  {
    id: "2",
    createdAt: "2023-12-22T012:33:00",
    title: "Bahati Wolfram Project",
    industry: "Mineral Development",
    description:
      "The Ministry of Energy and Mineral Development seeks an investor to explore, evaluate and develop the wolfram in South Western Uganda. Bahati Wolfram Resource .",
    amount: "$300K",
    project_status: "Feasibility Started",
    investment_type: "PPP",
    match: "60% Match",
  },
  {
    id: "3",
    createdAt: "2023-12-18T09:33:00",
    title: "Moroto - Ateker Cement Factory",
    industry: "Mineral Benefication",
    description:
      "Uganda Development Corporation (UDC) in partnership with the private sector seeks a partner to set up integrated lime, cement and marble plants in Moroto ",
    amount: "$340K",
    project_status: "Feasibility Completed",
    investment_type: "Private Public",
    match: "70% Match",
  },
  {
    id: "4",
    createdAt: "2023-12-18T09:33:00",
    title: "East African Medical Vitals",
    industry: "Health",
    description:
      "EAMV currently supplies Uganda National Medical Stores, the Ministry of Health and Uganda Cancer Institute as well as the private market in Uganda.",
    amount: "$200K",
    project_status: "Pre-Feasibility",
    investment_type: "Private Public",
    match: "90% Match",
  },
  {
    id: "5",
    createdAt: "2024-01-18T09:33:00",
    title: "Instant Soluble Coffee Plant",
    industry: "Agro-Processing",
    description:
      "The Ministry of Agriculture, Animal Industry and Fisheries seeks an investor to set up a soluble coffee plant. Uganda does not have a soluble coffee plant.",
    amount: "$300K",
    project_status: "Feasibility Completed",
    investment_type: "PPP",
    match: "80% Match",
  },
  {
    id: "6",
    createdAt: "2023-02-01T14:33:00",
    title: "Modern Cattle Abattoir",
    industry: "Food Processing",
    description:
      "The Ministry of Agriculture, Animal Industry and Fisheries seeks for an investor to set up the abattoir around Lyantonde or Nakaseke where government.......",
    amount: "$400K",
    project_status: "Feasibility Completed",
    investment_type: "Joint Venture",
    match: "40% Match",
  },
  {
    id: "7",
    createdAt: "2023-12-18T09:33:00",
    title: "Muko Iron And Steel2",
    industry: "Agriculture",
    description:
      "Muko hosts hematite deposits of iron ore with 150 million tones. This haematite Iron Ore, show characteristics of high-quality iron ore (55-68% Fe). Hozier",
    amount: "$240K",
    project_status: "Pre-Feasibility",
    investment_type: "Private Public",
    match: "20% Match",
  },
];

const Page = () => {
  const itemsPerPage = 6; // Number of items to show per page
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [industry, setIndustry] = useState([]);
  const [projectStatus, setProjectStatus] = useState([]);
  const [investmentType, setInvestmentType] = useState([]);
  const [priceRange, setPriceRange] = useState([]);

  const [anchorElIndustry, setAnchorElIndustry] = useState(null);
  const [anchorElProjectStatus, setAnchorElProjectStatus] = useState(null);
  const [anchorElInvestmentType, setAnchorElInvestmentType] = useState(null);
  const [anchorElPriceRange, setAnchorElPriceRange] = useState(null);

  const industries = [...new Set(opportunities.map((opportunity) => opportunity.industry))];
  const priceRanges = ["$0 - $100K", "$100K - $200K", "$200K - $300K", "$300K+"];
  const project_statuses = [
    ...new Set(opportunities.map((opportunity) => opportunity.project_status)),
  ];
  const investment_types = [
    ...new Set(opportunities.map((opportunity) => opportunity.investment_type)),
  ];

  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:1400px)");

  return (
    <>
      <Head>
        <title>Companies | DealRoom</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="true">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Explore Opportunities</Typography>
              </Stack>
            </Stack>
            <Card
              sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <OutlinedInput
                defaultValue=""
                fullWidth
                placeholder="Search opportunity (title, description, industry or amount)"
                startAdornment={
                  <InputAdornment position="start">
                    <SvgIcon color="action" fontSize="small">
                      <MagnifyingGlassIcon />
                    </SvgIcon>
                  </InputAdornment>
                }
                sx={{ maxWidth: 500 }}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <Box sx={{ display: "flex", flexDirection: ["column", "row"], gap: 1 }}>
                <Button
                  startIcon={!isSmallScreen && <AddCircleOutlineIcon />}
                  variant="outlined"
                  color="primary"
                  sx={{ padding: "4.3px" }}
                  onClick={(event) => setAnchorElIndustry(event.currentTarget)}
                >
                  {!isSmallScreen && (
                    <Badge badgeContent={industry.length} color="success">
                      {" "}
                      Industry{" "}
                    </Badge>
                  )}
                  {isSmallScreen && (
                    <Typography variant="caption">
                      <Badge badgeContent={industry.length} color="success">
                        {" "}
                        Industry{" "}
                      </Badge>
                    </Typography>
                  )}
                </Button>
                <Menu
                  anchorEl={anchorElIndustry}
                  open={Boolean(anchorElIndustry)}
                  onClose={() => setAnchorElIndustry(null)}
                >
                  {industries.map((option) => (
                    <MenuItem key={option}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={industry.includes(option)}
                            onChange={(event) => {
                              if (event.target.checked) {
                                setIndustry((prev) => [...prev, option]);
                              } else {
                                setIndustry((prev) => prev.filter((item) => item !== option));
                              }
                            }}
                          />
                        }
                        label={option}
                      />
                    </MenuItem>
                  ))}
                  <Button onClick={() => setIndustry([])}>Clear filters</Button>
                </Menu>

                <Button
                  startIcon={!isSmallScreen && <AddCircleOutlineIcon />}
                  variant="outlined"
                  color="primary"
                  sx={{ padding: "4.3px" }}
                  onClick={(event) => setAnchorElProjectStatus(event.currentTarget)}
                >
                  {!isSmallScreen && (
                    <Badge badgeContent={industry.length} color="success">
                      {" "}
                      Project Status{" "}
                    </Badge>
                  )}
                  {isSmallScreen && (
                    <Typography variant="caption">
                      <Badge badgeContent={industry.length} color="success">
                        {" "}
                        Project Status{" "}
                      </Badge>
                    </Typography>
                  )}
                </Button>
                <Menu
                  anchorEl={anchorElProjectStatus}
                  open={Boolean(anchorElProjectStatus)}
                  onClose={() => setAnchorElProjectStatus(null)}
                >
                  {project_statuses.map((status) => (
                    <MenuItem key={status}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={projectStatus.includes(status)}
                            onChange={(event) => {
                              if (event.target.checked) {
                                setProjectStatus((prev) => [...prev, status]);
                              } else {
                                setProjectStatus((prev) => prev.filter((item) => item !== status));
                              }
                            }}
                          />
                        }
                        label={status}
                      />
                    </MenuItem>
                  ))}
                  <Button onClick={() => setProjectStatus([])}>Clear filters</Button>
                </Menu>

                <Button
                  startIcon={!isSmallScreen && <AddCircleOutlineIcon />}
                  variant="outlined"
                  color="primary"
                  sx={{ padding: "4.3px" }}
                  onClick={(event) => setAnchorElInvestmentType(event.currentTarget)}
                >
                  {!isSmallScreen && (
                    <Badge badgeContent={industry.length} color="success">
                      {" "}
                      Investment Type{" "}
                    </Badge>
                  )}
                  {isSmallScreen && (
                    <Typography variant="caption">
                      <Badge badgeContent={industry.length} color="success">
                        {" "}
                        Investment Type{" "}
                      </Badge>
                    </Typography>
                  )}
                </Button>
                <Menu
                  anchorEl={anchorElInvestmentType}
                  open={Boolean(anchorElInvestmentType)}
                  onClose={() => setAnchorElInvestmentType(null)}
                >
                  {investment_types.map((type) => (
                    <MenuItem key={type}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={investmentType.includes(type)}
                            onChange={(event) => {
                              if (event.target.checked) {
                                setInvestmentType((prev) => [...prev, type]);
                              } else {
                                setInvestmentType((prev) => prev.filter((item) => item !== type));
                              }
                            }}
                          />
                        }
                        label={type}
                      />
                    </MenuItem>
                  ))}
                  <Button onClick={() => setInvestmentType([])}>Clear filters</Button>
                </Menu>

                <Button
                  startIcon={!isSmallScreen && <AddCircleOutlineIcon />}
                  variant="outlined"
                  color="primary"
                  sx={{ padding: "4.3px" }}
                  onClick={(event) => setAnchorElPriceRange(event.currentTarget)}
                >
                  {!isSmallScreen && (
                    <Badge badgeContent={industry.length} color="success">
                      {" "}
                      Investment Range{" "}
                    </Badge>
                  )}
                  {isSmallScreen && (
                    <Typography variant="caption">
                      <Badge badgeContent={industry.length} color="success">
                        {" "}
                        Investment Range{" "}
                      </Badge>
                    </Typography>
                  )}
                </Button>
                <Menu
                  anchorEl={anchorElPriceRange}
                  open={Boolean(anchorElPriceRange)}
                  onClose={() => setAnchorElPriceRange(null)}
                >
                  {priceRanges.map((option) => (
                    <MenuItem key={option}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={priceRange.includes(option)}
                            onChange={(event) => {
                              if (event.target.checked) {
                                setPriceRange((prev) => [...prev, option]);
                              } else {
                                setPriceRange((prev) => prev.filter((item) => item !== option));
                              }
                            }}
                          />
                        }
                        label={option}
                      />
                    </MenuItem>
                  ))}
                  <Button onClick={() => setPriceRange([])}>Clear filters</Button>
                </Menu>
              </Box>
            </Card>

            <Grid container spacing={3}>
              {opportunities
                .filter(
                  (opportunity) =>
                    opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    opportunity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    opportunity.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    opportunity.amount.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .filter(
                  (opportunity) => industry.length === 0 || industry.includes(opportunity.industry)
                )
                .filter(
                  (opportunity) =>
                    investmentType.length === 0 ||
                    investmentType.includes(opportunity.investment_type)
                )
                .filter(
                  (opportunity) =>
                    projectStatus.length === 0 || projectStatus.includes(opportunity.project_status)
                )
                .filter((opportunity) => {
                  if (priceRange.length === 0) {
                    return true;
                  }
                  const amount = Number(opportunity.amount.replace(/[^0-9.-]+/g, ""));
                  return priceRange.some((range) => {
                    const [min, max] = range
                      .split(" - ")
                      .map((str) => Number(str.replace(/[^0-9.-]+/g, "")));
                    if (isNaN(max)) {
                      return amount >= min;
                    } else {
                      return amount >= min && amount <= max;
                    }
                  });
                })
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((opportunity) => (
                  <Grid xs={12} md={6} lg={4} key={opportunity.id}>
                    <CompanyCard opportunity={opportunity} />
                  </Grid>
                ))}
            </Grid>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination
                count={Math.ceil(opportunities.length / itemsPerPage)}
                size="small"
                page={page}
                onChange={(event, value) => setPage(value)}
              />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
