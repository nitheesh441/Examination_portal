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
import Card from "@mui/material/Card";
// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// Soft UI Dashboard React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";

// Authentication layout components


function CoverLayout({ color, header, title, description, image, top, children }) {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
      <Grid
        container
        justifyContent="left"
        sx={{
        
          marginLeft: 5,
          position:"static"
        }}
      >
        <Grid item xs={11} sm={8} md={5} xl={5}>
        
          <SoftBox mt={2}>
            <SoftBox pt={3} px={1}>
              {!header ? (
                <>
                  <SoftBox mb={1}>
                    <SoftTypography variant="h3" fontWeight="bold" color={color} textGradient>
                      {title}
                    </SoftTypography>
                  </SoftBox>
                  <SoftTypography variant="body2" fontWeight="regular" color="text">
                    {description}
                  </SoftTypography>
                </>
              ) : (
                header
              )}
            </SoftBox>
            <SoftBox p={3}>{children}</SoftBox>
          </SoftBox>
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
      <SoftBox
        height="100%"
        display={{ xs: 'none', md: 'block' }}
        position="relative"
        right={{ md: "-7rem", xl: "-9rem" }}
        mr={0}
            sx={{
             
              overflow: "hidden",
              borderBottomLeftRadius: ({ borders: { borderRadius } }) => borderRadius.lg,
            }}
      >
        <img
          src={image}
          alt="Full View Image"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scaleX(1)', // Flip image horizontally if needed
          }}
        />
      </SoftBox>

    </Grid>
      </Grid>
      </Card>
    </DashboardLayout>
  );
}

// Setting default values for the props of CoverLayout
CoverLayout.defaultProps = {
  header: "",
  title: "",
  description: "",
  color: "info",
  top: 20,
};

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  top: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
