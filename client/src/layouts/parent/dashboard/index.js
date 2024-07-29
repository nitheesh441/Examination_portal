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
import Kumaraguru from "layouts/parent/dashboard/components/Kumaraguru";
import Announcement from "layouts/parent/dashboard/components/Notice Board";
import ExamInfo from "layouts/parent/dashboard/components/Exam Info";
import ResultInfo from "layouts/parent/dashboard/components/Results Info";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { sroutes, troutes, proutes } from 'routes';
import brand from "assets/images/logo-ct.png";
import Sidenav from "examples/Sidenav";
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
// Data


function PDashboard() {
  const { size } = typography;
  const navigate = useNavigate()
  
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      try {

        const decodedToken = jwtDecode(authToken);


        const { username, usertype } = decodedToken;
        const rollNo = username; // Replace 'yourRollNo' with the actual roll number
       

      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    } else {
      console.error('JWT token not found');
      navigate('/login');
    }
  }, []);
  
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


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="Exam Portal"
            routes={proutes}
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

          </Grid>
        </SoftBox>

       
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default PDashboard;
