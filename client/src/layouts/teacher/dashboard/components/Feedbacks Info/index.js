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
import Icon from "@mui/material/Icon";
import Table from "examples/Tables/Table";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import Tooltip from "@mui/material/Tooltip";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Images
import bg2 from "assets/images/bg2.jpg";

function FeedbackInfo() {
  const [feedbacks, setfeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch courses from backend
    axios.get('http://localhost:8800/feedbacks/feedbacksget') // Adjust the endpoint URL as necessary
      .then(response => {
        setfeedbacks(response.data);
       
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
        
      });
  }, []);
  const getBadgeColor = (courseType) => {
    if (courseType === 'Elective') {
      return 'success'; 
    } else if (courseType === 'Core') {
      return 'info';
    }
    return 'default'; 
  };




  
    const columns = [
     
      { name: "user", align: "left" },
      { name: "id", align: "left" },
      { name: "feedbacktype", align: "center" },
      { name: "date", align: "center" },
      { name: "message", align: "center" },
     
     
    ];
    const rows = feedbacks.map(feedback => ({

     
        user: (<SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      
        <SoftBox display="flex" flexDirection="column">
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {feedback.userType}
        </SoftTypography>
         
        </SoftBox>
      </SoftBox>),
       
       id: (
        <SoftTypography variant="caption" fontWeight="medium">
        {feedback.username}
      </SoftTypography> 
        ),
       
        feedbacktype: (
          <SoftTypography variant="caption" fontWeight="medium">
        {feedback.feedbackType}
      </SoftTypography> 
        ),
   

        message: (
          <SoftTypography variant="caption" fontWeight="medium">
        {feedback.message}
      </SoftTypography> 
        ),
        date: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
           {new Date(feedback.date).toLocaleDateString()}
          </SoftTypography>
        ),
      
  
      }));



  return (
    <Card>
    <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
      <SoftTypography variant="h5">Feedbacks</SoftTypography>
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
  );
}

export default FeedbackInfo;
