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
import Tooltip from "@mui/material/Tooltip";
import Table from "examples/Tables/Table";
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
import Swal from "sweetalert2";
// Data

import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { sroutes, troutes, proutes } from "routes";
import brand from "assets/images/logo-ct.png";
import Sidenav from "examples/Sidenav";
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

function Conduct() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  // const [activeSubjects, setActiveSubjects] = useState([]);
  // const [selectedSubject, setSelectedSubject] = useState(null);
  // const [meetURL, setMeetURL] = useState('');
  // const [questionPaper, setQuestionPaper] = useState('');
  // const [pin, setPin] = useState('');
  const [meetURL, setMeetURL] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const [pin, setPin] = useState("");
  const [activeExams, setActiveExams] = useState([]);
  const [activeSubjects, setActiveSubjects] = useState([]);

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
    // Fetch active subjects
    fetchexam();
  }, []);
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
          const response = await axios.post("http://localhost:8800/conduct/attendurl", activeSub);
          setActiveExams(response.data);
           const { meetURL, pin } = response.data;
           console.log('Meet URL:', meetURL);
    console.log('PIN:', pin);
    
     
          // const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
          // setPdfFile(pdfBlob);
          // console.log("examRes", examResponse)
          // setPdfFile(examResponse.data); // Assuming examResponse.data is the PDF file bytes

          // console.log(pdfUrl, "pdfUrl")
          // setPdfFile(pdfUrl);
        }
      } catch (error) {
        console.error("Error fetching exam details:", error);
       
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


  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (activeSubjects.length === 0) {
  //     alert('No active subjects to conduct an exam for.');
  //     return;
  //   }

  //   const subjects = activeSubjects.map(subject => ({
  //     subjectName: subject.subjectName,
  //     courseCode: subject.courseCode,
  //     meetURL,
  //     questionPaper,
  //     pin
  //   }));

  //   try {
  //     const conductData = {
  //       examName: activeSubjects[0].examName, // Assuming there's only one active exam
  //       subjects
  //     };

  //     const response = await axios.post('http://localhost:8800/conduct/conductexam', conductData);

  //     if (response.status === 201) {
  //       alert('Exam conducted successfully!');
  //       setMeetURL('');
  //       setQuestionPaper('');
  //       setPin('');
  //     } else {
  //       throw new Error('Failed to conduct exam');
  //     }
  //   } catch (error) {
  //     console.error('Failed to conduct exam:', error);
  //     alert('Failed to conduct exam');
  //   }
  // };
  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (activeSubjects.length === 0) {
      alert("No active subjects to conduct an exam for.");
      return;
    }

    const formData = new FormData();
    formData.append("examName", activeSubjects[0].examName,);
    formData.append("meetURL", meetURL);
    formData.append("pdfFile", pdfFile);
    formData.append("pin", pin);

    activeSubjects.forEach((subject, index) => {
      formData.append(`subjects[${index}][subjectName]`, subject.subjectName);
      formData.append(`subjects[${index}][courseCode]`, subject.courseCode);
    });

    try {
      const response = await axios.post("http://localhost:8800/conduct/conductexam", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
       
        Swal.fire({
          title: 'Success',
          text: "Exam conducted successfully!",
          icon: 'success',
          backdrop: false
        });
        setMeetURL("");
        setPdfFile(null);
        setPin("");
      } else {
        throw new Error("Failed to conduct exam");
      }
    } catch (error) {
      console.error("Failed to conduct exam:", error);
      alert("Failed to conduct exam");
    }
  };

  const columns = [
    { name: "rollno", align: "left" },
    { name: "answerscript", align: "left" },
    { name: "submittedat", align: "center" },
    { name: "download", align: "center" },
  ];
  const rows = [
    {
      rollno: (
        <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
          <SoftBox display="flex" flexDirection="column">
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              23MCA039
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      ),

      answerscript: (
        <SoftTypography variant="caption" fontWeight="medium">
          23MCA039.pdf
        </SoftTypography>
      ),

      submittedat: (
        <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
          <SoftBox display="flex" flexDirection="column">
            29/04/2024
          </SoftBox>
        </SoftBox>
      ),

      download: (
        <SoftTypography variant="h4" color="secondary">
          <Tooltip pt={3} title="Download Syllabus" placement="bottom">
            <Icon>download</Icon>
          </Tooltip>
        </SoftTypography>
      ),
    },
  ];

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
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h5">Invigilate the Exam</SoftTypography>
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
                            Before Enter the Details,Please go to{" "}
                            <a href="https://meet.google.com/">Gmeet</a> or{" "}
                            <a href="https://meet.google.com/">Teams</a> and create a meet where u
                            gonna have students to Appear
                          </SoftTypography>
                        </Alert>
                      </Container>
                    ) 
                    )}</>
                     

                  
                )
              }
              {activeExams.meetURL ? (
               <Container>
                <br></br>
               <Alert severity="success">
                 <AlertTitle>Meeturl and Question papers are uploaded already</AlertTitle>

               </Alert>
             </Container>
                
               ):(
                <form onSubmit={handleSubmit}>
                <SoftBox display="flex" p={2} alignItems="center">
                  <SoftBox flexGrow={1} mr={2}>
                    <SoftTypography
                      variant="button"
                      fontWeight="bold"
                      textTransform="capitalize"
                    >
                      Meet URL: &nbsp;
                    </SoftTypography>
                    <SoftInput
                      type="text"
                      value={meetURL}
                      onChange={(e) => setMeetURL(e.target.value)}
                      required
                    />
                  </SoftBox>

                  <SoftBox flexGrow={1} mx={2}>
                    <SoftTypography
                      variant="button"
                      fontWeight="bold"
                      textTransform="capitalize"
                    >
                      Question Paper: &nbsp;
                    </SoftTypography>
                    <SoftInput
                      type="file"
                      onChange={handlePdfChange}
                      accept="application/pdf"
                      required
                    />
                  </SoftBox>

                  <SoftBox flexGrow={1} ml={2}>
                    <SoftTypography
                      variant="button"
                      fontWeight="bold"
                      textTransform="capitalize"
                    >
                      Enter Pin : &nbsp;
                    </SoftTypography>
                    <SoftInput
                      type="number"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      required
                    />
                  </SoftBox>
                </SoftBox>
                <SoftBox display="flex" p={2} justifyContent="center">
                  <SoftBox mb={0} pl={2}>
                    <SoftBox py={1} pr={2}>
                      <SoftButton type="submit" color="info">
                        Conduct Exam{" "}
                      </SoftButton>
                    </SoftBox>
                  </SoftBox>
                </SoftBox>
              </form>
                )

              }
                  </div>
               
               
              
            </SoftBox>
          </Card>
        </SoftBox>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h5">Answer Scripts</SoftTypography>
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
      <Footer />
    </DashboardLayout>
  );
}

export default Conduct;
