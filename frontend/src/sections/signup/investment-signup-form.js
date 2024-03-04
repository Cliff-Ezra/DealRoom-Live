// External imports
import axios from "axios";
import Select from "react-select";
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
  FormGroup,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/CloseRounded";
import UploadIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";

const investor_types = [
  { value: "Individual", label: "Individual" },
  { value: "Venture Capital", label: "Venture Capital" },
  { value: "Angel Investor", label: "Angel Investor" },
  { value: "Private Equity", label: "Private Equity" },
  { value: "Institutional", label: "Institutional" },
  { value: "other", label: "Other" },
];

const experiences = [
  { value: "Newbie", label: "Newbie" },
  { value: "Few Investments", label: "Few Investments" },
  { value: "Experienced", label: "Experienced" },
  { value: "Veteran", label: "Veteran" },
];

const investments = [
  { value: "PPP", label: "PPP" },
  { value: "Joint Venture", label: "Joint Venture" },
  { value: "Private Public", label: "Private Public" },
  { value: "Equity Purchase", label: "Equity Purchase" },
  { value: "Debt Financing", label: "Debt Financing" },
];

const geo_locations = [
  { value: "local", label: "Local" },
  { value: "regional", label: "Regional" },
  { value: "national", label: "National" },
  { value: "international", label: "International" },
];

const project_statuses = [
  { value: "Pre-Feasibility", label: "Pre-Feasibility" },
  { value: "Feasibility Started", label: "Feasibility Started" },
  { value: "Feasibility Completed", label: "Feasibility Completed" },
];

const timelines = [
  { value: "Immediate (1-3 months)", label: "Immediate (1-3 months)" },
  { value: "Short Term (3-6 months)", label: "Short Term (3-6 months)" },
  { value: "Long Term (6-12 months+)", label: "Medium Term (6-12+ months+)" },
];

const return_investments = [
  { value: "5-10%", label: "5-10%" },
  { value: "10-20%", label: "10-20%" },
  { value: "20-30%", label: "20-30%" },
  { value: "30-40%", label: "30-40%" },
  { value: "40-50%", label: "40-50%" },
  { value: "50%+", label: "50%+" },
];

const risks = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

const ranges = [
  { value: "$10K-$50k", label: "$10K-$50k" },
  { value: "$50K-$100k", label: "$50K-$100k" },
  { value: "$100K-$500k", label: "$100K-$500k" },
  { value: "$500K-$1M", label: "$500K-$1M" },
  { value: "$1M-$5M", label: "$1M-$5M" },
  { value: "$5M-$10M", label: "$5M-$10M" },
  { value: "$10M+", label: "$10M+" },
];

const sources = [
  { value: "Online Ad", label: "Online Ad" },
  { value: "Social Media", label: "Social Media" },
  { value: "Referral", label: "Referral" },
  { value: "Event", label: "Event" },
  { value: "Other", label: "Other" },
];

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

// Styles for select component
const selectStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: "56px",
  }),
  menuPortal: (provided) => ({
    ...provided,
    zIndex: 99999,
  }),
};

export const InvestmentSignupForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [funds_docs, setFundsDocs] = useState([]);
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
    setFundsDocs((prevAttachments) => [...prevAttachments, ...Array.from(files)]);
  };

  const handleAttachmentRemove = (index) => {
    setFundsDocs((prevAttachments) => prevAttachments.filter((_, i) => i !== index));
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
    investor_name: Yup.string().required("Opportunity name is required"),
    investor_email: Yup.string()
      .email("Invalid email address")
      .required("Investor Email is required"),
    investor_phone: Yup.string()
      .required("Investor Phone is required")
      .matches(
        /^\+\d{3} \d{9}$/,
        "Phone number is not valid. It should match the format: '+256 723329485'"
      ),
    investor_type: Yup.string().required("Investor type is required"),
    experience: Yup.string().required("Experience is required"),
    investment_portfolio: Yup.string().required("Investment Portfolio is required"),

    investment_type: Yup.string().required("Investment type is required"),
    geo_operation: Yup.string().required("Geographic preference is required"),
    investment_industry: Yup.object().test(
      "at-least-one-true",
      "You must select at least one industry/sector",
      (value) => Object.values(value).some((v) => v === true)
    ),
    project_type: Yup.object().test(
      "at-least-one-true",
      "You must select at least one project type",
      (value) => Object.values(value).some((v) => v === true)
    ),
    timeline_preference: Yup.string().required("Timeline preference is required"),
    return_on_investment: Yup.string().required("Return on investment is required"),
    risk_tolerance: Yup.string().required("Risk tolerance is required"),

    investment_range: Yup.string().required("Investment range is required"),
    investment_cap: Yup.number()
      .min(0, "Investment cap cannot be negative")
      .required("Investment cap is required"),
    comm_method: Yup.object().test(
      "at-least-one-true",
      "You must select at least one communication method",
      (value) => Object.values(value).some((v) => v === true)
    ),
    referral_source: Yup.string().required("Referral source is required"),
    special_requests: Yup.string().required("Special requests is required"),

    terms_and_conditions: Yup.bool().oneOf([true], "You must agree to the terms and conditions"),
    risk_agreement: Yup.bool().oneOf([true], "You must agree to the risk agreement"),
  });

  // Submission logic
  const handleSubmit = (values) => {
    // Create a variable to store the submitted data
    const formData = new FormData();
    formData.append("investor_name", values.investor_name);
    formData.append("investor_email", values.investor_email);
    formData.append("investor_phone", values.investor_phone);
    formData.append("investor_type", values.investor_type);
    formData.append("experience", values.experience);
    formData.append("investment_portfolio", values.investment_portfolio);

    formData.append("investment_type", values.investment_type);
    formData.append("geo_operation", values.geo_operation);
    // Append each selected industry/sector
    Object.entries(values.investment_industry).forEach(([key, value]) => {
      if (value) {
        formData.append("investment_industry", key);
      }
    });
    // Append each selected project type
    Object.entries(values.project_type).forEach(([key, value]) => {
      if (value) {
        formData.append("project_type", key);
      }
    });
    formData.append("timeline_preference", values.timeline_preference);
    formData.append("return_on_investment", values.return_on_investment);
    formData.append("risk_tolerance", values.risk_tolerance);

    formData.append("investment_range", values.investment_range);
    formData.append("investment_cap", values.investment_cap);
    // Append relevant docs
    for (let i = 0; i < funds_docs.length; i++) {
      formData.append(`funds_doc${i}`, funds_docs[i]);
    }
    // Append each selected communication method
    Object.entries(values.comm_method).forEach(([key, value]) => {
      if (value) {
        formData.append("comm_method", key);
      }
    });
    formData.append("referral_source", values.referral_source);
    formData.append("special_requests", values.special_requests);

    formData.append("terms_and_conditions", values.terms_and_conditions);
    formData.append("risk_agreement", values.risk_agreement);

    console.log("Submitted investor data:", formData);

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
        title="Investment Signup Information"
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
              investor_name: "",
              investor_email: "",
              investor_phone: "",
              investor_type: "",
              experience: "",
              investment_portfolio: "",

              investment_type: "",
              geo_operation: "",
              investment_industry: [],
              project_type: {
                Greenfield: false,
                Brownfield: false,
                Expansion: false,
              },
              timeline_preference: "",
              return_on_investment: "",
              risk_tolerance: "",

              investment_range: "",
              investment_cap: "",
              comm_method: {
                Email: false,
                Phone: false,
                In_Person_Meetings: false,
                Video_Calls: false,
                Other: false,
              },
              referral_source: "",
              special_requests: "",

              terms_and_conditions: false,
              risk_agreement: false,
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
                        <strong>Investor Details</strong>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.investor_name) && Boolean(errors.investor_name)
                        }
                      >
                        <Field fullWidth name="investor_name">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Full Name/Firm Name"
                              error={
                                (isSubmitted || touched.investor_name) &&
                                Boolean(errors.investor_name)
                              }
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.investor_name) && errors.investor_name && (
                          <FormHelperText>{errors.investor_name}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.investor_email) && Boolean(errors.investor_email)
                        }
                      >
                        <Field fullWidth name="investor_email">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Email"
                              error={
                                (isSubmitted || touched.investor_email) &&
                                Boolean(errors.investor_email)
                              }
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.investor_email) && errors.investor_email && (
                          <FormHelperText>{errors.investor_email}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.investor_phone) && Boolean(errors.investor_phone)
                        }
                      >
                        <Field fullWidth name="investor_phone">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Phone Number"
                              error={
                                (isSubmitted || touched.investor_phone) &&
                                Boolean(errors.investor_phone)
                              }
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.investor_phone) && errors.investor_phone && (
                          <FormHelperText>{errors.investor_phone}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        <strong>Investment Profile</strong>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.investor_type) && Boolean(errors.investor_type)
                        }
                      >
                        <Field
                          id="investor-type-select"
                          name="investor_type"
                          as={TextField}
                          select
                          label="Investor Type"
                          onChange={(event) => {
                            setFieldValue("investor_type", event.target.value);
                          }}
                          error={
                            (isSubmitted || touched.investor_type) && Boolean(errors.investor_type)
                          }
                        >
                          {investor_types.map((inv_type) => (
                            <MenuItem key={inv_type.value} value={inv_type.value}>
                              {inv_type.label}
                            </MenuItem>
                          ))}
                        </Field>
                        {(isSubmitted || touched.investor_type) && errors.investor_type && (
                          <FormHelperText>{errors.investor_type}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <FormControl
                        fullWidth
                        error={(isSubmitted || touched.experience) && Boolean(errors.experience)}
                      >
                        <Field
                          id="experience-select"
                          name="experience"
                          as={TextField}
                          select
                          label="Investment Experience"
                          onChange={(event) => {
                            setFieldValue("experience", event.target.value);
                          }}
                          error={(isSubmitted || touched.experience) && Boolean(errors.experience)}
                        >
                          {experiences.map((inv_type) => (
                            <MenuItem key={inv_type.value} value={inv_type.value}>
                              {inv_type.label}
                            </MenuItem>
                          ))}
                        </Field>
                        {(isSubmitted || touched.experience) && errors.experience && (
                          <FormHelperText>{errors.experience}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.investment_portfolio) &&
                          Boolean(errors.investment_portfolio)
                        }
                      >
                        <Field name="investment_portfolio">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Investment Portfolio"
                              error={
                                (isSubmitted || touched.investment_portfolio) &&
                                Boolean(errors.investment_portfolio)
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
                        {(isSubmitted || touched.investment_portfolio) &&
                          errors.investment_portfolio && (
                            <FormHelperText>{errors.investment_portfolio}</FormHelperText>
                          )}
                      </FormControl>
                    </Grid>
                  </Grid>
                )}

                {currentStep === 2 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        <strong>Investment Preferences</strong>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.investment_type) &&
                          Boolean(errors.investment_type)
                        }
                      >
                        <Field
                          id="investment-type-select"
                          name="investment_type"
                          as={TextField}
                          select
                          label="Preferred Investment Type"
                          onChange={(event) => {
                            setFieldValue("investment_type", event.target.value);
                          }}
                          error={
                            (isSubmitted || touched.investment_type) &&
                            Boolean(errors.investment_type)
                          }
                        >
                          {investments.map((investment) => (
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
                          (isSubmitted || touched.geo_operation) && Boolean(errors.geo_operation)
                        }
                      >
                        <Field
                          id="location-select"
                          name="geo_operation"
                          as={TextField}
                          select
                          label="Geographic Operation"
                          onChange={(event) => {
                            setFieldValue("geo_operation", event.target.value);
                          }}
                          error={
                            (isSubmitted || touched.geo_operation) && Boolean(errors.geo_operation)
                          }
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
                      <FormControl>
                        <FormLabel id="demo-checkbox-group-label">
                          Preferred Industry/Sector
                        </FormLabel>
                        <Select
                          id="industry-select"
                          isMulti
                          menuPortalTarget={document.body}
                          name="investment_industry"
                          onChange={(selectedOptions) =>
                            setFieldValue("investment_industry", selectedOptions)
                          }
                          options={industries}
                          value={values.investment_industry}
                          placeholder="Select Industry"
                          styles={selectStyles}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl>
                        <FormLabel id="demo-checkbox-group-label">Project Type</FormLabel>
                        <FormGroup>
                          <Field name="project_type.Greenfield" type="checkbox">
                            {({ field, form }) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={field.value}
                                    onChange={() => form.setFieldValue(field.name, !field.value)}
                                  />
                                }
                                label="Greenfield"
                              />
                            )}
                          </Field>
                          <Field name="project_type.Brownfield" type="checkbox">
                            {({ field, form }) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={field.value}
                                    onChange={() => form.setFieldValue(field.name, !field.value)}
                                  />
                                }
                                label="Brownfield"
                              />
                            )}
                          </Field>
                          <Field name="project_type.Expansion" type="checkbox">
                            {({ field, form }) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={field.value}
                                    onChange={() => form.setFieldValue(field.name, !field.value)}
                                  />
                                }
                                label="Expansion"
                              />
                            )}
                          </Field>
                        </FormGroup>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        <strong>Matching Preferences</strong>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.timeline_preference) &&
                          Boolean(errors.timeline_preference)
                        }
                      >
                        <Field
                          id="timeline-select"
                          name="timeline_preference"
                          as={TextField}
                          select
                          label="Ideal Timeline Preference"
                          onChange={(event) => {
                            setFieldValue("timeline_preference", event.target.value);
                          }}
                          error={
                            (isSubmitted || touched.timeline_preference) &&
                            Boolean(errors.timeline_preference)
                          }
                        >
                          {timelines.map((timeline) => (
                            <MenuItem key={timeline.value} value={timeline.value}>
                              {timeline.label}
                            </MenuItem>
                          ))}
                        </Field>
                        {(isSubmitted || touched.timeline_preference) &&
                          errors.timeline_preference && (
                            <FormHelperText>{errors.timeline_preference}</FormHelperText>
                          )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.return_on_investment) &&
                          Boolean(errors.return_on_investment)
                        }
                      >
                        <Field
                          id="return-select"
                          name="return_on_investment"
                          as={TextField}
                          select
                          label="Return on Investment Expectation"
                          onChange={(event) => {
                            setFieldValue("return_on_investment", event.target.value);
                          }}
                          error={
                            (isSubmitted || touched.return_on_investment) &&
                            Boolean(errors.return_on_investment)
                          }
                        >
                          {return_investments.map((return_investment) => (
                            <MenuItem key={return_investment.value} value={return_investment.value}>
                              {return_investment.label}
                            </MenuItem>
                          ))}
                        </Field>
                        {(isSubmitted || touched.return_on_investment) &&
                          errors.return_on_investment && (
                            <FormHelperText>{errors.return_on_investment}</FormHelperText>
                          )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.risk_tolerance) && Boolean(errors.risk_tolerance)
                        }
                      >
                        <Field
                          id="risk-select"
                          name="risk_tolerance"
                          as={TextField}
                          select
                          label="Risk Tolerance"
                          onChange={(event) => {
                            setFieldValue("risk_tolerance", event.target.value);
                          }}
                          error={
                            (isSubmitted || touched.risk_tolerance) &&
                            Boolean(errors.risk_tolerance)
                          }
                        >
                          {risks.map((risk) => (
                            <MenuItem key={risk.value} value={risk.value}>
                              {risk.label}
                            </MenuItem>
                          ))}
                        </Field>
                        {(isSubmitted || touched.risk_tolerance) && errors.risk_tolerance && (
                          <FormHelperText>{errors.risk_tolerance}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                )}

                {currentStep === 3 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        <strong>Financial Information</strong>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.investment_range) &&
                          Boolean(errors.investment_range)
                        }
                      >
                        <Field
                          id="timeline-select"
                          name="investment_range"
                          as={TextField}
                          select
                          label="Typical Investment Range"
                          onChange={(event) => {
                            setFieldValue("investment_range", event.target.value);
                          }}
                          error={
                            (isSubmitted || touched.investment_range) &&
                            Boolean(errors.investment_range)
                          }
                        >
                          {ranges.map((range) => (
                            <MenuItem key={range.value} value={range.value}>
                              {range.label}
                            </MenuItem>
                          ))}
                        </Field>
                        {(isSubmitted || touched.investment_range) && errors.investment_range && (
                          <FormHelperText>{errors.investment_range}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.investment_cap) && Boolean(errors.investment_cap)
                        }
                      >
                        <Field fullWidth name="investment_cap">
                          {({ field }) => (
                            <TextField
                              {...field}
                              type="number"
                              label="Maximum Investment Cap"
                              error={
                                (isSubmitted || touched.investment_cap) &&
                                Boolean(errors.investment_cap)
                              }
                            />
                          )}
                        </Field>
                        {(isSubmitted || touched.investment_cap) && errors.investment_cap && (
                          <FormHelperText>{errors.investment_cap}</FormHelperText>
                        )}
                      </FormControl>
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
                        Proof of Funds Documents (Optional)
                        <input
                          accept="image/jpeg,image/png,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
                          hidden
                          id="attachment-upload"
                          name="funds_docs"
                          onChange={handleAttachmentsChange}
                          type="file"
                          multiple
                        />
                      </Button>
                      {funds_docs.length > 0 && (
                        <ul>
                          {funds_docs.map((attachment, index) => (
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
                      {!funds_docs.length && errors.funds_docs && (
                        <FormHelperText sx={{ color: "red" }}>{errors.funds_docs}</FormHelperText>
                      )}
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        <strong>Additional Information</strong>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <FormControl>
                        <FormLabel id="demo-checkbox-group-label">Communication Method</FormLabel>
                        <FormGroup>
                          <Field name="comm_method.Email" type="checkbox">
                            {({ field, form }) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={field.value}
                                    onChange={() => form.setFieldValue(field.name, !field.value)}
                                  />
                                }
                                label="Email"
                              />
                            )}
                          </Field>
                          <Field name="comm_method.Phone" type="checkbox">
                            {({ field, form }) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={field.value}
                                    onChange={() => form.setFieldValue(field.name, !field.value)}
                                  />
                                }
                                label="Phone"
                              />
                            )}
                          </Field>
                          <Field name="comm_method.In_Person_Meetings" type="checkbox">
                            {({ field, form }) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={field.value}
                                    onChange={() => form.setFieldValue(field.name, !field.value)}
                                  />
                                }
                                label="In-Person Meetings"
                              />
                            )}
                          </Field>
                          <Field name="comm_method.Video_Calls" type="checkbox">
                            {({ field, form }) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={field.value}
                                    onChange={() => form.setFieldValue(field.name, !field.value)}
                                  />
                                }
                                label="Video Calls"
                              />
                            )}
                          </Field>
                          <Field name="comm_method.Other" type="checkbox">
                            {({ field, form }) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={field.value}
                                    onChange={() => form.setFieldValue(field.name, !field.value)}
                                  />
                                }
                                label="Other"
                              />
                            )}
                          </Field>
                        </FormGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.referral_source) &&
                          Boolean(errors.referral_source)
                        }
                      >
                        <Field
                          id="referral-select"
                          name="referral_source"
                          as={TextField}
                          select
                          label="Referral Source (How did you hear about DealRoom?)"
                          onChange={(event) => {
                            setFieldValue("referral_source", event.target.value);
                          }}
                          error={
                            (isSubmitted || touched.referral_source) &&
                            Boolean(errors.referral_source)
                          }
                        >
                          {sources.map((source) => (
                            <MenuItem key={source.value} value={source.value}>
                              {source.label}
                            </MenuItem>
                          ))}
                        </Field>
                        {(isSubmitted || touched.referral_source) && errors.referral_source && (
                          <FormHelperText>{errors.referral_source}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl
                        fullWidth
                        error={
                          (isSubmitted || touched.special_requests) &&
                          Boolean(errors.special_requests)
                        }
                      >
                        <Field name="special_requests">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Special Requests or Notes"
                              error={
                                (isSubmitted || touched.special_requests) &&
                                Boolean(errors.special_requests)
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
                        {(isSubmitted || touched.special_requests) && errors.special_requests && (
                          <FormHelperText>{errors.special_requests}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                )}

                {currentStep === 4 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <Typography variant="body2" sx={{ my: 2 }}>
                        <strong>Legal & Compliance</strong>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <FormControl>
                        <FormGroup>
                          <Field name="terms_and_conditions" type="checkbox">
                            {({ field, form }) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={field.value}
                                    onChange={() => form.setFieldValue(field.name, !field.value)}
                                  />
                                }
                                label="I agree to the terms and conditions"
                              />
                            )}
                          </Field>
                        </FormGroup>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <FormControl>
                        <FormGroup>
                          <Field name="risk_agreement" type="checkbox">
                            {({ field, form }) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={field.value}
                                    onChange={() => form.setFieldValue(field.name, !field.value)}
                                  />
                                }
                                label="I understand that all investments have inherent risks and have taken the necessary measures to understand those risks:"
                              />
                            )}
                          </Field>
                        </FormGroup>
                      </FormControl>
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
                  {currentStep < 4 ? (
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
