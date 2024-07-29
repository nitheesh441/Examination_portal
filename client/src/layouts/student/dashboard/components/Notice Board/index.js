
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import moment from 'moment';
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";




function Announcement() {

  const [notices, setNotices] = useState([]);



  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('http://localhost:8800/dash/dashboardget');
        if (response.data.success) {
          setNotices(response.data.notice);
          console.log
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);


  return (
    <Card>
      <SoftBox p={2}>
        <Grid container spacing={3}>
          {notices.map((notice) => (

            <Grid key={notice._id} item xs={12} lg={12}>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
                <SoftTypography variant="h2" fontWeight="bold" gutterBottom>
                  Notice Board
                </SoftTypography>

              </SoftBox>
              <SoftBox display="flex" flexDirection="column" height="100%">

                <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>

                  <SoftBox  >

                    <SoftBox mb={6}>

                      <SoftTypography variant="body2" color="text">
                        {notice.message}





                      </SoftTypography>
                      <SoftTypography variant="caption">

                      </SoftTypography>


                    </SoftBox>
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
                      {moment(notice.createdAt).format('MMMM Do YYYY')}

                    </SoftTypography>
                  </SoftBox>
                  
                </SoftBox> </SoftBox>
            </Grid>))}

        </Grid>
      </SoftBox>


    </Card>
  );
}

export default Announcement;
