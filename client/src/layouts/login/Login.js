import { useState } from 'react';

import React from 'react';
import Swal from 'sweetalert2'

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { sroutes, troutes, proutes } from 'routes';
import theme from "assets/theme";
import Switch from "@mui/material/Switch";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';


// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import { Tabs, Tab } from "@mui/material";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from './components/BasicLayout';
import Icon from "@mui/material/Icon";
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import { useEffect, useMemo } from "react";
import brand from "assets/images/logo-ct.png";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";



// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

function LoginMain() {

  const navigate = useNavigate()

  const [data, setData] = useState({
    username: '',
    password: '',


  })








  const [activeTab, setActiveTab] = useState("pills-Student");
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    usertype: 'student',
  });
  const [error, setError] = useState('');

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    switch (tabId) {
      case "pills-Student":
        setFormData({ ...formData, usertype: "student" });
        break;
      case "pills-Faculty":
        setFormData({ ...formData, usertype: "faculty" });
        break;
      case "pills-Parent":
        setFormData({ ...formData, usertype: "parent" });
        break;
      default:
        break;
    }
  };
  const togglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     console.log(formData.usertype);
  //     try {
  //       dispatch(loginStart());
  //       const res = await fetch(`/api/auth/login`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       });
  //       console.log(data)
  //       const data = await res.json();
  //       if (data?.success) {
  //         dispatch(loginSuccess(data?.user));
  //         alert(data?.message);
  //         navigate("/sdashboard");
  //       } else {
  //         dispatch(loginFailure(data?.message));
  //         alert(data?.message);
  //       }
  //     } catch (error) {
  //       dispatch(loginFailure(error.message));
  //       console.log(error);
  //     }
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const res = await fetch(`http://localhost:8800/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data?.success) {

        localStorage.setItem('authToken', data.token);
        console.log(data.token);
        

        switch (formData.usertype) {
          case 'student':
            navigate('/sdashboard');
            break;
          case 'parent':
            navigate('/pdashboard');
            break;
          case 'faculty':
            navigate('/tdashboard');
            break;
          default:
            Swal.fire({
              title: 'Error!',
              text: 'Invalid Usertype',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
            break;
        }

      } else {
        Swal.fire({
          title: 'Error!',
          text: data?.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        })


      }
    }
    catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error,
        icon: 'error',
        confirmButtonText: 'Ok'
      })

    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BasicLayout
        title="Exam Portal"

        image={curved6}
      >      <Card>
          <SoftBox p={3} mb={1} textAlign="center">
            <SoftTypography variant="h4" fontWeight="medium">

            </SoftTypography>

            <SoftBox p={3}>
              <Tabs value={activeTab} onChange={(e, value) => handleTabChange(value)} centered>
                <Tab label="Student" value="pills-Student" />
                <Tab label="Faculty" value="pills-Faculty" />
                <Tab label="Parent" value="pills-Parent" />
              </Tabs>
            </SoftBox>
            <SoftBox p={3}>
              <form onSubmit={handleSubmit}>
                {activeTab === "pills-Student" && (
                  <>
                    <SoftBox mb={2}>
                      <SoftInput
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        autoComplete='off'
                        placeholder="Roll No"
                        fullWidth
                        mb={4}
                      /></SoftBox>


                  </>
                )}
                {activeTab === "pills-Faculty" && (
                  <>
                    <SoftBox mb={2}>
                      <SoftInput
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        autoComplete='off'
                        placeholder="Staff ID"
                        fullWidth
                        mb={4}
                      /></SoftBox>

                  </>
                )}
                {activeTab === "pills-Parent" && (
                  <>
                    <SoftBox mb={2}>
                      <SoftInput
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        autoComplete='off'
                        placeholder="Roll No"
                        fullWidth
                        mb={4}
                      /></SoftBox>


                  </>
                )}
                <SoftBox mb={2}>
                  <SoftInput
                    type={formData.showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    fullWidth
                    mb={4}
                  /></SoftBox>
                <SoftBox display="flex" alignItems="center">
                  <Switch checked={formData.showPassword} onChange={togglePasswordVisibility} />
                  <SoftTypography
                    variant="button"
                    fontWeight="regular"
                    onClick={togglePasswordVisibility}
                    sx={{ cursor: "pointer", userSelect: "none" }}
                  >
                    &nbsp;&nbsp;Show Password
                  </SoftTypography>
                </SoftBox>

                <SoftBox mt={4} mb={1}>
                  <SoftButton
                    type="submit"
                    variant="gradient" color="dark" fullWidth
                  >
                    Log in
                  </SoftButton>
                </SoftBox>
              </form>
            </SoftBox>
          </SoftBox>



        </Card>

      </BasicLayout></ThemeProvider>
  );
};

export default LoginMain;
