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

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import PDashboard from "layouts/parent/dashboard";
import PProfile from "layouts/parent/profile";
import PExtable from "layouts/parent/exams";
import PResults from "layouts/parent/results";
import PFeedback from "layouts/parent/feedback/feedback";
import Pcourses from "layouts/parent/courses";

import TDashboard from "layouts/teacher/dashboard";
import TExtable from "layouts/teacher/exams";
import Tfeedback from "layouts/teacher/feedback/feedback";
import Tresults from "layouts/teacher/results";
import TProfile from "layouts/teacher/profile";
import TCourses from "layouts/teacher/courses";
import Conduct from "layouts/teacher/conductexam/conduct";

import Login from "layouts/login/Login";

import SDashboard from "layouts/student/dashboard";
import SProfile from "layouts/student/profile";
import Stimetable from "layouts/student/exams";
import Sresults from "layouts/student/results";
import Sfeedback from "layouts/student/feedback/feedback";
import Studattend from "layouts/student/attend/attend";
import Scourses from "layouts/student/courses";
import Tstudprofile from "layouts/teacher/studentprofile";



// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Exams from "examples/Icons/Exams";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import App from "App";
import { Rocket } from "@mui/icons-material";
import { Groups } from "@mui/icons-material";
import { Reviews } from "@mui/icons-material";


export const sroutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "sdashboard",
    route: "/sdashboard",
    icon: <Shop size="12px" />,
    component: <SDashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Courses",
    key: "scourses",
    route: "/scourses",
    icon: <Document size="12px" />,
    component: <Scourses />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Timetable",
    key: "stimetable",
    route: "/stimetable",
    icon: <Office size="12px" />,
    component: <Stimetable />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Attend Exams",
    key: "attendexams",
    route: "/attendexams",
    icon: <Exams size="12px" />,
    component: <Studattend />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Results",
    key: "sresults",
    route: "/sresults",
    icon: <SpaceShip size="12px" />,
    component: <Sresults />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Feedback",
    key: "sfeedback",
    route: "/sfeedback",
    icon: <Reviews size="12px" />,
    component: <Sfeedback />,
    noCollapse: true,
  },


 /* { type: "title", title: "Account Pages", key: "account-pages" },*/

  
    {
    type: "collapse",
    name: "Profile",
    key: "sprofile",
    route: "/sprofile",
    icon: <CustomerSupport size="12px" />,
    component: <SProfile />,
    noCollapse: true,
  },
];
export const troutes = [
  {
    type: "collapse",
    name: "Faculty Dashboard",
    key: "tdashboard",
    route: "/tdashboard",
    icon: <Shop size="12px" />,
    component: <TDashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Courses",
    key: "courses",
    route: "/courses",
    icon: <Document size="12px" />,
    component: <TCourses />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Timetable",
    key: "timetable",
    route: "/timetable",
    icon: <Office size="12px" />,
    component: <TExtable />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Invigilate",
    key: "invigilate",
    route: "/invigilate",
    icon: <Exams size="12px" />,
    component: <Conduct />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Results",
    key: "results",
    route: "/results",
    icon: <SpaceShip size="12px" />,
    component: <Tresults />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Feedback",
    key: "tfeedback",
    route: "/tfeedback",
    icon: <Reviews size="12px" />,
    component: <Tfeedback />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Student Profile",
    key: "tstudprofile",
    route: "/tstudprofile",
    icon: <Groups size="12px" />,
    component: <Tstudprofile />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "tprofile",
    route: "/tprofile",
    icon: <CustomerSupport size="12px" />,
    component: <TProfile />,
    noCollapse: true,
  },

 


   
];
export const proutes = [
 
  
 {
    type: "collapse",
    name: "Dashboard",
    key: "pdashboard",
    route: "/pdashboard",
    icon: <Shop size="12px" />,
    component: <PDashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Courses",
    key: "pcourses",
    route: "/pcourses",
    icon: <Document size="12px" />,
    component: <Pcourses />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Timetable",
    key: "ptimetable",
    route: "/ptimetable",
    icon: <Office size="12px" />,
    component: <PExtable />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Results",
    key: "presults",
    route: "/presults",
    icon: <SpaceShip size="12px" />,
    component: <PResults />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Feedback",
    key: "pfeedback",
    route: "/pfeedback",
    icon: <Reviews size="12px" />,
    component: <PFeedback />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Student Profile",
    key: "pprofile",
    route: "/pprofile",
    icon: <CustomerSupport size="12px" />,
    component: <PProfile />,
    noCollapse: true,
  },

 
 
 

 
];


