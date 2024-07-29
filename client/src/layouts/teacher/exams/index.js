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
import { Grid } from "@mui/material";
import Icon from "@mui/material/Icon";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import SoftInput from "components/SoftInput";
// Data
import Swal from "sweetalert2";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import { useState, useEffect, useMemo } from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { sroutes, troutes, proutes } from 'routes';
import brand from "assets/images/logo-ct.png";
import Sidenav from "examples/Sidenav";
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";
import { useNavigate } from "react-router-dom";
function TExtable() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [courseCodes, setCourseCodes] = useState([]);
  const [examData, setExamData] = useState({
    examId: '', // Add examId field
    examName: '',
    subjects: [{
      subjectName: '',
      courseCode: '',
      date: '',
      startTime: '',
      endTime: ''
    }]
  });

  const [editingExam, setEditingExam] = useState(null);
  const [editingSubject, setEditingSubject] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      try {
        // Decode the JWT token
        const decodedToken = jwtDecode(authToken);
        // Extract username and usertype from the decoded token
        const { username, usertype } = decodedToken;
        console.log('Username:', username);
        console.log('Usertype:', usertype);
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    } else {
      console.error('JWT token not found');
      navigate('/login');
    }

    fetchExams();
    fetchcourseCode();
  }, []);

  const fetchExams = () => {
    axios.get('http://localhost:8800/exam/examsgetfac')
      .then(response => {
        setExams(response.data);
        console.log("Fetch");
      })
      .catch(error => {
        console.error('Error fetching exams:', error);
      });
  };
  const fetchcourseCode = async () => {
    try {
      const response = await axios.get('http://localhost:8800/course/coursecode');
      setCourseCodes(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleInputChange = (e, index, field) => {
    const value = e.target.value;
    setExamData(prevData => {
      const newSubjects = [...prevData.subjects];
      newSubjects[index][field] = value;
      return { ...prevData, subjects: newSubjects };
    });
  };
  const handleCourseCodeChange = (e, index) => {
    const courseCode = e.target.value;
    setExamData(prevData => {
      const newSubjects = [...prevData.subjects];
      newSubjects[index]['courseCode'] = courseCode;
      return { ...prevData, subjects: newSubjects };
    });
    axios.post(`http://localhost:8800/course/subject`, { courseCode })
      .then(response => {
        setExamData(prevData => {
          const newSubjects = [...prevData.subjects];
          newSubjects[index]['subjectName'] = response.data.courseName;
          return { ...prevData, subjects: newSubjects };
        });
      })
      .catch(error => {
        console.error('Error fetching subject name:', error);
      });
  }

  const handleExamChange = e => {
    const { name, value } = e.target;
    setExamData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleAddExam = (e) => {
    e.preventDefault();

    if (editingExam) {
      const { _id: examId } = editingExam;
      const { _id: subjectId } = editingSubject;
      const updatedSubjectData = {
        examId,
        subjectId,
        updatedSubject: examData.subjects[0]
      };

      axios.put(`http://localhost:8800/exam/examsubupdate`, updatedSubjectData)
        .then(response => {
          fetchExams();
          setExamData({ examId: '', examName: '', subjects: [{ subjectName: '', courseCode: '', date: '', startTime: '', endTime: '' }] });
          setEditingExam(null);
          Swal.fire({
            title: 'Success',
            text: 'Subject Added successfully',
            icon: 'success',
            backdrop: false
          });
        })
        .catch(error => {
          console.error('Error updating exam:', error);
          Swal.fire({
            title: 'Error',
            text: 'Failed to update exam',
            icon: 'error',
            backdrop: false
          });
        });
    } else {

      axios.post('http://localhost:8800/exam/examspost', examData)
        .then(response => {

          fetchExams();
          setExamData({ examId: '', examName: '', subjects: [{ subjectName: '', courseCode: '', date: '', startTime: '', endTime: '' }] });
          Swal.fire({
            title: 'Success',
            text: 'Exam Added successfully',
            icon: 'success',
            backdrop: false
          });

        })
        .catch(error => {
          console.error('Error adding exam:', error);
          Swal.fire({
            title: error,
            text: 'Faile',
            icon: 'error',
            backdrop: false
          });
        });
    }
  };
  const handleAddSubject = (e) => {
    e.preventDefault();
    const newSubject = {
      subjectName: '',
      courseCode: '',
      date: '',
      startTime: '',
      endTime: ''
    };
    setExamData(prevData => ({
      ...prevData,
      subjects: [...prevData.subjects, newSubject]
    }));
  };


  const handleDeleteExam = (examId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you Sure want to Delete this Exam!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      backdrop: false
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          axios.delete('http://localhost:8800/exam/examdelete', { data: { examId } })
            .then(response => {
              fetchExams();
            })
            Swal.fire({
            title: 'Deleted!',
            text: 'Exam has been deleted.',
            icon: 'success',
            backdrop: false
          });
        } catch (error) {
          console.error('Error deleting course:', error);
          Swal.fire({
            title: 'Error',
            text: 'Failed to delete Exam',error,
            icon: 'error',
            backdrop: false
          });
        }
      }
    });
  };

  const handleDeleteSubject = (examId, subjectId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you Sure want to Delete this Subject!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      backdrop: false
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          axios.delete('http://localhost:8800/exam/deletesubject', { data: { examId, subjectId } })
            .then(response => {
              fetchExams();
              Swal.fire({
                title: 'Deleted!',
                text: 'Subject has been deleted.',
                icon: 'success',
                backdrop: false
              });
              }) }catch (error) {
              console.error('Error deleting course:', error);
              Swal.fire({
                title: 'Error',
                text: 'Failed to delete Exam',
                icon: 'error',
                backdrop: false
              });
            }
        }
  });
  };

  const handleEditExam = (exam) => {
   
    setExamData({
      examId: exam._id,
      examName: exam.examName,
      subjects: [{ subjectName: '', courseCode: '', date: '', startTime: '', endTime: '' }]
    });

    setEditingSubject(null);
  };

  const handleEditSubject = (exam, subject) => {
   
    setExamData({
      examId: exam._id,
      examName: exam.examName,
      subjects: [{
        ...subject,
        date: new Date(subject.date).toISOString().split('T')[0],
        startTime: formatTime(subject.startTime),
        endTime: formatTime(subject.endTime)

      }]
    });
    setEditingExam(exam);
    setEditingSubject(subject);
  };
  const formatTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};
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
    setEditingExam(null);
    setEditingSubject(null);
  };

  const handleCancelEdit = () => {
    resetExamData();
  };




  const columns = [

    { name: "subject", align: "center" },
    { name: "courseCode", align: "left" },
    { name: "date", align: "center" },
    { name: "startTime", align: "center" },
    { name: "endTime", align: "center" },
    { name: "action", align: "center" },


  ];

  const renderRows = (subjects, exam) =>
    subjects.map((subject) => ({
      subject: (
        <SoftTypography variant="button" fontWeight="medium">
          {subject.subjectName}
        </SoftTypography>
      ),
      courseCode: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {subject.courseCode}
        </SoftTypography>
      ),
      date: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {new Date(subject.date).toLocaleDateString()}
        </SoftTypography>
      ),
      startTime: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {new Date(subject.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </SoftTypography>
      ),
      endTime: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {new Date(subject.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
            <SoftButton onClick={() => handleDeleteSubject(exam._id, subject._id)} variant="text" color="error">
              <Icon>delete</Icon>&nbsp;delete
            </SoftButton>
          </SoftBox>
          <SoftButton onClick={() => handleEditSubject(exam, subject)} variant="text" color="dark">
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
      <Grid item xs={12} lg={12}>
        <Card>


          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h5">Schedule Exam</SoftTypography>

          </SoftBox>
          <div className="container">
            <form onSubmit={handleAddExam}>
              <div className="row m-2 mb-6">
                <div className="col-md-4">
                  <div className="form-group">
                    <SoftTypography variant="caption" fontWeight="bold">
                      Exam Name
                    </SoftTypography>
                    <SoftInput
                      name="examName"
                      value={examData.examName}
                      onChange={handleExamChange}
                      required
                    />
                  </div>
                </div>
              </div>
              {examData.subjects.map((subject, index) => (
                <div key={index}>
                  <div className="row m-2 mb-6">

                    <div className="col-md-4">
                      <SoftTypography variant="caption" fontWeight="bold">Course Code</SoftTypography>
                      <select
                        name="courseCode"
                        value={subject.courseCode}
                        onChange={(e) => handleCourseCodeChange(e, index)}
                        className="form-control"
                        required
                      >
                        <option value="" disabled>Select Course Code</option>
                        {courseCodes.map((course) => (
                          <option key={course.courseCode} value={course.courseCode}>{course.courseCode}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <SoftTypography variant="caption" fontWeight="bold">Subject Name</SoftTypography>
                        <SoftInput
                          name="subjectName"
                          value={subject.subjectName}
                          onChange={(e) => handleInputChange(e, index, 'subjectName')}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row m-2 mb-6">
                    <div className="col-md-4">
                      <div className="form-group">
                        <SoftTypography variant="caption" fontWeight="bold">Date</SoftTypography>
                        <SoftInput
                          name="date"
                          type="date"
                          value={subject.date}
                          onChange={(e) => handleInputChange(e, index, 'date')}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <SoftTypography variant="caption" fontWeight="bold">Start Time</SoftTypography>
                        <SoftInput
                          name="startTime"
                          type="time"
                          value={subject.startTime}
                          onChange={(e) => handleInputChange(e, index, 'startTime')}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <SoftTypography variant="caption" fontWeight="bold">End Time</SoftTypography>
                      <SoftInput
                        name="endTime"
                        type="time"
                        value={subject.endTime}
                        onChange={(e) => handleInputChange(e, index, 'endTime')}
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="row m-2 mb-6">
                <div className="col-md-6">

                </div>
                <div className="col-md-2"></div>
                <div className="col-md-2 pt-4 m-6">
                  {editingExam && (
                    <SoftButton type="button" onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>
                      Cancel
                    </SoftButton>
                  )}
                </div>
                <div className="col-md-2 pt-4 m-6">
                  <SoftButton type="submit">{editingExam ? 'Update Exam' : 'Add Exam'}</SoftButton>
                </div>
              </div>
            </form>

          </div>
        </Card>
      </Grid>
      <SoftBox py={3}>
        {exams.map((exam) => (
          <SoftBox mb={3} key={exam._id}>
            <Card>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SoftTypography variant="h5">{exam.examName}</SoftTypography>
                <SoftTypography variant="h5">{exam.examId}</SoftTypography>
                <SoftBox>
                  <SoftButton onClick={() => handleEditExam(exam)} variant="text" color="dark">
                    <Icon>add</Icon>&nbsp;Add
                  </SoftButton>
                  <SoftButton onClick={() => handleDeleteExam(exam._id)} variant="text" color="error">
                    <Icon>delete</Icon>&nbsp;Delete
                  </SoftButton>
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
                <Table columns={columns} rows={renderRows(exam.subjects, exam)} />
              </SoftBox>
            </Card>
          </SoftBox>
        ))}

      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default TExtable;
