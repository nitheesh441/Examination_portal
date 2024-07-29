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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import moment from 'moment';
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from 'components/SoftInput';
import SoftButton from 'components/SoftButton';
import Swal from 'sweetalert2';
import {Modal, TextareaAutosize } from '@mui/material';
// Images


function Announcement() {

   const [notices, setNotices] = useState([]);
   const [open, setOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [message, setMessage] = useState('');
  
   

  useEffect(() => {


    fetchAnnouncements();
  }, []);
  const handleOpen = (notice) => {
    setSelectedNotice(notice);
    setMessage(notice.message);
    setOpen(true);
  };
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

  const handleClose = () => {
    setOpen(false);
    setSelectedNotice(null);
    setMessage('');
  };

  const handleSave = async () => {
    if (message) {
      try {
        const response = await axios.post('http://localhost:8800/dash/dashboardpost', { message });
        if (response.status === 200) {

          Swal.fire({
            title: 'Saved!',
            text: 'Message Saved Successfully.',
            icon: 'success',
            backdrop: false
          });
          fetchAnnouncements();
          handleClose();
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Error Message Saving.',
            icon: 'error',
            backdrop: false
          });
        }
      } catch (error) {
        Swal.fire('Error:', error.message);
      }
    }
  };
  



 
  return (
    <Card sx={{ height: "100%" }} >
      <Modal open={open} onClose={handleClose}>
        <Card
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            bgcolor: 'background.paper',
            
            boxShadow: 24,
            p: 4,
          }}
          py={3}

        >
          
          <SoftTypography variant="h6" component="h2">
           Edit Notice Board 
          </SoftTypography>
          <SoftBox
                sx={{
                  border: '1px solid rgba(0, 0, 0, 0.23)',
                  borderRadius: '4px',
                  padding: '10px',
                  '&:hover': {
                    borderColor: 'rgba(0, 0, 0, 0.87)',
                  },
                  '& .Mui-focused': {
                    borderColor: '#3f51b5', // Blue focus border color
                  },

                }}
                mt={2}
              >
                <TextareaAutosize
                  aria-label="message"
                  minRows={10}
                  placeholder="Type your message here..."
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    resize: 'none', // Disable manual resizing
                  }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </SoftBox>
          <SoftBox mt={2} display="flex" justifyContent="flex-end">
            <SoftButton onClick={handleSave} variant="contained" color="primary" sx={{ mr: 2 }}>
              Save
            </SoftButton>
            <SoftButton onClick={handleClose} variant="outlined" color="secondary">
              Cancel
            </SoftButton>
          </SoftBox>
        </Card>
      </Modal>
   <SoftBox p={2}>
        <Grid container spacing={3}>
        {notices.map((notice) => (

          <Grid key={notice._id} item xs={12} lg={12}>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
            <SoftTypography variant="h2" fontWeight="bold" gutterBottom>
                  Notice Board
                </SoftTypography>
              <SoftTypography variant="h4" color="secondary">
                <Tooltip title="Edit Notice Board"onClick={() => handleOpen(notice)} placement="top">
                  <Icon>edit</Icon>
                </Tooltip>
              </SoftTypography>
            </SoftBox>
            <SoftBox display="flex" flexDirection="column" height="100%">

              <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
              
                <SoftBox  >

                <SoftBox  mb={6}>
                
                  <SoftTypography  variant="body2" color="text">
 {notice.message}
                  

        
         
    
                  </SoftTypography>
                  <SoftTypography variant="caption">
           
            </SoftTypography>
     
                    
                </SoftBox>
                       <SoftTypography
                       justifyContent=""
                     
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
            {/* 
              {notices.map((notice) => (
         
              <SoftBox  key={notice._id} mb={6}>
                <SoftTypography variant="body2" color="text">
                {notice.annoncement}
                </SoftTypography>
              </SoftBox>
               ))}
              <SoftTypography
                component="a"
               
                variant="button"
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
          </Grid>

        </Grid>
      </SoftBox> */}

    </Card>
  );
}

export default Announcement;
