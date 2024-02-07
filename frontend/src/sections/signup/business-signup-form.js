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
  { value: "education", label: "Education" },
  { value: "construction", label: "Construction" },
  { value: "health", label: "Health" },
  { value: "finance", label: "Finance" },
  { value: "other", label: "Other" },
];

const geo_locations = [
  { value: "local", label: "Local" },
  { value: "regional", label: "Regional" },
  { value: "national", label: "National" },
  { value: "international", label: "International" },
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

export const BusinessSignupForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [relevant_docs, setRelevantDocs] = useState([]);
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
    company_name: Yup.string().required("Company name is required"),
    company_reg_no: Yup.string().required("Company registration number is required"),
    company_email: Yup.string()
      .email("Invalid email address")
      .required("Company email is required"),
    company_website: Yup.string().url("Invalid URL").required("Company website is required"),
    rep_title: Yup.string().required("Your title is required"),
    other: Yup.string().required("Other is required"),
    industry: Yup.string().required("Industry is required"),
    executive_summary: Yup.string().required("Executive summary is required"),
    problem_addressed: Yup.string().required("Problem addressed is required"),
    solution: Yup.string().required("Solution is required"),
    business_model: Yup.string().required("Business model is required"),
    business_traction: Yup.string().required("Business traction is required"),

    revenue_status: Yup.string().required("Revenue status is required"),
    // Conditionally validate if revenue_status is 'yes'
    last_yr_revenue: Yup.number()
      .min(0, "Revenue cannot be negative")
      .test("is-revenue-required", "Last year revenue is required", function (value) {
        const { revenue_status } = this.parent;
        return revenue_status === "yes" ? value != null : true;
      }),
    last_month_revenue: Yup.number()
      .min(0, "Revenue cannot be negative")
      .test("is-revenue-required", "Last month revenue is required", function (value) {
        const { revenue_status } = this.parent;
        return revenue_status === "yes" ? value != null : true;
      }),
    last_month_net_profit: Yup.number()
      .min(0, "Net profit cannot be negative")
      .test("is-revenue-required", "Last month net profit is required", function (value) {
        const { revenue_status } = this.parent;
        return revenue_status === "yes" ? value != null : true;
      }),
    funding_goal: Yup.number()
      .min(0, "Funding goal cannot be negative")
      .required("Funding goal is required"),
    equity_offered: Yup.string().required("Equity offered is required"),
    raised_owed: Yup.string().required("Raised owed is required"),
    // Conditionally validate if raised_owed is 'yes'
    amount_raised_owed: Yup.number()
      .min(0, "Amount raised/owed cannot be negative")
      .test("is-amount-required", "Amount raised/owed is required", function (value) {
        const { raised_owed } = this.parent;
        return raised_owed === "yes" ? value != null : true;
      }),

    your_competitors: Yup.string().required("Your competitors is required"),
    growth_opportunities: Yup.string().required("Growth opportunities is required"),
    team_composition: Yup.string().required("Team composition is required"),
    business_assets: Yup.string().required("Business assets is required"),
    company_size: Yup.number()
      .min(0, "Company size cannot be negative")
      .required("Company size is required"),

    geo_operation: Yup.string().required("Geographic operation is required"),
    customer_number: Yup.number()
      .min(0, "Customer number cannot be negative")
      .required("Customer number is required"),
    customer_base: Yup.string().required("Customer base is required"),
    key_achievements: Yup.string().required("Key achievements is required"),
    legal_considerations: Yup.string().required("Legal considerations is required"),
    reference_testimonials: Yup.string().required("Reference & testimonials is required"),

    comm_method: Yup.string().required("Preferred Communication method is required"),
    exit_strategy: Yup.string(),
  });

  // Submission logic
  const handleSubmit = (values) => {
    // Create a variable to store the submitted data
    const formData = new FormData();
    formData.append("company_name", values.company_name);
    formData.append("company_reg_no", values.company_reg_no);
    formData.append("company_email", values.company_email);
    formData.append("company_website", values.company_website);
    formData.append("rep_title", values.rep_title);
    formData.append("other", values.other);
    formData.append("industry", values.industry);
    formData.append("executive_summary", values.executive_summary);
    formData.append("problem_addressed", values.problem_addressed);
    formData.append("solution", values.solution);
    formData.append("business_model", values.business_model);
    formData.append("business_traction", values.business_traction);

    formData.append("revenue_status", values.revenue_status);
    formData.append("last_yr_revenue", values.last_yr_revenue);
    formData.append("last_month_revenue", values.last_month_revenue);
    formData.append("last_month_net_profit", values.last_month_net_profit);
    formData.append("funding_goal", values.funding_goal);
    formData.append("equity_offered", values.equity_offered);
    formData.append("raised_owed", values.raised_owed);
    formData.append("amount_raised_owed", values.amount_raised_owed);

    formData.append("your_competitors", values.your_competitors);
    formData.append("growth_opportunities", values.growth_opportunities);
    formData.append("team_composition", values.team_composition);
    formData.append("business_assets", values.business_assets);
    formData.append("company_size", values.company_size);

    formData.append("geo_operation", values.geo_operation);
    formData.append("customer_number", values.customer_number);
    formData.append("customer_base", values.customer_base);
    formData.append("key_achievements", values.key_achievements);
    formData.append("legal_considerations", values.legal_considerations);
    formData.append("reference_testimonials", values.reference_testimonials);

    formData.append("comm_method", values.com_methods);
    formData.append("exit_strategy", values.exit_strategy);

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
        title="Business Information"
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
              company_name: "",
              company_reg_no: "",
              company_email: "",
              company_website: "",
              rep_title: "",
              other: "",
              industry: "",
              executive_summary: "",
              problem_addressed: "",
              solution: "",
              business_model: "",
              business_traction: "",

              revenue_status: "",
              last_yr_revenue: "",
              last_month_revenue: "",
              last_month_net_profit: "",
              funding_goal: "",
              equity_offered: "",
              raised_owed: "",
              amount_raised_owed: "",

              your_competitors: "",
              growth_opportunities: "",
              team_composition: "",
              business_assets: "",
              company_size: "",

              geo_operation: "",
              customer_number: 0,
              customer_base: "",
              key_achievements: "",
              legal_considerations: "",
              reference_testimonials: "",

              comm_method: "",
              exit_strategy: "",
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
                        Company Details
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.company_name) && Boolean(errors.company_name)
                        }
                      >
                        <Field fullWidth name="company_name">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Company Name"
                              error={
                                (isSubmitted || touched.company_name) &&
                                Boolean(errors.company_name)
                              }
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.company_name) && errors.company_name && (
                          <FormHelperText>{errors.company_name}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.company_reg_no) && Boolean(errors.company_reg_no)
                        }
                      >
                        <Field fullWidth name="company_reg_no">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Company Registration Number"
                              error={
                                (isSubmitted || touched.company_reg_no) &&
                                Boolean(errors.company_reg_no)
                              }
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.company_reg_no) && errors.company_reg_no && (
                          <FormHelperText>{errors.company_reg_no}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.company_email) && Boolean(errors.company_email)
                        }
                      >
                        <Field fullWidth name="company_email">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Company Email"
                              error={
                                (isSubmitted || touched.company_email) &&
                                Boolean(errors.company_email)
                              }
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.company_email) && errors.company_email && (
                          <FormHelperText>{errors.company_email}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.company_website) &&
                          Boolean(errors.company_website)
                        }
                      >
                        <Field fullWidth name="company_website">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Company Website"
                              error={
                                (isSubmitted || touched.company_website) &&
                                Boolean(errors.company_website)
                              }
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.company_website) && errors.company_website && (
                          <FormHelperText>{errors.company_website}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        Representative Information
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
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
                    <Grid item xs={12} md={4}>
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
                        About your Business
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
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
                              label="Problem Addressed"
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
                              label="Solution"
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
                          (isSubmitted || touched.business_model) && Boolean(errors.business_model)
                        }
                      >
                        <Field name="business_model">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Business Model"
                              error={
                                (isSubmitted || touched.business_model) &&
                                Boolean(errors.business_model)
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
                        {(isSubmitted || touched.business_model) && errors.business_model && (
                          <FormHelperText>{errors.business_model}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.business_traction) &&
                          Boolean(errors.business_traction)
                        }
                      >
                        <Field name="business_traction">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Current Business Traction"
                              error={
                                (isSubmitted || touched.business_traction) &&
                                Boolean(errors.business_traction)
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
                        {(isSubmitted || touched.business_traction) && errors.business_traction && (
                          <FormHelperText>{errors.business_traction}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                )}
                {currentStep === 3 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        Financial Information
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">
                          Is your entity generating revenue?
                        </FormLabel>
                        <Field name="revenue_status" as={RadioGroup} row>
                          {" "}
                          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="no" control={<Radio />} label="No" />
                        </Field>
                      </FormControl>
                    </Grid>

                    {/* Conditional render if entity generated revenue */}
                    {values.revenue_status === "yes" && (
                      <>
                        <Grid item xs={12} md={4}>
                          <FormControl
                            fullWidth
                            error={
                              (isSubmitted || touched.last_yr_revenue) &&
                              Boolean(errors.last_yr_revenue)
                            }
                          >
                            <Field fullWidth name="last_yr_revenue">
                              {({ field }) => (
                                <TextField
                                  {...field}
                                  type="number"
                                  label="Revenue From Last Year"
                                  error={
                                    (isSubmitted || touched.last_yr_revenue) &&
                                    Boolean(errors.last_yr_revenue)
                                  }
                                />
                              )}
                            </Field>
                            {(isSubmitted || touched.last_yr_revenue) && errors.last_yr_revenue && (
                              <FormHelperText>{errors.last_yr_revenue}</FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl
                            fullWidth
                            error={
                              (isSubmitted || touched.last_month_revenue) &&
                              Boolean(errors.last_month_revenue)
                            }
                          >
                            <Field fullWidth name="last_month_revenue">
                              {({ field }) => (
                                <TextField
                                  {...field}
                                  type="number"
                                  label="Revenue From Last Month"
                                  error={
                                    (isSubmitted || touched.last_month_revenue) &&
                                    Boolean(errors.last_month_revenue)
                                  }
                                />
                              )}
                            </Field>
                            {(isSubmitted || touched.last_month_revenue) &&
                              errors.last_month_revenue && (
                                <FormHelperText>{errors.last_month_revenue}</FormHelperText>
                              )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl
                            fullWidth
                            error={
                              (isSubmitted || touched.last_month_net_profit) &&
                              Boolean(errors.last_month_net_profit)
                            }
                          >
                            <Field fullWidth name="last_month_net_profit">
                              {({ field }) => (
                                <TextField
                                  {...field}
                                  type="number"
                                  label="Net Profit From Last Month"
                                  error={
                                    (isSubmitted || touched.last_month_net_profit) &&
                                    Boolean(errors.last_month_net_profit)
                                  }
                                />
                              )}
                            </Field>
                            {(isSubmitted || touched.last_month_net_profit) &&
                              errors.last_month_net_profit && (
                                <FormHelperText>{errors.last_month_net_profit}</FormHelperText>
                              )}
                          </FormControl>
                        </Grid>
                      </>
                    )}

                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        Funding Details
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.funding_goal) && Boolean(errors.funding_goal)
                        }
                      >
                        <Field fullWidth name="funding_goal">
                          {({ field }) => (
                            <TextField
                              {...field}
                              type="number"
                              label="Funding Goal"
                              error={
                                (isSubmitted || touched.funding_goal) &&
                                Boolean(errors.funding_goal)
                              }
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.funding_goal) && errors.funding_goal && (
                          <FormHelperText>{errors.funding_goal}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.equity_offered) && Boolean(errors.equity_offered)
                        }
                      >
                        <Field fullWidth name="equity_offered">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Equity Offered"
                              error={
                                (isSubmitted || touched.equity_offered) &&
                                Boolean(errors.equity_offered)
                              }
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.equity_offered) && errors.equity_offered && (
                          <FormHelperText>{errors.equity_offered}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        Financing History
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">
                          Have you Previously Raised Money/Have Loan Obligations?
                        </FormLabel>
                        <Field name="raised_owed" as={RadioGroup} row>
                          {" "}
                          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="no" control={<Radio />} label="No" />
                        </Field>
                      </FormControl>
                    </Grid>

                    {values.raised_owed === "yes" && (
                      <Grid item xs={12} md={4}>
                        <FormControl
                          fullWidth
                          error={
                            (isSubmitted || touched.amount_raised_owed) &&
                            Boolean(errors.amount_raised_owed)
                          }
                        >
                          <Field fullWidth name="amount_raised_owed">
                            {({ field }) => (
                              <TextField
                                {...field}
                                label="Amount Raised/Owed"
                                error={
                                  (isSubmitted || touched.amount_raised_owed) &&
                                  Boolean(errors.amount_raised_owed)
                                }
                              />
                            )}
                          </Field>
                          {(isSubmitted || touched.amount_raised_owed) &&
                            errors.amount_raised_owed && (
                              <FormHelperText>{errors.amount_raised_owed}</FormHelperText>
                            )}
                        </FormControl>
                      </Grid>
                    )}
                  </Grid>
                )}
                {currentStep === 4 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        Business Landscape
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.your_competitors) &&
                          Boolean(errors.your_competitors)
                        }
                      >
                        <Field name="your_competitors">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Your Competitors"
                              error={
                                (isSubmitted || touched.your_competitors) &&
                                Boolean(errors.your_competitors)
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
                        {(isSubmitted || touched.your_competitors) && errors.your_competitors && (
                          <FormHelperText>{errors.your_competitors}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.growth_opportunities) &&
                          Boolean(errors.growth_opportunities)
                        }
                      >
                        <Field name="growth_opportunities">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Growth Opportunities"
                              error={
                                (isSubmitted || touched.growth_opportunities) &&
                                Boolean(errors.growth_opportunities)
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
                        {(isSubmitted || touched.growth_opportunities) &&
                          errors.growth_opportunities && (
                            <FormHelperText>{errors.growth_opportunities}</FormHelperText>
                          )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        Team & Assets
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.company_size) && Boolean(errors.company_size)
                        }
                      >
                        <Field fullWidth name="company_size">
                          {({ field }) => (
                            <TextField
                              {...field}
                              type="number"
                              label="Company Size"
                              error={
                                (isSubmitted || touched.company_size) &&
                                Boolean(errors.company_size)
                              }
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.company_size) && errors.company_size && (
                          <FormHelperText>{errors.company_size}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.team_composition) &&
                          Boolean(errors.team_composition)
                        }
                      >
                        <Field name="team_composition">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Team Composition"
                              error={
                                (isSubmitted || touched.team_composition) &&
                                Boolean(errors.team_composition)
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
                        {(isSubmitted || touched.team_composition) && errors.team_composition && (
                          <FormHelperText>{errors.team_composition}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.business_assets) &&
                          Boolean(errors.business_assets)
                        }
                      >
                        <Field name="business_assets">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Key Business Assets"
                              error={
                                (isSubmitted || touched.business_assets) &&
                                Boolean(errors.business_assets)
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
                        {(isSubmitted || touched.business_assets) && errors.business_assets && (
                          <FormHelperText>{errors.business_assets}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                )}

                {currentStep === 5 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        Operations & Market
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.geo_operation) && Boolean(errors.geo_operation)
                        }
                      >
                        <Field
                          id="industry-select"
                          name="geo_operation"
                          as={TextField}
                          select
                          label="Geographic Operation"
                          onChange={(event) => {
                            setFieldValue("geo_operation", event.target.value);
                          }}
                          error={(isSubmitted || touched.industry) && Boolean(errors.industry)}
                        >
                          {geo_locations.map((geo_location) => (
                            <MenuItem key={geo_location.value} value={geo_location.value}>
                              {geo_location.label}
                            </MenuItem>
                          ))}
                        </Field>
                        {(isSubmitted || touched.geo_operation) && errors.geo_operation && (
                          <FormHelperText>{errors.geo_operation}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.customer_number) &&
                          Boolean(errors.customer_number)
                        }
                      >
                        <Field fullWidth name="customer_number">
                          {({ field }) => (
                            <TextField
                              {...field}
                              type="number"
                              label="Number of Customers"
                              error={
                                (isSubmitted || touched.customer_number) &&
                                Boolean(errors.customer_number)
                              }
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.customer_number) && errors.customer_number && (
                          <FormHelperText>{errors.customer_number}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.customer_base) && Boolean(errors.customer_base)
                        }
                      >
                        <Field name="customer_base">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Customer Base Description"
                              error={
                                (isSubmitted || touched.customer_base) &&
                                Boolean(errors.customer_base)
                              }
                              multiline
                              rows={6}
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
                        {(isSubmitted || touched.customer_base) && errors.customer_base && (
                          <FormHelperText>{errors.customer_base}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        Company Milestones
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.key_achievements) &&
                          Boolean(errors.key_achievements)
                        }
                      >
                        <Field name="key_achievements">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Key Company Achievements/Events"
                              error={
                                (isSubmitted || touched.key_achievements) &&
                                Boolean(errors.key_achievements)
                              }
                              multiline
                              rows={6}
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
                        {(isSubmitted || touched.key_achievements) && errors.key_achievements && (
                          <FormHelperText>{errors.key_achievements}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        Legal & Compliance
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.legal_considerations) &&
                          Boolean(errors.legal_considerations)
                        }
                      >
                        <Field name="legal_considerations">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Legal Considerations/Patents"
                              error={
                                (isSubmitted || touched.legal_considerations) &&
                                Boolean(errors.legal_considerations)
                              }
                              multiline
                              rows={6}
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
                        {(isSubmitted || touched.legal_considerations) &&
                          errors.legal_considerations && (
                            <FormHelperText>{errors.legal_considerations}</FormHelperText>
                          )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        Reference & Testimonials
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.reference_testimonials) &&
                          Boolean(errors.reference_testimonials)
                        }
                      >
                        <Field name="reference_testimonials">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Reference & Testimonials"
                              error={
                                (isSubmitted || touched.reference_testimonials) &&
                                Boolean(errors.reference_testimonials)
                              }
                              multiline
                              rows={6}
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
                        {(isSubmitted || touched.reference_testimonials) &&
                          errors.reference_testimonials && (
                            <FormHelperText>{errors.reference_testimonials}</FormHelperText>
                          )}
                      </FormControl>
                    </Grid>
                  </Grid>
                )}

                {currentStep === 6 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        Contact & Communication
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
                    <Grid item xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.exit_strategy) && Boolean(errors.exit_strategy)
                        }
                      >
                        <Field fullWidth name="exit_strategy">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Exit Strategy(Optional)"
                              error={
                                (isSubmitted || touched.exit_strategy) &&
                                Boolean(errors.exit_strategy)
                              }
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.exit_strategy) && errors.exit_strategy && (
                          <FormHelperText>{errors.exit_strategy}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        Documents & Media
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
                  {currentStep < 6 ? (
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
