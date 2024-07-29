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
import Swal from "sweetalert2";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Alert, AlertTitle, Container } from "@mui/material";
// import { Document, Page } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import Quespaper from "./addques";
import { jwtDecode } from "jwt-decode";

// Manually import PDF worker

// Data

import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { sroutes, troutes, proutes } from "routes";
import brand from "assets/images/logo-ct.png";
import Sidenav from "examples/Sidenav";
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";
import autocomplete from "assets/theme/components/form/autocomplete";

function Studattend() {
  const [pdfUrl, setPdfUrl] = useState("/path/to/your/question-paper.pdf");

  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  // const [activeSubjects, setActiveSubjects] = useState([]);
  // const [selectedSubject, setSelectedSubject] = useState(null);
  // const [meetURL, setMeetURL] = useState('');
  // const [questionPaper, setQuestionPaper] = useState('');
  // const [pin, setPin] = useState('');
  const [setloading, setLoading] = useState("");
  const [studentId, setStudentId] = useState("");
  const [meetURL, setMeetURL] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [pin, setPin] = useState("");
  const [activeSubjects, setActiveSubjects] = useState([]);
  const [activeExams, setActiveExams] = useState([]);
  const [pinVerified, setPinVerified] = useState(false);
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

  const fetchexam = async () => {
    const fetchActiveSubjects = async () => {
      try {
        const response = await axios.get("http://localhost:8800/conduct/currentexams");
        // console.log(response.data); // Debug: log the response data
        return response.data;
      } catch (error) {
        console.error("Error fetching active subjects:", error);
      }
    };

    const fetchExamDetails = async (activeSubjects) => {
      try {
        console.log("called from here", activeSubjects);
        if (activeSubjects.length > 0) {
          // const response = await axios.post("http://localhost:8800/conduct/attend", activeSub);
          const response = await axios.post("http://localhost:8800/conduct/attend", activeSub, {
            responseType: 'blob'
          });
          const responseurl = await axios.post("http://localhost:8800/conduct/attendurl", activeSub);
          setActiveExams(responseurl.data);
           const { meetURL, pin } = responseurl.data;
           console.log('Meet URL:', meetURL);
    console.log('PIN:', pin);

          setPdfFile(response.data);
          // const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
          // setPdfFile(pdfBlob);
          // console.log("examRes", examResponse)
          // setPdfFile(examResponse.data); // Assuming examResponse.data is the PDF file bytes

          // console.log(pdfUrl, "pdfUrl")
          // setPdfFile(pdfUrl);
        }
      } catch (error) {
        console.error("Error fetching exam details:", error);
        setLoading(false);
      }
    };

    const activeSub = await fetchActiveSubjects();
    if (activeSub) {
      setActiveSubjects(activeSub);
      console.log("activeSub", activeSub);
      await fetchExamDetails(activeSub);
    } else {
      alert("something went wrong");
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      try {

        const decodedToken = jwtDecode(authToken);


        const { rollNo, usertype } = decodedToken;
        
setStudentId(rollNo);
        
         
       

     
       

        
      } catch (error) {
       
        console.error('Error decoding JWT token:', error);
      }
    } else {
      navigate('/login');
      console.error('JWT token not found');
    }
    fetchexam();
  }, []);

  const handleOpenMeetURL = () => {
    if (activeExams.meetURL) {
      window.open(activeExams.meetURL, '_blank');
    }
  };
  const handleViewQuestion = () => {
    Swal.fire({
    title: 'Enter PIN',
    input: 'number',
    inputAttributes: {
    autocapitalize: 'off',
    autocomplete:'off'

    },
    showCancelButton: true,
    confirmButtonText: 'Submit',
    backdrop:false,
    showLoaderOnConfirm: true,
    
    preConfirm: (pin) => {
    if (pin === activeExams.pin) {
    setPinVerified(true);
    } else {
    Swal.fire({
    icon: 'error',
    title: 'Invalid PIN',
    text: 'The PIN you entered is incorrect. Please try again.'
    });
    }
    },
    allowOutsideClick: () => !Swal.isLoading()
    });
    };
    const handlePdfChange = (e) => {
      setPdfFile(e.target.files[0]);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!pdfFile) {
        Swal.fire({
          title: 'error',
          text: "Add Valid File!",
          icon: 'success',
          backdrop: false
        });
        return;
      }
      if (activeSubjects.length === 0) {
        alert("No active subjects to conduct an exam for.");
        return;
      }
    
      const formData = new FormData();
      console.log(activeSubjects[0].examName);
  console.log(studentId);
  console.log(pdfFile.name);
  
      formData.append("examName", activeSubjects[0].examName);
      formData.append("studentId", studentId);
      formData.append("answerScript", pdfFile.name); // Assuming pdfFile is the file object
    
      activeSubjects.forEach((subject, index) => {
        formData.append(`subjects[${index}][subjectName]`, subject.subjectName);
        formData.append(`subjects[${index}][courseCode]`, subject.courseCode);
       
      });
    
      try {
        const response = await axios.post("http://localhost:8800/conduct/submit", formData);
    
        if (response.status === 201) {
          alert("Exam conducted successfully!");
          setMeetURL("");
          setPdfFile(null);
          setPin("");
        } else {
          throw new Error("Failed to conduct exam");
        }
      } catch (error) {
        console.error("Failed to conduct exam:", error);
        Swal.fire({
          title: 'Success',
          text: "Submitted Successfully!",
          icon: 'success',
          backdrop: false
        });
      }
    };
    
  
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Sidenav
        color={sidenavColor}
        brand={brand}
        brandName="Exam Portal"
        routes={sroutes}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />

      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h5">Attend Exam</SoftTypography>
            </SoftBox>
            <SoftBox justifyContent="space-between" alignItems="center" p={3}>
              <div>
                {activeSubjects.length === 0 ? (
                  <Container>
                    <Alert severity="info">
                      <AlertTitle>No Exams at this Time</AlertTitle>
                      <SoftTypography variant="body2" color="text">
                        There is currently no exams scheduled.Please Check back later for updates
                      </SoftTypography>
                    </Alert>
                  </Container>
                ) : (
                  <>
                    {activeSubjects.map((subject, index) => (
                      <Container key={index}>
                        <Alert mb={5} severity="success">
                          <AlertTitle>Current Exam Details</AlertTitle>
                          <SoftBox p={2}>
                            <SoftBox mb={0} pl={2}>
                              <SoftBox display="flex" py={1} pr={2}>
                                <SoftTypography
                                  variant="button"
                                  fontWeight="bold"
                                  textTransform="capitalize"
                                >
                                  Exam Name: &nbsp;
                                </SoftTypography>
                                <SoftTypography variant="button" fontWeight="regular" color="text">
                                  &nbsp;{subject.examName}
                                </SoftTypography>
                              </SoftBox>
                            </SoftBox>
                            <SoftBox mb={0} pl={2}>
                              <SoftBox display="flex" py={1} pr={2}>
                                <SoftTypography
                                  variant="button"
                                  fontWeight="bold"
                                  textTransform="capitalize"
                                >
                                  Subject: &nbsp;
                                </SoftTypography>
                                <SoftTypography variant="button" fontWeight="regular" color="text">
                                  &nbsp;{subject.subjectName}
                                </SoftTypography>
                              </SoftBox>
                            </SoftBox>

                            <SoftBox mb={0} pl={2}>
                              <SoftBox display="flex" py={1} pr={2}>
                                <SoftTypography
                                  variant="button"
                                  fontWeight="bold"
                                  textTransform="capitalize"
                                >
                                  Course code : &nbsp;
                                </SoftTypography>
                                <SoftTypography variant="button" fontWeight="regular" color="text">
                                  &nbsp;{subject.courseCode}
                                </SoftTypography>
                              </SoftBox>
                            </SoftBox>

                            <SoftBox mb={0} pl={2}>
                              <SoftBox display="flex" py={1} pr={2}>
                                <SoftTypography
                                  variant="button"
                                  fontWeight="bold"
                                  textTransform="capitalize"
                                >
                                  Start Time : &nbsp;
                                </SoftTypography>
                                <SoftTypography variant="button" fontWeight="regular" color="text">
                                  &nbsp;{new Date(subject.startTime).toLocaleString()}
                                </SoftTypography>
                              </SoftBox>
                            </SoftBox>

                            <SoftBox mb={0} pl={2}>
                              <SoftBox display="flex" py={1} pr={2}>
                                <SoftTypography
                                  variant="button"
                                  fontWeight="bold"
                                  textTransform="capitalize"
                                >
                                  End Time : &nbsp;
                                </SoftTypography>
                                <SoftTypography variant="button" fontWeight="regular" color="text">
                                  &nbsp;{new Date(subject.endTime).toLocaleString()}
                                </SoftTypography>
                              </SoftBox>
                            </SoftBox>
                          </SoftBox>
                        </Alert>
                        <br></br>
                        <Alert severity="info">
                          <AlertTitle>Instruction</AlertTitle>
                          <SoftTypography variant="body2" color="text">
                            First, Join the meet and make your attendance and then open the question
                            paper
                          </SoftTypography>
                        </Alert>
                      </Container>
                    ))}

                    <SoftBox display="flex" p={2} justifyContent="center">

                      <SoftBox mb={0} pl={2}>
                        <SoftBox py={1} pr={2}>
                          <SoftButton type="submit" color="info" onClick={handleOpenMeetURL}>
                            Join Exam
                          </SoftButton>
                        </SoftBox>
                      </SoftBox>
                      <SoftBox mb={0} pl={2}>
                        <SoftBox py={1} pr={2}>
                          <SoftButton type="submit" color="info" onClick={handleViewQuestion}>
                            View Question
                          </SoftButton>
                        </SoftBox>
                      </SoftBox>
                 
                      
                    </SoftBox>
                    {pinVerified && pdfFile && <Quespaper pdfFile={pdfFile} />}
                    <SoftBox display="flex" p={2} justifyContent="center">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
              <SoftBox mb={0} pl={2}>
                <SoftBox py={1} pr={2}>
                  <SoftTypography
                    variant="button"
                    fontWeight="bold"
                    textTransform="capitalize"
                  >
                    Answer script: &nbsp;
                  </SoftTypography>
                  <SoftInput
                    type="file"
                    onChange={handlePdfChange}
                    accept="application/pdf"
                    required
                  />
                </SoftBox>
              </SoftBox>
              <SoftBox mb={0} pl={2}>
                <SoftBox py={1} pr={2}>
                  <SoftButton type="submit" color="info">
                    Submit
                  </SoftButton>
                </SoftBox>
              </SoftBox>
            </form>
                    </SoftBox>

                  
                  </>
                )}
              </div>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
 
     
    </DashboardLayout>
    
  );
}

export default Studattend;
