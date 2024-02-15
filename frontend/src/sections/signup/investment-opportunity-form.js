// External imports
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import {
  Grid,
  TextField,
  FormControl,
  MenuItem,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Box,
  CardActions,
  Button,
  FormHelperText,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  SvgIcon,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/CloseRounded";
import UploadIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";

const industries = [
  { value: "Education", label: "Education" },
  { value: "Construction", label: "Construction" },
  { value: "Health", label: "Health" },
  { value: "Finance", label: "Finance" },
  { value: "Technology", label: "Technology" },
  { value: "Agriculture", label: "Agriculture" },
  { value: "Real Estate", label: "Real Estate" },
  { value: "Manufacturing", label: "Manufacturing" },
  { value: "Retail", label: "Retail" },
  { value: "Hospitality and Tourism", label: "Hospitality and Tourism" },
  { value: "Renewable Energy", label: "Renewable Energy" },
  { value: "Transportation and Logistics", label: "Transportation and Logistics" },
  { value: "Media and Entertainment", label: "Media and Entertainment" },
  { value: "E-commerce", label: "E-commerce" },
  { value: "Telecommunications", label: "Telecommunications" },
  { value: "Biotechnology", label: "Biotechnology" },
  { value: "Environmental Services", label: "Environmental Services" },
  { value: "Food and Beverage", label: "Food and Beverage" },
  { value: "Consulting", label: "Consulting" },
  { value: "Legal Services", label: "Legal Services" },
];

const com_methods = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "scheduled meeting", label: "Scheduled Meeting" },
  { value: "in-person", label: "In-Person" },
  { value: "other", label: "Other" },
];

const rep_titles = [
  { value: "founder", label: "Founder" },
  { value: "co-founder", label: "Co-Founder" },
  { value: "ceo", label: "CEO" },
  { value: "cto", label: "CTO" },
  { value: "cfo", label: "CFO" },
  { value: "other", label: "Other" },
];

const project_types = [
  { value: "greenfield", label: "Greenfield" },
  { value: "expansion", label: "Expansion" },
  { value: "acquisition", label: "Acquisition" },
  { value: "refinance", label: "Refinance" },
  { value: "other", label: "Other" },
];

const investment_types = [
  { value: "ppp", label: "PPP" },
  { value: "joint venture", label: "Joint Venture" },
  { value: "private public", label: "Private Public" },
  { value: "other", label: "Other" },
];

const project_statuses = [
  { value: "pre feasibility", label: "Pre-Feasibility" },
  { value: "feasibility started", label: "Feasibility Started" },
  { value: "feasibility completed", label: "Feasibility Completed" },
];

export const InvestmentOpportunityForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [relevant_docs, setRelevantDocs] = useState([]);
  const [environment_doc, setEnvironmentDoc] = useState([]);
  const [img_videos_opportunity, setImgVideosOpportunity] = useState([]);
  const router = useRouter();

  // Handle next step
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  // Handle back step
  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  // Relevant docs handler function
  const handleEnvDocumentChange = (event) => {
    const files = event.target.files;
    setEnvironmentDoc((prevAttachments) => [...prevAttachments, ...Array.from(files)]);
  };

  const handleEnvDocumentRemove = (index) => {
    setEnvironmentDoc((prevAttachments) => prevAttachments.filter((_, i) => i !== index));
  };

  // Relevant docs handler function
  const handleAttachmentsChange = (event) => {
    const files = event.target.files;
    setRelevantDocs((prevAttachments) => [...prevAttachments, ...Array.from(files)]);
  };

  const handleAttachmentRemove = (index) => {
    setRelevantDocs((prevAttachments) => prevAttachments.filter((_, i) => i !== index));
  };

  // Images/videos handler function
  const handleImgVideosChange = (event) => {
    const files = event.target.files;
    setImgVideosOpportunity((prevAttachments) => [...prevAttachments, ...Array.from(files)]);
  };

  const handleImgVideosRemove = (index) => {
    // Revoke the blob URL
    URL.revokeObjectURL(URL.createObjectURL(img_videos_opportunity[index]));

    setImgVideosOpportunity((prevAttachments) => prevAttachments.filter((_, i) => i !== index));
  };

  // Validation schema
  const validationSchema = Yup.object().shape({
    opportunity_name: Yup.string().required("Opportunity name is required"),
    industry: Yup.string().required("Industry is required"),
    contact_name: Yup.string().required("Contact name is required"),
    contact_email: Yup.string()
      .email("Invalid email address")
      .required("Contact email is required"),
    rep_title: Yup.string().required("Your title is required"),
    other: Yup.string().required("Other is required"),

    project_type: Yup.string().required("Project type is required"),
    investment_type: Yup.string().required("Investment type is required"),
    project_status: Yup.string().required("Project status is required"),
    executive_summary: Yup.string().required("Executive summary is required"),
    problem_addressed: Yup.string().required("Problem addressed is required"),
    solution: Yup.string().required("Solution is required"),
    target_market: Yup.string().required("Target Market is required"),

    est_initial_investment: Yup.number()
      .min(0, "Estimated initial investment cannot be negative")
      .required("Estimated initial investment is required"),
    proj_revenue: Yup.number()
      .min(0, "Revenue cannot be negative")
      .required("Projected revenue is required"),
    proj_net_profit: Yup.number()
      .min(0, "Net profit cannot be negative")
      .required("Projected net profit is required"),
    break_even: Yup.string().required("Break even point is required"),

    feasibility_study: Yup.string().required("Feasibility study is required"),
    // Conditionally validate if feasibility_study is 'yes'
    market_research: Yup.number().test(
      "is-feasibility-required",
      "Market research is required",
      function (value) {
        const { feasibility_study } = this.parent;
        return feasibility_study === "yes" ? value != null : true;
      }
    ),
    local_regulations: Yup.string().required("Local regulations is required"),
    // Conditionally validate if local_regulations is 'yes'
    compliance: Yup.number().test(
      "is-compliance-required",
      "Compliance is required",
      function (value) {
        const { local_regulations } = this.parent;
        return local_regulations === "yes" ? value != null : true;
      }
    ),
    environment_assessment: Yup.string().required("Environmental assessment is required"),
    // Conditionally validate if environment_assessment is 'yes'
    env_assessment_date: Yup.date().test(
      "is-environment-impact-required",
      "Date of Issuance of Environmental Assessment is required",
      function (value) {
        const { environment_assessment } = this.parent;
        return environment_assessment === "yes" ? value != null : true;
      }
    ),

    available_assets: Yup.string().required("Available assets is required"),
    key_partnerships: Yup.string().required("Key partnerships is required"),
    scalability: Yup.string().required("Scalability is required"),
    key_assets: Yup.string().required("Risk mitigation is required"),

    comm_method: Yup.string().required("Preferred Communication method is required"),
  });

  // Submission logic
  const handleSubmit = (values) => {
    // Create a variable to store the submitted data
    const formData = new FormData();
    formData.append("opportunity_name", values.opportunity_name);
    formData.append("industry", values.industry);
    formData.append("contact_name", values.contact_name);
    formData.append("contact_email", values.contact_email);
    formData.append("rep_title", values.rep_title);
    formData.append("other", values.other);

    formData.append("project_type", values.project_type);
    formData.append("investment_type", values.investment_type);
    formData.append("project_status", values.project_status);
    formData.append("executive_summary", values.executive_summary);
    formData.append("problem_addressed", values.problem_addressed);
    formData.append("solution", values.solution);
    formData.append("target_market", values.target_market);

    formData.append("est_initial_investment", values.est_initial_investment);
    formData.append("proj_revenue", values.proj_revenue);
    formData.append("proj_net_profit", values.proj_net_profit);
    formData.append("break_even", values.break_even);

    formData.append("feasibility_study", values.feasibility_study);
    formData.append("market_research", values.market_research);
    formData.append("local_regulations", values.local_regulations);
    formData.append("compliance", values.compliance);
    formData.append("environment_assessment", values.environment_assessment);
    formData.append("env_assessment_date", values.env_assessment_date);
    formData.append("available_assets", values.available_assets);
    formData.append("key_partnerships", values.key_partnerships);
    formData.append("scalability", values.scalability);
    formData.append("key_assets", values.key_assets);

    formData.append("comm_method", values.com_methods);

    // Append environment doc
    for (let i = 0; i < environment_doc.length; i++) {
      formData.append(`environment_doc${i}`, environment_doc[i]);
    }

    // Append relevant docs
    for (let i = 0; i < relevant_docs.length; i++) {
      formData.append(`relevant_doc${i}`, relevant_docs[i]);
    }

    // Append images/videos
    for (let i = 0; i < img_videos_opportunity.length; i++) {
      formData.append(`img_videos_opportunity${i}`, img_videos_opportunity[i]);
    }

    console.log("Submitted business data:", formData);

    // axios
    //   .post("/clients", businessData)
    //   .then((response) => {
    //     // Display a success toast notification
    //     toast.success("Client added successfully", { type: "success" });
    //     router.push("/");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <Card>
      <CardHeader
        title="Investment Opportunity Information"
        sx={{
          backgroundColor: "#1E2530",
          color: "white",
          "& .MuiCardHeader-title": {
            paddingBottom: 2,
          },
          "& .MuiDivider-root": {
            backgroundColor: "white",
          },
        }}
      />
      <Divider />
      <CardContent sx={{ pt: 2, px: 4 }}>
        <Box sx={{ m: -1.5 }}>
          <Formik
            initialValues={{
              opportunity_name: "",
              industry: "",
              contact_name: "",
              contact_email: "",
              rep_title: "",
              other: "",

              project_type: "",
              investment_type: "",
              project_status: "",
              executive_summary: "",
              problem_addressed: "",
              solution: "",
              target_market: "",

              est_initial_investment: "",
              proj_revenue: "",
              proj_net_profit: "",
              break_even: "",

              feasibility_study: "",
              market_research: "",
              local_regulations: "",
              compliance: "",
              environment_assessment: "",
              env_assessment_date: "",
              available_assets: "",
              key_partnerships: "",
              scalability: "",
              key_assets: "",

              comm_method: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, validateForm }) => {
              setIsSubmitted(true);
              validateForm().then((errors) => {
                if (Object.keys(errors).length === 0) {
                  handleSubmit(values);
                }
                setSubmitting(false);
              });
            }}
          >
            {({ setFieldValue, errors, touched, values }) => (
              <Form>
                {currentStep === 1 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        <strong>Opportunity Details</strong>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.opportunity_name) &&
                          Boolean(errors.opportunity_name)
                        }
                      >
                        <Field fullWidth name="opportunity_name">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Opportunity Name"
                              error={
                                (isSubmitted || touched.opportunity_name) &&
                                Boolean(errors.opportunity_name)
                              }
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.opportunity_name) && errors.opportunity_name && (
                          <FormHelperText>{errors.opportunity_name}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <FormControl
                        fullWidth
                        error={(isSubmitted || touched.industry) && Boolean(errors.industry)}
                      >
                        <Field
                          id="industry-select"
                          name="industry"
                          as={TextField}
                          select
                          label="Sector/Industry"
                          onChange={(event) => {
                            setFieldValue("industry", event.target.value);
                          }}
                          error={(isSubmitted || touched.industry) && Boolean(errors.industry)}
                        >
                          {industries.map((industry) => (
                            <MenuItem key={industry.value} value={industry.value}>
                              {industry.label}
                            </MenuItem>
                          ))}
                        </Field>
                        {(isSubmitted || touched.industry) && errors.industry && (
                          <FormHelperText>{errors.industry}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        <strong>Contact Information</strong>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.contact_name) && Boolean(errors.contact_name)
                        }
                      >
                        <Field fullWidth name="contact_name">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Contact Name"
                              error={
                                (isSubmitted || touched.contact_name) &&
                                Boolean(errors.contact_name)
                              }
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.contact_name) && errors.contact_name && (
                          <FormHelperText>{errors.contact_name}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.contact_email) && Boolean(errors.contact_email)
                        }
                      >
                        <Field fullWidth name="contact_email">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Contact Email"
                              error={
                                (isSubmitted || touched.contact_email) &&
                                Boolean(errors.contact_email)
                              }
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.contact_email) && errors.contact_email && (
                          <FormHelperText>{errors.contact_email}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        <strong>Representative Information</strong>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                      <FormControl
                        fullWidth
                        error={(isSubmitted || touched.rep_title) && Boolean(errors.rep_title)}
                      >
                        <Field
                          id="rep_title-select"
                          name="rep_title"
                          as={TextField}
                          select
                          label="Your Title"
                          onChange={(event) => {
                            setFieldValue("rep_title", event.target.value);
                          }}
                          error={(isSubmitted || touched.rep_title) && Boolean(errors.rep_title)}
                        >
                          {rep_titles.map((title) => (
                            <MenuItem key={title.value} value={title.value}>
                              {title.label}
                            </MenuItem>
                          ))}
                        </Field>
                        {(isSubmitted || touched.rep_title) && errors.rep_title && (
                          <FormHelperText>{errors.rep_title}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <FormControl
                        fullWidth
                        error={(isSubmitted || touched.other) && Boolean(errors.other)}
                      >
                        <Field fullWidth name="other">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Other"
                              error={(isSubmitted || touched.other) && Boolean(errors.other)}
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.other) && errors.other && (
                          <FormHelperText>{errors.other}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                )}

                {currentStep === 2 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        <strong>About the Opportunity</strong>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.project_type) && Boolean(errors.project_type)
                        }
                      >
                        <Field
                          id="project_type-select"
                          name="project_type"
                          as={TextField}
                          select
                          label="Project Type"
                          onChange={(event) => {
                            setFieldValue("project_type", event.target.value);
                          }}
                          error={
                            (isSubmitted || touched.project_type) && Boolean(errors.project_type)
                          }
                        >
                          {project_types.map((project) => (
                            <MenuItem key={project.value} value={project.value}>
                              {project.label}
                            </MenuItem>
                          ))}
                        </Field>
                        {(isSubmitted || touched.project_type) && errors.project_type && (
                          <FormHelperText>{errors.project_type}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.investment_type) &&
                          Boolean(errors.investment_type)
                        }
                      >
                        <Field
                          id="investment_type-select"
                          name="investment_type"
                          as={TextField}
                          select
                          label="Investment Type"
                          onChange={(event) => {
                            setFieldValue("investment_type", event.target.value);
                          }}
                          error={
                            (isSubmitted || touched.investment_type) &&
                            Boolean(errors.investment_type)
                          }
                        >
                          {investment_types.map((investment) => (
                            <MenuItem key={investment.value} value={investment.value}>
                              {investment.label}
                            </MenuItem>
                          ))}
                        </Field>
                        {(isSubmitted || touched.investment_type) && errors.investment_type && (
                          <FormHelperText>{errors.investment_type}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.project_status) && Boolean(errors.project_status)
                        }
                      >
                        <Field
                          id="project_status-select"
                          name="project_status"
                          as={TextField}
                          select
                          label="Project Status"
                          onChange={(event) => {
                            setFieldValue("project_status", event.target.value);
                          }}
                          error={
                            (isSubmitted || touched.project_status) &&
                            Boolean(errors.project_status)
                          }
                        >
                          {project_statuses.map((status) => (
                            <MenuItem key={status.value} value={status.value}>
                              {status.label}
                            </MenuItem>
                          ))}
                        </Field>
                        {(isSubmitted || touched.project_status) && errors.project_status && (
                          <FormHelperText>{errors.project_status}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.executive_summary) &&
                          Boolean(errors.executive_summary)
                        }
                      >
                        <Field name="executive_summary">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Correspondence Summary"
                              error={
                                (isSubmitted || touched.executive_summary) &&
                                Boolean(errors.executive_summary)
                              }
                              multiline
                              rows={7}
                              InputProps={{
                                style: {
                                  resize: "both",
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                },
                              }}
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.executive_summary) && errors.executive_summary && (
                          <FormHelperText>{errors.executive_summary}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.problem_addressed) &&
                          Boolean(errors.problem_addressed)
                        }
                      >
                        <Field name="problem_addressed">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Problem Addressed/Need in the Market"
                              error={
                                (isSubmitted || touched.problem_addressed) &&
                                Boolean(errors.problem_addressed)
                              }
                              multiline
                              rows={7}
                              InputProps={{
                                style: {
                                  resize: "both",
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                },
                              }}
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.problem_addressed) && errors.problem_addressed && (
                          <FormHelperText>{errors.problem_addressed}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl
                        fullWidth
                        error={(isSubmitted || touched.solution) && Boolean(errors.solution)}
                      >
                        <Field name="solution">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Proposed Solution/Venture"
                              error={(isSubmitted || touched.solution) && Boolean(errors.solution)}
                              multiline
                              rows={7}
                              InputProps={{
                                style: {
                                  resize: "both",
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                },
                              }}
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.solution) && errors.solution && (
                          <FormHelperText>{errors.solution}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.target_market) && Boolean(errors.target_market)
                        }
                      >
                        <Field name="target_market">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Target Market"
                              error={
                                (isSubmitted || touched.target_market) &&
                                Boolean(errors.target_market)
                              }
                              multiline
                              rows={7}
                              InputProps={{
                                style: {
                                  resize: "both",
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                },
                              }}
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.target_market) && errors.target_market && (
                          <FormHelperText>{errors.target_market}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                )}

                {currentStep === 3 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        <strong>Financial Projections & Requirements</strong>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.est_initial_investment) &&
                          Boolean(errors.est_initial_investment)
                        }
                      >
                        <Field fullWidth name="est_initial_investment">
                          {({ field }) => (
                            <TextField
                              {...field}
                              type="number"
                              label="Estimated Initial Investment"
                              error={
                                (isSubmitted || touched.est_initial_investment) &&
                                Boolean(errors.est_initial_investment)
                              }
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.est_initial_investment) &&
                          errors.est_initial_investment && (
                            <FormHelperText>{errors.est_initial_investment}</FormHelperText>
                          )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.proj_revenue) && Boolean(errors.proj_revenue)
                        }
                      >
                        <Field fullWidth name="proj_revenue">
                          {({ field }) => (
                            <TextField
                              {...field}
                              type="number"
                              label="Projected Revenue(First Year)"
                              error={
                                (isSubmitted || touched.proj_revenue) &&
                                Boolean(errors.proj_revenue)
                              }
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.proj_revenue) && errors.proj_revenue && (
                          <FormHelperText>{errors.proj_revenue}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.proj_net_profit) &&
                          Boolean(errors.proj_net_profit)
                        }
                      >
                        <Field fullWidth name="proj_net_profit">
                          {({ field }) => (
                            <TextField
                              {...field}
                              type="number"
                              label="Projected Net Profit(First Year)"
                              error={
                                (isSubmitted || touched.proj_net_profit) &&
                                Boolean(errors.proj_net_profit)
                              }
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.proj_net_profit) && errors.proj_net_profit && (
                          <FormHelperText>{errors.proj_net_profit}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={(isSubmitted || touched.break_even) && Boolean(errors.break_even)}
                      >
                        <Field fullWidth name="break_even">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Break Even Point(in Months/Years)"
                              error={
                                (isSubmitted || touched.break_even) && Boolean(errors.break_even)
                              }
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.break_even) && errors.break_even && (
                          <FormHelperText>{errors.break_even}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                )}

                {currentStep === 4 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        <strong>Feasibility & Studies</strong>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">
                          Has feasibility studies been done?
                        </FormLabel>
                        <Field name="feasibility_study" as={RadioGroup} row>
                          {" "}
                          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="no" control={<Radio />} label="No" />
                        </Field>
                      </FormControl>
                    </Grid>

                    {values.feasibility_study === "yes" && (
                      <>
                        <Grid item xs={12} md={12}>
                          <FormControl
                            fullWidth
                            error={
                              (isSubmitted || touched.market_research) &&
                              Boolean(errors.market_research)
                            }
                          >
                            <Field name="market_research">
                              {({ field }) => (
                                <TextField
                                  {...field}
                                  label="Preliminary Market Research"
                                  error={
                                    (isSubmitted || touched.market_research) &&
                                    Boolean(errors.market_research)
                                  }
                                  multiline
                                  rows={7}
                                  InputProps={{
                                    style: {
                                      resize: "both",
                                      maxWidth: "100%",
                                      maxHeight: "100%",
                                    },
                                  }}
                                />
                              )}
                            </Field>
                            {(isSubmitted || touched.market_research) && errors.market_research && (
                              <FormHelperText>{errors.market_research}</FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                      </>
                    )}

                    <Grid item xs={12} md={12}>
                      <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">
                          Do you comply with Local Regulations?
                        </FormLabel>
                        <Field name="local_regulations" as={RadioGroup} row>
                          {" "}
                          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="no" control={<Radio />} label="No" />
                        </Field>
                      </FormControl>
                    </Grid>

                    {values.local_regulations === "yes" && (
                      <>
                        <Grid item xs={12} md={12}>
                          <FormControl
                            fullWidth
                            error={
                              (isSubmitted || touched.compliance) && Boolean(errors.compliance)
                            }
                          >
                            <Field name="compliance">
                              {({ field }) => (
                                <TextField
                                  {...field}
                                  label="Local Regulations & Compliance"
                                  error={
                                    (isSubmitted || touched.compliance) &&
                                    Boolean(errors.compliance)
                                  }
                                  multiline
                                  rows={7}
                                  InputProps={{
                                    style: {
                                      resize: "both",
                                      maxWidth: "100%",
                                      maxHeight: "100%",
                                    },
                                  }}
                                />
                              )}
                            </Field>
                            {(isSubmitted || touched.compliance) && errors.compliance && (
                              <FormHelperText>{errors.compliance}</FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                      </>
                    )}

                    <Grid item xs={12} md={12}>
                      <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">
                          Have you done environmental impact & assessment?
                        </FormLabel>
                        <Field name="environment_assessment" as={RadioGroup} row>
                          {" "}
                          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="no" control={<Radio />} label="No" />
                        </Field>
                      </FormControl>
                    </Grid>

                    {values.environment_assessment === "yes" && (
                      <>
                        <Grid item xs={12} md={6} lg={6}>
                          <FormControl
                            fullWidth
                            error={
                              (isSubmitted || touched.env_assessment_date) &&
                              Boolean(errors.env_assessment_date)
                            }
                          >
                            <Field fullWidth name="env_assessment_date">
                              {({ field }) => (
                                <TextField
                                  {...field}
                                  label="Environmental Impact Assessment Date of Issuance"
                                  error={
                                    (isSubmitted || touched.env_assessment_date) &&
                                    Boolean(errors.env_assessment_date)
                                  }
                                  type="date"
                                />
                              )}
                            </Field>
                            {(isSubmitted || touched.env_assessment_date) &&
                              errors.env_assessment_date && (
                                <FormHelperText>{errors.env_assessment_date}</FormHelperText>
                              )}
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6} sx={{ mt: 1 }}>
                          <Button
                            component="label"
                            startIcon={
                              <SvgIcon fontSize="small">
                                <UploadIcon />
                              </SvgIcon>
                            }
                            variant="contained"
                            style={{ backgroundColor: "rgb(233 233 236)", color: "black" }}
                          >
                            Upload copy of Environmental Impact Assessment
                            <input
                              accept="image/jpeg,image/png,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
                              hidden
                              id="environment-upload"
                              name="environment_doc"
                              onChange={handleEnvDocumentChange}
                              type="file"
                              multiple
                            />
                          </Button>
                          {environment_doc.length > 0 && (
                            <ul>
                              {environment_doc.map((attachment, index) => (
                                <li key={attachment.name}>
                                  <Grid container alignItems="center">
                                    <Grid item xs>
                                      <Typography>{attachment.name}</Typography>
                                    </Grid>
                                    <Grid item>
                                      <Button onClick={() => handleEnvDocumentRemove(index)}>
                                        <CloseIcon />
                                      </Button>
                                    </Grid>
                                  </Grid>
                                </li>
                              ))}
                            </ul>
                          )}
                          {!environment_doc.length && errors.environment_doc && (
                            <FormHelperText sx={{ color: "red" }}>
                              {errors.environment_doc}
                            </FormHelperText>
                          )}
                        </Grid>
                      </>
                    )}

                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        <strong>Resources & Assets</strong>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <FormControl
                        fullWidth
                        error={(isSubmitted || touched.key_assets) && Boolean(errors.key_assets)}
                      >
                        <Field name="key_assets">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Key Business Assets"
                              error={
                                (isSubmitted || touched.key_assets) && Boolean(errors.key_assets)
                              }
                              multiline
                              rows={7}
                              InputProps={{
                                style: {
                                  resize: "both",
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                },
                              }}
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.key_assets) && errors.key_assets && (
                          <FormHelperText>{errors.key_assets}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.key_partnerships) &&
                          Boolean(errors.key_partnerships)
                        }
                      >
                        <Field name="key_partnerships">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Key Partnerships/Alliances"
                              error={
                                (isSubmitted || touched.key_partnerships) &&
                                Boolean(errors.key_partnerships)
                              }
                              multiline
                              rows={7}
                              InputProps={{
                                style: {
                                  resize: "both",
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                },
                              }}
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.key_partnerships) && errors.key_partnerships && (
                          <FormHelperText>{errors.key_partnerships}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        <strong>Growth & Expansion Potential</strong>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <FormControl
                        fullWidth
                        error={(isSubmitted || touched.scalability) && Boolean(errors.scalability)}
                      >
                        <Field name="scalability">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Opportunity Scalability"
                              error={
                                (isSubmitted || touched.scalability) && Boolean(errors.scalability)
                              }
                              multiline
                              rows={7}
                              InputProps={{
                                style: {
                                  resize: "both",
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                },
                              }}
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.scalability) && errors.scalability && (
                          <FormHelperText>{errors.scalability}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.key_partnerships) &&
                          Boolean(errors.key_partnerships)
                        }
                      >
                        <Field name="key_partnerships">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Key Partnerships/Alliances"
                              error={
                                (isSubmitted || touched.key_partnerships) &&
                                Boolean(errors.key_partnerships)
                              }
                              multiline
                              rows={7}
                              InputProps={{
                                style: {
                                  resize: "both",
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                },
                              }}
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.key_partnerships) && errors.key_partnerships && (
                          <FormHelperText>{errors.key_partnerships}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                )}

                {currentStep === 5 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        <strong>Contact & Communication</strong>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={(isSubmitted || touched.comm_method) && Boolean(errors.comm_method)}
                      >
                        <Field
                          id="industry-select"
                          name="comm_method"
                          as={TextField}
                          select
                          label="Preferred Communication Method"
                          onChange={(event) => {
                            setFieldValue("comm_method", event.target.value);
                          }}
                          error={(isSubmitted || touched.industry) && Boolean(errors.industry)}
                        >
                          {com_methods.map((methods) => (
                            <MenuItem key={methods.value} value={methods.value}>
                              {methods.label}
                            </MenuItem>
                          ))}
                        </Field>
                        {(isSubmitted || touched.comm_method) && errors.comm_method && (
                          <FormHelperText>{errors.comm_method}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        <strong>Documents & Media</strong>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ mt: 1 }}>
                      <Button
                        component="label"
                        startIcon={
                          <SvgIcon fontSize="small">
                            <UploadIcon />
                          </SvgIcon>
                        }
                        variant="contained"
                        style={{ backgroundColor: "rgb(233 233 236)", color: "black" }}
                      >
                        Upload Relevant Documents
                        <input
                          accept="image/jpeg,image/png,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
                          hidden
                          id="attachment-upload"
                          name="relevant_docs"
                          onChange={handleAttachmentsChange}
                          type="file"
                          multiple
                        />
                      </Button>
                      {relevant_docs.length > 0 && (
                        <ul>
                          {relevant_docs.map((attachment, index) => (
                            <li key={attachment.name}>
                              <Grid container alignItems="center">
                                <Grid item xs>
                                  <Typography>{attachment.name}</Typography>
                                </Grid>
                                <Grid item>
                                  <Button onClick={() => handleAttachmentRemove(index)}>
                                    <CloseIcon />
                                  </Button>
                                </Grid>
                              </Grid>
                            </li>
                          ))}
                        </ul>
                      )}
                      {!relevant_docs.length && errors.relevant_docs && (
                        <FormHelperText sx={{ color: "red" }}>
                          {errors.relevant_docs}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ mt: 1 }}>
                      <Button
                        component="label"
                        startIcon={
                          <SvgIcon fontSize="small">
                            <UploadIcon />
                          </SvgIcon>
                        }
                        variant="contained"
                        style={{ backgroundColor: "rgb(233 233 236)", color: "black" }}
                      >
                        Images/Videos of the Opportunity
                        <input
                          accept="image/*,video/*"
                          hidden
                          id="attachment-upload"
                          name="img_videos_opportunity"
                          onChange={handleImgVideosChange}
                          type="file"
                          multiple
                        />
                      </Button>
                      {img_videos_opportunity.length > 0 && (
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                          {img_videos_opportunity.map((attachment, index) => (
                            <Grid item key={index}>
                              <Grid container direction="column" alignItems="center">
                                <img
                                  src={URL.createObjectURL(attachment)}
                                  alt={attachment.name}
                                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                />
                                <Typography variant="caption">{attachment.name}</Typography>
                                <Button onClick={() => handleImgVideosRemove(index)} size="small">
                                  <CloseIcon />
                                </Button>
                              </Grid>
                            </Grid>
                          ))}
                        </Grid>
                      )}
                      {!img_videos_opportunity.length && errors.img_videos_opportunity && (
                        <FormHelperText sx={{ color: "red" }}>
                          {errors.img_videos_opportunity}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                )}
                <Divider sx={{ pt: 2 }} />
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  {currentStep > 1 && (
                    <Button variant="contained" onClick={handleBack}>
                      Back
                    </Button>
                  )}
                  {currentStep < 5 ? (
                    <Button variant="contained" type="button" onClick={handleNext}>
                      Next
                    </Button>
                  ) : (
                    <Button variant="contained" type="submit">
                      Submit
                    </Button>
                  )}
                </CardActions>
              </Form>
            )}
          </Formik>
        </Box>
      </CardContent>
    </Card>
  );
};
