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
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

 // for making HTTP requests
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";


import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { sroutes, troutes, proutes } from 'routes';
import brand from "assets/images/logo-ct.png";
import Sidenav from "examples/Sidenav";
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";


function Ptimetable() {
  const navigate = useNavigate()

  const [exams, setExams] = useState([]);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      try {
        // Decode the JWT token
        const decodedToken = jwtDecode(authToken);
    
        // Extract username and usertype from the decoded token
        const { username, usertype } = decodedToken;
    
        console.log('Username:', username);
        console.log('Usertype:', usertype);
    
        // Now you can use username and usertype in your application
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    } else {
      console.error('JWT token not found');
      navigate('/login');
    }
   
    axios.get('http://localhost:8800/exam/examsget')
      .then(response => {
        setExams(response.data);
        console.log(response.data)
        
      })
      .catch(error => {
        console.error('Error fetching timetable:', error);
       
      });
  }, []);




    const columns = [
     
      { name: "subject", align: "center" },
      { name: "courseCode", align: "center" },
      { name: "date", align: "center" },
      { name: "startTime", align: "center" },
      { name: "endTime", align: "center" },
     
     
    ];
  
    const renderRows = (subjects) =>
      subjects.map((subject) => ({
        subject: (
          <SoftTypography variant="button" fontWeight="medium">
            {subject.subjectName}
          </SoftTypography>
        ),
        courseCode: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {subject.courseCode}
          </SoftTypography>
        ),
        date: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
           {new Date(subject.date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })}
          </SoftTypography>
        ),
        startTime: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
           {new Date(subject.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </SoftTypography>
        ),
        endTime: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
         {new Date(subject.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </SoftTypography>
        ),
      }));
  
  
    

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
      {exams.map((exam) => (
          <SoftBox mb={3} key={exam._id}>
            <Card>
            <SoftBox p={2}>
                <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
                  <SoftBox>
                    <SoftTypography variant="h4" fontWeight="bold" textTransform="capitalize">
                     {exam.examName}
                    </SoftTypography>
                 </SoftBox>
  
                </SoftBox>


              </SoftBox>
              <SoftBox
                sx={{
                  "& .MuiTableRow-root:not(:last-child)": {
                    "& td": {
                      borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                        `${borderWidth[1]} solid ${borderColor}`,
                    },
                  },
                }}
              >
                <Table columns={columns} rows={renderRows(exam.subjects)} />
              </SoftBox>
            </Card>
          </SoftBox>
        ))}
       
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Ptimetable;
