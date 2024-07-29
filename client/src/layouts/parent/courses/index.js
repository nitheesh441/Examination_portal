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
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // for making HTTP requests
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import Swal from "sweetalert2";
import Syllabus from "documents/syllabus/Syllabus.pdf"




import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { sroutes, troutes, proutes } from 'routes';
import brand from "assets/images/logo-ct.png";
import Sidenav from "examples/Sidenav";
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";

function Pcourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    // Fetch courses from backend
    axios.get('http://localhost:8800/course/courseget') // Adjust the endpoint URL as necessary
      .then(response => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
        setLoading(false);
      });
  }, []);
  const getBadgeColor = (courseType) => {
    if (courseType === 'ELECTIVE') {
      return 'success'; 
    } else if (courseType === 'CORE') {
      return 'info';
    }
    return 'default'; 
  };
  const badgeStyle = {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    textAlign: 'center',
    minWidth: '60px'
  };
  function handleDownload() {
    Swal.fire({
      title: 'Download Syllabus',
      text: "Are you sure you want to download this file?",
      icon: 'warning',
      showCancelButton: true,
      backdrop: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, download it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const link = document.createElement('a');
        link.href = Syllabus; // Use the imported PDF file
        link.setAttribute('download', 'Syllabus.pdf'); // Set the download attribute
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  }
  
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

  
    const columns = [
     
      { name: "course_code", align: "left" },
      { name: "course_name", align: "left" },
      { name: "course_type", align: "center" },
      { name: "created_at", align: "center" },
      { name: "syllabus", align: "center" },
     
     
    ];
    const rows = courses.map(course => ({

     
        course_code: (<SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      
        <SoftBox display="flex" flexDirection="column">
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {course.courseCode}
        </SoftTypography>
         
        </SoftBox>
      </SoftBox>),
       
       course_name: (
        <SoftTypography variant="caption" fontWeight="medium">
        {course.courseName}
      </SoftTypography> 
        ),
       
        course_type: (
          <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      
        <SoftBox display="flex" flexDirection="column">
        <SoftBadge
          variant="gradient"
          badgeContent={course.courseType}
          color={getBadgeColor(course.courseType)} // Determine badge color dynamically
          size="xs" 
          style={badgeStyle}
          container
        />
         
        </SoftBox>
      </SoftBox>
          
        
        ),
   

        syllabus: (
          <SoftTypography  variant="h4" onClick={handleDownload}  color="secondary">
          <Tooltip pt={3} title="Download Syllabus" placement="bottom">
            <Icon>download</Icon>
          </Tooltip>
        </SoftTypography>
        ),
        created_at: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
           {new Date(course.createdAt).toLocaleDateString()}
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
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h5">Enrolled Courses</SoftTypography>
             
           
            
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
              <Table columns={columns} rows={rows} />
            </SoftBox>
          </Card>
        </SoftBox>
       
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Pcourses;
