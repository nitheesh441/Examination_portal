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

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";


// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import Kumaraguru from "layouts/teacher/dashboard/components/Kumaraguru";
import Announcement from "layouts/teacher/dashboard/components/Notice Board";
import ExamInfo from "layouts/teacher/dashboard/components/Exam Info";
import FeedbackInfo from "layouts/teacher/dashboard/components/Feedbacks Info";
import ResultInfo from "./components/Results Info";
import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { sroutes, troutes, proutes } from 'routes';
import brand from "assets/images/logo-ct.png";
import Sidenav from "examples/Sidenav";
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";
// Data


function TDashboard() {
  
  
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);

    // Open sidenav when mouse enter on mini sidenav
    const handleOnMouseEnter = () => {
      if (miniSidenav && !onMouseEnter) {
        setMiniSidenav(dispatch, false);
        setOnMouseEnter(true);
      }
    };
  
    // Close sidenav when mouse leave mini sidenav
    const handleOnMouseLeave = () => {
      if (onMouseEnter) {
        setMiniSidenav(dispatch, true);
        setOnMouseEnter(false);
      }
    };
    const { size } = typography;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="Exam Portal"
            routes={troutes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
      <SoftBox py={3}>

        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Kumaraguru />
            </Grid>
            <Grid item xs={8} lg={8}>
              <Announcement />
            </Grid>
            <Grid item xs={4} lg={4}>
              <ExamInfo />
              <ResultInfo />

              
            </Grid>
            <Grid item xs={12} lg={12}>
              <FeedbackInfo />
            </Grid>
          </Grid>
        </SoftBox>

       
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default TDashboard;
