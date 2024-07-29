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



// react-router-dom components
import { Link } from "react-router-dom";
import React from 'react';
import Swal from 'sweetalert2'
// @mui material components
import Switch from "@mui/material/Switch";
import { Container, Typography, Box, TextField, Button,FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
// Authentication layout components
import CoverLayout from "layouts/student/feedback/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/baymax2.jpeg";

import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { sroutes, troutes, proutes } from 'routes';
import brand from "assets/images/logo-ct.png";
import Sidenav from "examples/Sidenav";
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

function PFeedback() {
 

  const navigate = useNavigate()
  const [feedbackType, setFeedbackType] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  

  const [value, setValue] = React.useState(''); // State to store selected value

  const handleChange = (e) => {
    setFeedbackType(e.target.value);
  };

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
  


  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      try {

        const decodedToken = jwtDecode(authToken);


        const { username, usertype } = decodedToken;
        const feedbackData = {
          username,
          userType: usertype,
          feedbackType,
          message: feedbackMessage,
        };
        const response = await axios.post(
          'http://localhost:8800/feedbacks/feedbackspost',feedbackData
        );
        console.log(response.data.success);
     

        if(response.data.success)
          {
         
            Swal.fire({
              title: 'Success!',
              text: 'Feedback submitted successfully!',
              icon: 'success',
              backdrop: false,

              confirmButtonText: 'Ok'
            })
            setFeedbackType('');
            setFeedbackMessage('');
            

          }
          else{
            alert('Error!');
          }
        
       



        
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: error,
            icon: 'error',
            backdrop: false,
            confirmButtonText: 'Ok'
          })
        }
      } else {
        Swal.fire({
          title: 'Error!',
          text: error,
          icon: 'error',
          backdrop: false,
          confirmButtonText: 'Ok'
        })
      }
    
   
  };


  return (
    
    <CoverLayout
      title="Welcome Students"
      description="Drop Your Feedbacks Here.."
      image={curved9}
    ><Sidenav
    color={sidenavColor}
    brand={brand}
    brandName="Exam Portal"
    routes={sroutes}
    onMouseEnter={handleOnMouseEnter}
    onMouseLeave={handleOnMouseLeave}
  />
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        <SoftBox component="form" onSubmit={handleFeedbackSubmit}>

          <SoftBox mb={2}>
          <SoftTypography variant="caption" fontWeight="bold">
        Feedback Type
      </SoftTypography>
      <div className="form-group">
      
   
      <select
  className="form-control"
  id="Feedback-type-select"
  value={feedbackType}
  onChange={handleChange}
>
  <option disabled default selected value=''>Select your feedback type</option>
  <option value="Exams">Exams</option>
  <option value="Results">Results</option>
  <option value="Profile">Profile</option>
  <option value="Portal">Portal</option>
</select>
  </div>
 


            
            
            <SoftTypography variant="caption" fontWeight="bold">
              Feedback Message
            </SoftTypography>
            <SoftInput
              multiline
              fullWidth
              placeholder="Enter your feedback message"
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
            />
          </SoftBox>

          <SoftBox mt={4} mb={1}>
            <SoftButton variant="contained" color="primary" fullWidth type="submit">
              Submit Feedback
            </SoftButton>
          </SoftBox>

        </SoftBox>
      </Container>
    </CoverLayout>
  );
}

export default PFeedback;
