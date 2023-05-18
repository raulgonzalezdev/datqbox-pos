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
import ProductsList from "views/Pages/Products/ProductsList.js"


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
    path: "dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    element: <Dashboard/>,
    layout: "/admin",
  },
  {
    path: "posapp",
    name: "POS",
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color="inherit" />,
    element: <POSApp/>,
    layout: "/admin",
  },


  {
    name: "Productos",
    path: "productos",
    category: "account",
    rtlName: "صفحات",
    icon: <CreditIcon color="inherit" />,
    state: "pageArcordion",
    views: [
      {
        path: "products",
        name: "Articulos",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        element: <ProductsList/>,
        layout: "/admin",
      },
      
    ],
  },
  {
    name: "Pedidos",
    path: "pedidos",
    category: "account",
    rtlName: "صفحات",
    state: "pageArcordion",
    icon: <CreditIcon color="inherit" />,
    views: [
     
      {
        path: "periodsaccounting",
        name: "Clientes",
        rtlName: "آرتيإل",
        icon: <SupportIcon color="inherit" />,
        secondaryNavbar: true,
        element: <PeriodsAccounting/>,
        layout: "/admin",
      },
      {
        path: "rtl-support-page",
        name: "Pedidos",
        rtlName: "آرتيإل",
        icon: <SupportIcon color="inherit" />,
        element: <RTLPage/>,
        layout: "/admin",
      },
      {
        path: "rtl-support",
        name: "Pagos",
        rtlName: "آرتيإل",
        icon: <SupportIcon color="inherit" />,
        element: <Tables/>,
        layout: "/admin",
      },
    ],
  },
  
  {
    name: "Reportes",
    path: "reportes",
    category: "account",
    rtlName: "صفحات",
    icon: <CreditIcon color="inherit" />,
    state: "pageArcordion",
    views: [
      {
        path: "stepperform",
        name: "Detalle de Ventas",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        element: <StepperForm/>,
        layout: "/admin",
      },
      {
        path: "signin",
        name: "Pedidos",
        rtlName: "لوحة القيادة",
        icon: <DocumentIcon color="inherit" />,
        element: <SignIn/>,
        layout: "/admin",
      },
      {
        path: "signup",
        name: "Formas de Pago",
        rtlName: "لوحة القيادة",
        icon: <RocketIcon color="inherit" />,
        secondaryNavbar: true,
        element: <SignUp/>,
        layout: "/admin",
      },
    ],
  },
];
export default dashRoutes;
