/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";

// Authentication layout components


function BasicLayout({ title, description, image, children }) {
  return (
    <PageLayout>
    {/* Full-screen background image */}
    <SoftBox
      minHeight="100vh" // Set minimum height to cover the entire viewport
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
          image &&
          `${linearGradient(
            rgba(gradients.dark.main, 0.6),
            rgba(gradients.dark.state, 0.6)
          )}, url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content container */}
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={10} lg={4}  >
        <SoftTypography variant="h1" color="white"  fontWeight="bold" align="center" >
              {title}
            </SoftTypography>
          <SoftBox p={4} bgcolor="rgba(255, 255, 255, 0.9)" borderRadius="md" boxShadow="sm">
            

            {children}
          </SoftBox>
        </Grid>
      </Grid>
    </SoftBox>
 
  </PageLayout>
  );
}

// Setting default values for the props of BasicLayout
BasicLayout.defaultProps = {
  title: "",
  description: "",
};

// Typechecking props for the BasicLayout
BasicLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
