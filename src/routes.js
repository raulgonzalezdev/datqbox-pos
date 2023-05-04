import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";
import Billing from "views/Dashboard/Billing.js";
import RTLPage from "views/RTL/RTLPage.js";
import Profile from "views/Dashboard/Profile.js";
import SignIn from "views/Pages/SignIn.js";
import SignUp from "views/Pages/SignUp.js";
import StepperForm from "views/Pages/StepperForm/StepperForm.js";
import UsersList from "views/Pages/StepperForm/UsersList";
import PeriodsAccounting from "views/Pages/PeriodsAccounting/PeriodsAccounting.js";
import POSApp from "views/Pages/POSApp/POSApp.js";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "components/Icons/Icons";

export const adminRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color='inherit' />,
    component: Dashboard,
  },
  {
    path: "/Userslist",
    name: "User List",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color='inherit' />,
    component: UsersList,
  },
  {
    path: "/tables",
    name: "Tables",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color='inherit' />,
    component: Tables,
  },
  {
    path: "/pos",
    name: "POS",
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color='inherit' />,
    component: POSApp,
  },
  {
    path: "/periodsaccounting",
    name: "Periods Accounting",
    rtlName: "آرتيإل",
    icon: <SupportIcon color='inherit' />,
    component: PeriodsAccounting,
  },
  {
    path: "/rtl-support-page",
    name: "RTL",
    rtlName: "آرتيإل",
    icon: <SupportIcon color='inherit' />,
    component: RTLPage,
  },
  {
    path: "/profile",
    name: "Profile",
    rtlName: "لوحة القيادة",
    icon: <PersonIcon color='inherit' />,
    secondaryNavbar: true,
    component: Profile,
  },
  {
    path: "/stepperform",
    name: "StepperForm",
    rtlName: "لوحة القيادة",
    icon: <PersonIcon color='inherit' />,
    secondaryNavbar: true,
    component: StepperForm,
  },
];

export const authRoutes = [
  {
    path: "/signin",
    name: "Sign In",
    rtlName: "لوحة القيادة",
    icon: <DocumentIcon color='inherit' />,
    component: SignIn,
  },
  {
    path: "/signup",
    name: "Sign Up",
    rtlName: "لوحة القيادة",
    icon: <RocketIcon color='inherit' />,
    secondaryNavbar: true,
    component: SignUp,
  },
];
