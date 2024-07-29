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
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Alert, AlertTitle, Container } from "@mui/material";
// import { Document, Page } from 'react-pdf';
import { Document, Page } from 'react-pdf';



// Manually import PDF worker

// Data
import PropTypes from "prop-types";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { sroutes, troutes, proutes } from "routes";
import brand from "assets/images/logo-ct.png";
import Sidenav from "examples/Sidenav";
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";
import FullScreenPdfViewer from "./addques";


const Quespaper  = ({ pdfFile }) => {
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
  const [meetURL, setMeetURL] = useState("");
 
  const [pin, setPin] = useState("");
  const [activeSubjects, setActiveSubjects] = useState([]);

  // Open sidenav when mouse enter on mini sidenav
  

  // Close sidenav when mouse leave mini sidenav
  

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
          
          setPdfFile(response.data);
        
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
    fetchexam();
  }, []);

 


    return (
      <div style={{ width: '100%', height: '1000px' }}>
        <iframe
          src={pdfFile ? URL.createObjectURL(pdfFile) : ''}
          title="PDF Viewer"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    );
};
Quespaper.propTypes = {
    pdfFile: PropTypes.object, // Validate pdfFile prop as an object
  };
  

  

export default Quespaper;
