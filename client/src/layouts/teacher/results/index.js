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
 import SoftButton from "components/SoftButton";
import { Grid } from "@mui/material";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { sroutes, troutes, proutes } from 'routes';
import brand from "assets/images/logo-ct.png";
import Sidenav from "examples/Sidenav";
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";
import SoftInput from "components/SoftInput";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf"; 

function Tresults() {
  const navigate = useNavigate()
  const [examName, setExamName] = useState([]);
  const [subject, setSubject] = useState([]);
  const [courseCode,setCourseCode]=useState([]);
  const [examNames, setExamNames] = useState([]);
  const [selectedExamName, setSelectedExamName] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourseCode, setSelectedCourseCode] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [students, setStudents] = useState([]);
  const [examResults, setExamResults] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [examNameError, setExamNameError] = useState('');
  const [courseCodeError, setCourseCodeError] = useState('');
  const [subjectError, setSubjectError] = useState('');

  

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      try {

        const decodedToken = jwtDecode(authToken);


        const { username, usertype } = decodedToken;
        const rollNo = username; 
        fetchExamNames();
        fetchResults();

        

      
      } catch (error) {
        console.log('Error decoding JWT token:', error);
      }
    } else {
      console.log('JWT token not found');
      navigate('/login');
    }
  }, []);
  const fetchExamNames = async () => {
    try {
      const response = await axios.get('http://localhost:8800/results/examname');
      console.log(response);
      setExamNames(response.data || []);
    } catch (error) {
      console.error('Error fetching exam names:', error);
    }
  };
  const handleExamNameChange = async (e) => {
    const selectedExam = e.target.value;
    setSelectedExamName(selectedExam);
    setSelectedCourseCode('');
    setSelectedSubject('');
    setExamNameError('');
    setCourseCodeError('');
    setSubjectError('');

    try {
      const response = await axios.get(`http://localhost:8800/timetable/subjects?examName=${selectedExam}`);
      setCourses(response.data.subjects || []);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }

    try {
      const response = await axios.get(`http://localhost:8800/results/examresults?examName=${selectedExam}`);
      setExamResults(response.data.results || []);
    } catch (error) {
      console.error('Error fetching exam results:', error);
    }
  };

  const handleCourseCodeChange = async (e) => {
    const selectedCode = e.target.value;
    setSelectedCourseCode(selectedCode);
    setCourseCodeError('');
    setSubjectError('');

    const selectedCourse = courses.find((course) => course.code === selectedCode);
    if (selectedCourse) {
      setSelectedSubject(selectedCourse.subject);
    } else {
      setSelectedSubject('');
    }
  };
  
  const fetchResults = async () => {
    try {
      const response = await axios.get('http://localhost:8800/results/resultstudent');
     
      setStudents(response.data);
    }  catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedStudents = [...students];
    updatedStudents[index][field] = value;
    setStudents(updatedStudents);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultData = {
      examName,
      subjects: [
        {
          subject,
          courseCode,
          students: students.map(student => ({
            rollNo: student.rollNo,
            fullName: student.fullName,
            score: student.score || 0,
            outOf: student.outOf || 100,
            isAbsent: student.isAbsent || false
          }))
        }
      ]
    };
    console.log(resultData);

    try {
      await axios.post('http://localhost:8800/results/resultspost', resultData);
      alert('Results added successfully!');
      setExamName('');
      setSubject('');
      setCourseCode('');
      setStudents([]);
    } catch (error) {
      console.log(error);
      alert('Error adding results. Please try again.');
    }
  };

    
  



  const columns = [
    { name: 'rollno', align: 'center' },
    { name: 'name', align: 'center' },
    { name: 'score', align: 'left' },
    { name: 'outof', align: 'left' },
    { name: 'attendance', align: 'center' },
   


    
  ];
  const rows =students.map((student,index) => ({

    rollno: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
       {student.rollNo}
      </SoftTypography>
    ),
    name: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {student.fullName}
      </SoftTypography>
    ),
    score: (
      <SoftInput
      type="number"
      value={student.score}
      onChange={(e) => handleInputChange(index, 'score', parseInt(e.target.value))}
    />
    ),
    outof: (
      <SoftInput
      type="number"
      value={student.outOf}
      onChange={(e) => handleInputChange(index, 'outOf', parseInt(e.target.value))}
    />
    ),
  
    
    attendance: (
      <select
        value={student.isAbsent}
        onChange={(e) => handleInputChange(index, 'isAbsent', e.target.value === 'true')}
      >
        <option value="false">Present</option>
        <option value="true">Absent</option>
      </select>
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
    // const getBadgeColor = (isAbsent) => {
    //   if (isAbsent === false) {
    //     return 'success'; 
    //   } else if (isAbsent === true) {
    //     return 'error';
    //   }
    //   return 'info'; 
    // };
    // const getBadgecontent = (isAbsent) => {
    //   if (isAbsent === false) {
    //     return 'Present'; 
    //   } else if (isAbsent === true) {
    //     return 'Absent';
    //   }
    //   return 'default'; 
    // };


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
           <Grid item xs={12} lg={12}>
            <SoftBox py={3}>
              
    <Card>
    <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h3">Add Results</SoftTypography>
             
           
            
            </SoftBox>
            <SoftBox>
    <div className="container">
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="examName">Exam Name:</label>
        <input type="text" id="examName" value={examName} onChange={(e) => setExamName(e.target.value)} required />
        <br />
        <label htmlFor="subject">Subject:</label>
        <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        <br />
        <label htmlFor="courseCode">Course Code:</label>
        <input type="text" id="courseCode" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} required />
        <br />
        {students.map((student, index) => (
          <div key={index}>.
            <label htmlFor={`score-${index}`}>Score for {student.fullName}:</label>
            <input type="number" id={`score-${index}`} value={student.score || ''} onChange={(e) => handleInputChange(index, 'score', parseInt(e.target.value))} />
            <label htmlFor={`outOf-${index}`}>Out of:</label>
            <input type="number" id={`outOf-${index}`} value={student.outOf || 100} onChange={(e) => handleInputChange(index, 'outOf', parseInt(e.target.value))} />
            <label htmlFor={`attendance-${index}`}>Attendance:</label>
            <select id={`attendance-${index}`} value={student.isAbsent || false} onChange={(e) => handleInputChange(index, 'isAbsent', e.target.value === 'true')}>
              <option value="false">Present</option>
              <option value="true">Absent</option>
            </select>
            <br />
          </div>
        ))}
        <br />
        <button type="submit">Add Results</button>
      </form>
    </div></SoftBox>
          </Card></SoftBox></Grid>
         

      <Footer />
    
    </DashboardLayout>
  );
}

export default Tresults;
