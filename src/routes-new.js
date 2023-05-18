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
    path: "/admin/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
  },
  {
    path: "/pos/pos",
    name: "POS",
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color="inherit" />,
    component: POSApp,
  },
  {
    path: "/admin/products",
    name: "Articulos",
    rtlName: "لوحة القيادة",
    icon: <PersonIcon color="inherit" />,
    secondaryNavbar: true,
    component: ProductsList,
  },
  {
    path: "/admin/periodsaccounting",
    name: "Clientes",
    rtlName: "آرتيإل",
    icon: <SupportIcon color="inherit" />,
    secondaryNavbar: true,
    component: PeriodsAccounting,
  },
  {
    path: "/admin/rtl-support-page",
    name: "Pedidos",
    rtlName: "آرتيإل",
    icon: <SupportIcon color="inherit" />,
    component: RTLPage,
  },
  {
    path: "/admin/rtl-support",
    name: "Pagos",
    rtlName: "آرتيإل",
    icon: <SupportIcon color="inherit" />,
    component: Tables,
  },
  {
    path: "/admin/stepperform",
    name: "Detalle de Ventas",
    rtlName: "لوحة القيادة",
    icon: <PersonIcon color="inherit" />,
    secondaryNavbar: true,
    component: StepperForm,
  },
  {
    path: "/auth/signin",
    name: "Pedidos",
    rtlName: "لوحة القيادة",
    icon: <DocumentIcon color="inherit" />,
    component: SignIn,
  },
  {
    path: "/auth/signup",
    name: "Formas de Pago",
    rtlName: "لوحالقيادة",
    icon: <RocketIcon color="inherit" />,
    secondaryNavbar: true,
    component: SignUp,
  },
];

// Ajustamos el componente para usar 'element' en lugar de 'component' para cumplir con las convenciones de react-router v6.
dashRoutes = dashRoutes.map((route) => ({
  ...route,
  element: <route.component />,
}));

export default dashRoutes;
