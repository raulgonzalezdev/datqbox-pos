import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";
import Billing from "views/Dashboard/Billing.js";
import RTLPage from "views/RTL/RTLPage.js";
import Profile from "views/Dashboard/Profile.js";
import SignIn from "views/Pages/SignIn.js";
import SignUp from "views/Pages/SignUp.js";
import StepperForm from "views/Pages/StepperForm/StepperForm.js";
import UsersList from "views/Pages/Users/UsersList";
import PeriodsAccounting from "views/Pages/PeriodsAccounting/PeriodsAccounting.js";
import POSApp from "views/Pages/POSApp/POSApp.js";
import ProductsList from "views/pages/Products/ProductsLists"

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
  
} from "components/Icons/Icons";


var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/pos",
    name: "POS",
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color="inherit" />,
    component: POSApp,
    layout: "/pos",
  },

  // {
  //   name: "Modulos",
  //   category: "account",
  //   rtlName: "صفحات",
  //   state: "pageCollapse",
  //   views: [],
  //   // views: [
  //   //   {
  //   //     path: "/Userslist",
  //   //     name: "User List",
  //   //     rtlName: "لوحة القيادة",
  //   //     icon: <StatsIcon color="inherit" />,
  //   //     component: UsersList,
  //   //     layout: "/admin",
  //   //   },
  //   //   {
  //   //     path: "/tables",
  //   //     name: "Tables",
  //   //     rtlName: "لوحة القيادة",
  //   //     icon: <StatsIcon color="inherit" />,
  //   //     component: Tables,
  //   //     layout: "/admin",
  //   //   },
  //   // ],
  // },
  {
    name: "Pedidos",
    category: "account",
    rtlName: "صفحات",
    state: "pageArcordion",
    icon: <CreditIcon color="inherit" />,
    views: [
      {
        path: "/periodsaccounting",
        name: "Clientes",
        rtlName: "آرتيإل",
        icon: <SupportIcon color="inherit" />,
        secondaryNavbar: true,
        component: PeriodsAccounting,
        layout: "/admin",
      },
      {
        path: "/rtl-support-page",
        name: "Pedidos",
        rtlName: "آرتيإل",
        icon: <SupportIcon color="inherit" />,
        component: RTLPage,
        layout: "/admin",
      },
      {
        path: "/rtl-support",
        name: "Pagos",
        rtlName: "آرتيإل",
        icon: <SupportIcon color="inherit" />,
        component: Tables,
        layout: "/admin",
      },
    ],
  },
  {
    name: "Productos",
    category: "account",
    rtlName: "صفحات",
    icon: <CreditIcon color="inherit" />,
    state: "pageArcordion",
    views: [
      {
        path: "/products",
        name: "Articulos",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: ProductsList,
        layout: "/admin",
      },
    ],
  },
  {
    name: "Reportes",
    category: "account",
    rtlName: "صفحات",
    icon: <CreditIcon color="inherit" />,
    state: "pageArcordion",
    views: [
      {
        path: "/stepperform",
        name: "Detalle de Ventas",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: StepperForm,
        layout: "/admin",
      },
      {
        path: "/signin",
        name: "Pedidos",
        rtlName: "لوحة القيادة",
        icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        layout: "/auth",
      },
      {
        path: "/signup",
        name: "Formas de Pago",
        rtlName: "لوحة القيادة",
        icon: <RocketIcon color="inherit" />,
        secondaryNavbar: true,
        component: SignUp,
        layout: "/auth",
      },
    ],
  },
];
export default dashRoutes;
