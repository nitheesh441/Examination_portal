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
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // for making HTTP requests
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import Swal from "sweetalert2";
import Syllabus from "documents/syllabus/Syllabus.pdf"
import { jwtDecode } from "jwt-decode";



import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { sroutes, troutes, proutes } from 'routes';
import brand from "assets/images/logo-ct.png";
import Sidenav from "examples/Sidenav";
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

function TCourses() {

  const [courses, setCourses] = useState([]);
 
  const [formData, setFormData] = useState({ courseCode: '', courseName: '', courseType: '' });
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    fetchCourses();

  }, []);
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8800/course/courseget');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };
  const getBadgeColor = (courseType) => {
    if (courseType === 'ELECTIVE') {
      return 'success';
    } else if (courseType === 'CORE') {
      return 'info';
    }
    return 'default';
  };
  const badgeStyle = {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    textAlign: 'center',
    minWidth: '60px'
  };
  function handleDownload() {
    Swal.fire({
      title: 'Download Syllabus',
      text: "Are you sure you want to download this file?",
      icon: 'warning',
      showCancelButton: true,
      backdrop: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, download it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const link = document.createElement('a');
        link.href = Syllabus; // Use the imported PDF file
        link.setAttribute('download', 'Syllabus.pdf'); // Set the download attribute
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (course) => {
    setFormData(course);
    setEditing(true);
  };

  const handleDelete = async (courseCode) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you Sure want to Delete this Course!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      backdrop: false
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post('http://localhost:8800/course/coursedelete', { courseCode });
          setCourses(courses.filter(course => course.courseCode !== courseCode));
          Swal.fire({
            title: 'Deleted!',
            text: 'Course has been deleted.',
            icon: 'success',
            backdrop: false
          });
          fetchCourses();
        } catch (error) {
          console.error('Error deleting course:', error);
          Swal.fire({
            title: 'Error',
            text: 'Failed to delete course',
            icon: 'error',
            backdrop: false
          });
        }
      }
    });
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.courseCode) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Course Code is required',
        icon: 'error',
        backdrop: false
      });
      return;
    }
    if (!formData.courseName) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Course Name is required',
        icon: 'error',
        backdrop: false
      });
      return;
    }
    if (!formData.courseType) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Course Type is required',
        icon: 'error',
        backdrop: false
      });
      return;
    }

    if (editing) {
      try {
        const response = await axios.put('http://localhost:8800/course/courseupdate', formData);
       
        
        fetchCourses();
        setCourses(courses.map(course => course.courseCode === formData.courseCode ? response.data : course));
        setEditing(false);
        Swal.fire({
          title: 'Success',
          text: 'Course updated successfully',
          icon: 'success',
          backdrop: false
        });
      } catch (error) {
        console.error('Error updating course:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to update course',
          icon: 'error',
          backdrop: false
        });
      }
    } else {
      try {

        const response = await axios.post('http://localhost:8800/course/courseadd', formData);
        fetchCourses();
        Swal.fire('Success', 'Course added successfully', 'success');
        setCourses([...courses, response.data]);
        Swal.fire({
          title: 'Success',
          text: 'Course added successfully',
          icon: 'success',
          backdrop: false
        });
      } catch (error) {
        console.error('Error creating course:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to add course',
          icon: 'error',
          backdrop: false
        });
      }
    }
    setFormData({ courseCode: '', courseName: '', courseType: '' });
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

  const resetExamData = () => {
    // setExamData({
    //   examId: '',
    //   examName: '',
    //   subjects: [{
    //     subjectName: '',
    //     courseCode: '',
    //     date: '',
    //     startTime: '',
    //     endTime: ''
    //   }]
    // });
    setEditing(false);
    
  };

  const handleCancelEdit = () => {
    resetExamData();
  };


  const columns = [

    { name: "course_code", align: "left" },
    { name: "course_name", align: "left" },
    { name: "course_type", align: "center" },
    { name: "created_at", align: "center" },
    { name: "syllabus", align: "center" },
    { name: "action", align: "center" },



  ];
  const rows = courses.map(course => ({


    course_code: (<SoftBox display="flex" alignItems="center" px={1} py={0.5} onClick={() => handleEdit(course)} style={{ cursor: 'pointer' }}>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {course.courseCode}
        </SoftTypography>
      </SoftBox>
    </SoftBox>),

    course_name: (
      <SoftTypography variant="caption" fontWeight="medium">
        {course.courseName}
      </SoftTypography>
    ),

    course_type: (
      <SoftBadge
        variant="gradient"
        badgeContent={course.courseType}
        color={getBadgeColor(course.courseType)} // Determine badge color dynamically
        size="xs"
        style={badgeStyle}
        container
      />


    ),


    syllabus: (
      <SoftTypography variant="h4" onClick={handleDownload} color="secondary">
        <Tooltip pt={3} title="Download Syllabus" placement="bottom">
          <Icon>download</Icon>
        </Tooltip>
      </SoftTypography>
    ),
    created_at: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {new Date(course.createdAt).toLocaleDateString()}
      </SoftTypography>
    ),
    action: (
      <SoftBox
        display="flex"
        alignItems="center"
        mt={{ xs: 2, sm: 0 }}
        ml={{ xs: -1.5, sm: 0 }}
      >
        <SoftBox mr={1}>
          <SoftButton onClick={() => handleDelete(course.courseCode)} variant="text" color="error">
            <Icon>delete</Icon>&nbsp;delete
          </SoftButton>
        </SoftBox>
        <SoftButton onClick={() => handleEdit(course)} variant="text" color="dark">
          <Icon>edit</Icon>&nbsp;edit
        </SoftButton>
      </SoftBox>
    
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
        routes={troutes}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h5">Courses</SoftTypography>
            </SoftBox>
            <SoftBox mb={2}>
              {/* <SoftInput name="_id" label="ID" value={courseData._id} onChange={handleChange} display="none"/> */}





            </SoftBox>
            <div className="container">
              <form onSubmit={handleFormSubmit}>

                <div className="row m-2 mb-6">
                  <div className="col-md-4">
                    <div className="form-group">
                  
                      <SoftTypography variant="caption" fontWeight="bold">
                        Course Code
                      </SoftTypography>
                      <SoftInput name="courseCode" label="Course Code" value={formData.courseCode} onChange={handleInputChange} autoComplete='off' />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <SoftTypography variant="caption" fontWeight="bold">
                        Course Name
                      </SoftTypography>
                      <SoftInput name="courseName" label="Course Name" value={formData.courseName} onChange={handleInputChange} autoComplete='off' />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <SoftTypography variant="caption" fontWeight="bold">
                      Course Type
                    </SoftTypography>
                    <select
                      className="form-control"
                      name="courseType"
                      value={formData.courseType}
                      onChange={handleInputChange}
                    >
                      <option disabled default selected value=''></option>
                      <option value="ELECTIVE">Elective</option>
                      <option value="CORE">Core</option>

                    </select>

                  </div>
                </div>

                <div className="row row m-2 mb-6">
                  <div className="col-md-6">

                  </div>
                  <div className="col-md-2"></div>
                  <div className="col-md-2 pt-4 m-6">
                  {editing && (
                    <SoftButton type="button" onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>
                      Cancel
                    </SoftButton>
                  )}
                </div>
                  <div className="col-md-2 pt-4 m-6">
                    <SoftButton type="submit">{editing ? "Update" : "Add"} Course </SoftButton>
                  </div>

                </div>
              </form></div>
             

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

      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default TCourses;
