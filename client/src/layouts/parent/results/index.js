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
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import SoftBadge from "components/SoftBadge";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import SoftProgress from "components/SoftProgress";



import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { sroutes, troutes, proutes } from 'routes';
import brand from "assets/images/logo-ct.png";
import Sidenav from "examples/Sidenav";
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function PResults() {
  const navigate = useNavigate()

  const [resultData, setresultData] = useState([]);
  const [examName, setExamName] = useState('');
  const [rollNo, setrollno] = useState('');
  const resultRef = useRef(null);



  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      try {

        const decodedToken = jwtDecode(authToken);


        const { username, usertype } = decodedToken;
        const rollNo = username;


        const fetchResults = async () => {
          try {
            const response = await axios.post('http://localhost:8800/results/resultsget', { rollNo });

            const flattenedData = flattenResults(response.data);
            // Flatten the data

            console.log("hi.......", flattenedData);
            setresultData(flattenedData);


            const { examName } = response.data[0];


            setExamName(examName);
            setrollno(rollNo);
          } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
              alert(error.response.data.message);
            } else {
              alert(error);
            }
          }
        };

        fetchResults();
      } catch (error) {
        console.log('Error decoding JWT token:', error);
      }
    } else {
      console.log('JWT token not found');
      navigate('/login');
    }
  }, []);


  const flattenResults = (data) => {
    return data.flatMap(exam => {
      return exam.subjects.map(subject => ({
        examName: exam.examName,
        rollNo: subject.student.rollNo,
        fullName: subject.student.fullName,
        subject: subject.subject,
        courseCode: subject.courseCode,
        score: subject.student.score,
        outOf: subject.student.outOf,
        gradePoint: subject.student.gradePoint,
        grade: subject.student.grade,
        isAbsent: subject.student.isAbsent,
      }));
    });
  };

  const progresscolor = (gradePoint) => {
    if (gradePoint >= 8.5) {
      return 'success';
    } else if (gradePoint >= 7) {
      return 'primary';
    } else if (gradePoint >= 5) {
      return 'warning';
    }

    else {
      return 'error';
    }
  };
  const getBadgeColor = (isAbsent) => {
    if (isAbsent === false) {
      return 'success';
    } else if (isAbsent === true) {
      return 'error';
    }
    return 'info';
  };
  const getBadgecontent = (isAbsent) => {
    if (isAbsent === false) {
      return 'Present';
    } else if (isAbsent === true) {
      return 'Absent';
    }
    return 'default';
  };
  function printResult() {
    const input = document.getElementById("result-to-print");
    if (input) {
      const pdf = new jsPDF();
      pdf.html(input, {
        callback: () => {
          pdf.save("result.pdf");
        },
        x: 10,
        y: 10,
        html2canvas: {
          scale: 0.165, // Adjust the scale as needed for proper layout
          useCORS: true,
        },
      });
    } else {
      console.error("Element not found.");
    }
  }

  const columns = [
    { name: 'coursecode', align: 'center' },
    { name: 'subject', align: 'center' },
    { name: 'score', align: 'center' },
    { name: 'gradePoint', align: 'center' },
    { name: 'grade', align: 'center' },

    { name: 'attendance', align: 'center' }



  ];
  const rows = resultData.map(result => ({

    coursecode: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {result.courseCode}
      </SoftTypography>
    ),
    subject: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {result.subject}
      </SoftTypography>
    ),
    score: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {`${result.score}/${result.outOf}`}
      </SoftTypography>
    ),
    gradePoint: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {result.gradePoint}
      </SoftTypography>
    ),
    grade: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {result.grade}
      </SoftTypography>
    ),

    attendance: (
      <SoftBadge
        variant="gradient"
        badgeContent={getBadgecontent(result.isAbsent)}
        color={getBadgeColor(result.isAbsent)} // Determine badge color dynamically
        size="xs"

        container
      />
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

      {resultData.map(result => (
        <SoftBox py={3} key={result._id}>
          <SoftBox mb={3}>
            <Card sx={{ height: "100%" }} mb={6} id="result-to-print">

              <SoftBox p={2}>
                <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
                  <SoftBox>
                    <SoftTypography variant="button" fontWeight="bold" textTransform="capitalize">
                      Rollno: &nbsp;
                    </SoftTypography>
                    <SoftTypography variant="button" fontWeight="regular" color="text">
                      &nbsp;{result.rollNo}
                    </SoftTypography></SoftBox>
                  <SoftTypography variant="h4" color="secondary">
                    <Tooltip title="Edit Notice Board" onClick={printResult} placement="top">
                      <Icon>download</Icon>
                    </Tooltip>
                  </SoftTypography>
                </SoftBox>
                <SoftBox mb={0} pl={2} >
                  <SoftBox display="flex" py={1} pr={2}>
                    <SoftTypography variant="button" fontWeight="bold" textTransform="capitalize">
                      Name: &nbsp;
                    </SoftTypography>
                    <SoftTypography variant="button" fontWeight="regular" color="text">
                      &nbsp;{result.fullName}
                    </SoftTypography>
                  </SoftBox>
                </SoftBox>

                <SoftBox mb={0} pl={2} >
                  <SoftBox display="flex" py={1} pr={2}>
                    <SoftTypography variant="button" fontWeight="bold" textTransform="capitalize">
                      Exam : &nbsp;
                    </SoftTypography>
                    <SoftTypography variant="button" fontWeight="regular" color="text">
                      &nbsp;{result.examName}
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
                <Table columns={columns} rows={rows} />
              </SoftBox>
            </Card>
          </SoftBox>


        </SoftBox>))}
      <Footer />

    </DashboardLayout>
  );
}

export default PResults;
