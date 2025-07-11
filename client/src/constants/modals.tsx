import { Grid } from "@mui/material";
import { TERMS_AND_CONDITION_CONTENT } from "./index";

export const MODALS = {
  AUTH_REGISTER_SUCCESS: {
    name: "AUTH_REGISTER_SUCCESS",
    title: "Success",
    content: `Your account has been successfully created!`,
  },
  AUTH_LOGIN_SUCCESS: {
    name: "AUTH_LOGIN_SUCCESS",
    title: "Success",
    content: `Your account has been successfully loggin!`,
  },
  VERIFY_SUCCESS: {
    name: "VERIFY_SUCCESS",
    title: "Success",
    content: `Your account has been successfully verified!`,
  },
  PRIVATE_PRIVACY: {
    name: "PRIVATE_PRIVACY",
    title: "Privacy Policy",
    content: (
      <Grid container direction="column" gap={2} sx={{ fontSize: "10px" }}>
        <Grid>Last updated: [Date]</Grid>
        <Grid>
          [Your Company Name] ("us", "we", or "our") operates the [Your Website
          or App Name] website and [mobile application/service] (the "Service").
        </Grid>
        <Grid>
          This page informs you of our policies regarding the collection, use,
          and disclosure of personal data when you use our Service and the
          choices you have associated with that data.
        </Grid>
        <Grid>
          We use your data to provide and improve the Service. By using the
          Service, you agree to the collection and use of information in
          accordance with this policy.
        </Grid>
        <Grid sx={{ fontWeight: "bold" }}>Information Collection and Use</Grid>
        <Grid sx={{ marginTop: "-10px" }}>
          We collect several different types of information for various purposes
          to provide and improve our Service to you.
        </Grid>
        <Grid sx={{ fontWeight: "bold" }}>Types of Data Collected</Grid>
        <Grid>
          <ul style={{ marginTop: "-10px", marginLeft: "-10px" }}>
            <li>Personal Data:</li>
            <li>
              <ul>
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Address, State, Province, ZIP/Postal code, City</li>
                <li>Cookies and Usage Data</li>
              </ul>
            </li>
            <li>Usage Data:</li>
            <li>We may</li>
          </ul>
        </Grid>
      </Grid>
    ),
  },
  TERMS_AND_CONDITION_CONTENT: {
    name: "TERMS_AND_CONDITION_CONTENT",
    title: "Terms and Conditions",
    content: (
      <Grid container gap={2} sx={{ fontSize: "10px" }}>
        <Grid>Last updated: [Date]</Grid>
        <Grid>
          Please read these terms and conditions ("Terms", "Terms and
          Conditions") carefully before using the [Your Website or App Name]
          website and [mobile application/service] (the "Service") operated by
          [Your Company Name] ("us", "we", or "our").
        </Grid>
        <Grid>
          Your access to and use of the Service is conditioned on your
          acceptance of and compliance with these Terms. These Terms apply to
          all visitors, users, and others who access or use the Service.
        </Grid>
        <Grid>
          By accessing or using the Service, you agree to be bound by these
          Terms. If you disagree with any part of the terms, then you may not
          access the Service.
        </Grid>
        <Grid sx={{ fontWeight: "bold" }}>Accounts</Grid>
        <Grid>
          When you create an account with us, you must provide accurate and
          complete information. You are solely responsible for safeguarding the
          password that you use to access the Service and for any activities or
          actions under your password.
        </Grid>
        <Grid sx={{ fontWeight: "bold" }}>Intellectual Property</Grid>
        <Grid>
          The Service and its original content, features, and functionality are
          and will remain the exclusive property of [Your Company Name] and its
          licensors. The Service is protected by copyright, trademark, and other
          laws of both [country] and foreign countries.
        </Grid>

        <Grid sx={{ fontWeight: "bold" }}>Links to Other Websites</Grid>
        <Grid>
          Our Service may contain links to third-party websites or services that
          are not owned or controlled by [Your Company Name]. We have no control
          over and assume no responsibility for the content, privacy policies,
          or practices of any third-party websites or services.
        </Grid>

        <Grid sx={{ fontWeight: "bold" }}>Changes</Grid>
        <Grid>
          We reserve the right, at our sole discretion, to modify or replace
          these Terms at any time. If a revision is material, we will try to
          provide at least 30 days' notice prior to any new terms taking effect.
          What constitutes a material change will be determined at our sole
          discretion.
        </Grid>

        <Grid sx={{ fontWeight: "bold" }}>Contact Us</Grid>

        <Grid>
          If you have any questions about these Terms, please contact us at
          [Contact Email].
        </Grid>
      </Grid>
    ),
  },
};

const MODAL_CONTENT = (type: string) => {
  if (type === TERMS_AND_CONDITION_CONTENT) {
    return {
      title: "TERMS AND CONDITIONS",
      content: (
        <Grid container gap={2}>
          <Grid>Last updated: [Date]</Grid>
          <Grid>
            Please read these terms and conditions ("Terms", "Terms and
            Conditions") carefully before using the [Your Website or App Name]
            website and [mobile application/service] (the "Service") operated by
            [Your Company Name] ("us", "we", or "our").
          </Grid>
          <Grid>
            Your access to and use of the Service is conditioned on your
            acceptance of and compliance with these Terms. These Terms apply to
            all visitors, users, and others who access or use the Service.
          </Grid>
          <Grid>
            By accessing or using the Service, you agree to be bound by these
            Terms. If you disagree with any part of the terms, then you may not
            access the Service.
          </Grid>
          <Grid sx={{ fontWeight: "bold" }}>Accounts</Grid>
          <Grid>
            When you create an account with us, you must provide accurate and
            complete information. You are solely responsible for safeguarding
            the password that you use to access the Service and for any
            activities or actions under your password.
          </Grid>
          <Grid sx={{ fontWeight: "bold" }}>Intellectual Property</Grid>
          <Grid>
            The Service and its original content, features, and functionality
            are and will remain the exclusive property of [Your Company Name]
            and its licensors. The Service is protected by copyright, trademark,
            and other laws of both [country] and foreign countries.
          </Grid>

          <Grid sx={{ fontWeight: "bold" }}>Links to Other Websites</Grid>
          <Grid>
            Our Service may contain links to third-party websites or services
            that are not owned or controlled by [Your Company Name]. We have no
            control over and assume no responsibility for the content, privacy
            policies, or practices of any third-party websites or services.
          </Grid>

          <Grid sx={{ fontWeight: "bold" }}>Changes</Grid>
          <Grid>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material, we will try to
            provide at least 30 days' notice prior to any new terms taking
            effect. What constitutes a material change will be determined at our
            sole discretion.
          </Grid>

          <Grid sx={{ fontWeight: "bold" }}>Contact Us</Grid>

          <Grid>
            If you have any questions about these Terms, please contact us at
            [Contact Email].
          </Grid>
        </Grid>
      ),
    };
  } else if (type === "PRIVATE_PRIVACY") {
    return {
      title: "PRIVATE PRIVACY",
      content: (
        <Grid container direction="column" gap={2}>
          <Grid>Last updated: [Date]</Grid>
          <Grid>
            [Your Company Name] ("us", "we", or "our") operates the [Your
            Website or App Name] website and [mobile application/service] (the
            "Service").
          </Grid>
          <Grid>
            This page informs you of our policies regarding the collection, use,
            and disclosure of personal data when you use our Service and the
            choices you have associated with that data.
          </Grid>
          <Grid>
            We use your data to provide and improve the Service. By using the
            Service, you agree to the collection and use of information in
            accordance with this policy.
          </Grid>
          <Grid sx={{ fontWeight: "bold" }}>
            Information Collection and Use
          </Grid>
          <Grid sx={{ marginTop: "-10px" }}>
            We collect several different types of information for various
            purposes to provide and improve our Service to you.
          </Grid>
          <Grid sx={{ fontWeight: "bold" }}>Types of Data Collected</Grid>
          <Grid>
            <ul style={{ marginTop: "-10px", marginLeft: "-10px" }}>
              <li>Personal Data:</li>
              <li>
                <ul>
                  <li>Email address</li>
                  <li>First name and last name</li>
                  <li>Phone number</li>
                  <li>Address, State, Province, ZIP/Postal code, City</li>
                  <li>Cookies and Usage Data</li>
                </ul>
              </li>
              <li>Usage Data:</li>
              <li>We may</li>
            </ul>
          </Grid>
        </Grid>
      ),
    };
  }
};

export { MODAL_CONTENT };
