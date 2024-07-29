
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import moment from 'moment';
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Alert, AlertTitle, Container } from "@mui/material";



function Currentexams() {

    const [activeSubjects, setActiveSubjects] = useState([]);



  useEffect(() => {
   
    const fetchActiveSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:8800/conduct/currentexams');
        console.log(response.data); // Debug: log the response data
        setActiveSubjects(response.data);
      } catch (error) {
        console.error('Error fetching active subjects:', error);
      }
    };

    fetchActiveSubjects();
  }, []);


  return (
    <>
     {activeSubjects.map((subject, index) => (
    <Card key={index}>
      <SoftBox p={2}>
        <Grid container spacing={3}>
         

            <Grid item xs={12} lg={12}>
            
              <SoftBox display="flex" flexDirection="column" height="100%">

                <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>

                  <SoftBox  >

                 

                 
                    <Alert severity="info">
                      <AlertTitle>Dear Students</AlertTitle>
                      <SoftTypography variant="body2" color="text">
                      You have an exam titled <b>{subject.examName}</b> in <b>{subject.subjectName}</b> scheduled for <b> {new Date(subject.startTime).toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })}</b> from <b>{new Date(subject.startTime).toLocaleString([], {hour: '2-digit', minute:'2-digit'})}</b> to <b>{new Date(subject.endTime).toLocaleString([], {hour: '2-digit', minute:'2-digit'})}</b>. Please ensure you attend promptly.
                      </SoftTypography>
                    


                    </Alert>
                 
                  

                  
                    <SoftTypography
                      component="a"

                      variant="body2"
                      color="text"
                      fontWeight="medium"
                      sx={{
                        mt: "auto",
                        mr: "auto",
                        display: "inline-flex",
                        alignItems: "center",
                        cursor: "pointer",

                        "& .material-icons-round": {
                          fontSize: "1.125rem",
                          transform: `translate(2px, -0.5px)`,
                          transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
                        },

                        "&:hover .material-icons-round, &:focus  .material-icons-round": {
                          transform: `translate(6px, -0.5px)`,
                        },
                      }}
                    >
            

                    </SoftTypography>
                  </SoftBox>
                  
                </SoftBox> </SoftBox>
            </Grid>

        </Grid>
      </SoftBox>


    </Card> ))}</>
  );
}

export default Currentexams;
