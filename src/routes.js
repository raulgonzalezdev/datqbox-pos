import React from 'react'
import Dashboard from 'views/Dashboard/Dashboard'
import Tables from 'views/Dashboard/Tables'
import Billing from 'views/Dashboard/Billing'
import RTLPage from 'views/RTL/RTLPage'
import Profile from 'views/Dashboard/Profile'
import SignIn from 'views/Pages/SignIn'
import SignUp from 'views/Pages/SignUp'
import StepperForm from 'views/Pages/StepperForm/StepperForm'
import UsersList from 'views/Pages/Users/UsersList'
import PeriodsAccounting from 'views/Pages/PeriodsAccounting/PeriodsAccounting'
import POSApp from 'views/Pages/POSApp/POSApp'
import ProductsList from 'views/Pages/Products/ProductsList'
import CategoriesList from 'views/Pages/Categories/CategoriesList'
import ColorsList from 'views/Pages/Colors/ColorsList'
import SizesList from 'views/Pages/Sizes/SizesList'
import PaymentsList from 'views/Pages/Payments/PaymentsList'
import CompaniesList from 'views/Pages/Companies/CompaniesList'
import TaxesList from 'views/Pages/Taxes/TaxesList'
import CurrenciesList from 'views/Pages/Currencies/CurrenciesList'
import Invoices from 'views/Pages/Invoices/Invoices'
import ExchangesRateList from 'views/Pages/ExchangeRate/ExchangesRateList'
import { HomeIcon, StatsIcon, CreditIcon, PersonIcon, DocumentIcon, RocketIcon, SupportIcon } from 'components/Icons/Icons'

var dashRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    rtlName: 'لوحة القيادة',
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/pos',
    name: 'POS',
    rtlName: 'لوحة القيادة',
    icon: <CreditIcon color="inherit" />,
    component: POSApp,
    layout: '/pos',
  },

  {
    name: 'Productos',
    path: '/products',
    category: 'account',
    rtlName: 'صفحات',
    icon: <CreditIcon color="inherit" />,
    state: 'pageArcordion',
    views: [
      {
        path: '/products',
        name: 'Articulos',
        rtlName: 'لوحة القيادة',
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: ProductsList,
        layout: '/admin',
      },
      {
        path: '/categories',
        name: 'Categorias',
        rtlName: 'لوحة القيادة',
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: CategoriesList,
        layout: '/admin',
      },
      {
        path: '/sizes',
        name: 'Tallas',
        rtlName: 'لوحة القيادة',
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: SizesList,
        layout: '/admin',
      },
      {
        path: '/colores',
        name: 'Colores',
        rtlName: 'لوحة القيادة',
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: ColorsList,
        layout: '/admin',
      },
     
    ],
  },
  {
    name: 'Clientes',
    path: '/customers',
    category: 'account',
    rtlName: 'صفحات',
    icon: <CreditIcon color="inherit" />,
    state: 'pageArcordion',
    views: [
      {
        path: '/companies',
        name: 'Empresas',
        rtlName: 'لوحة القيادة',
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: CompaniesList,
        layout: '/admin',
      },
      
     
     
    ],
  },
  {
    name: 'Taxes/Currencies',
    path: '/taxandcurrencies',
    category: 'account',
    rtlName: 'صفحات',
    state: 'pageArcordion',
    icon: <CreditIcon color="inherit" />,
    views: [
     
     
      {
        path: '/paymentmethods',
        name: 'PaymentMethods',
        rtlName: 'آرتيإل',
        icon: <SupportIcon color="inherit" />,
        component: PaymentsList,
        layout: '/admin',
      },
      {
        path: '/taxes',
        name: 'Taxes',
        rtlName: 'آرتيإل',
        icon: <SupportIcon color="inherit" />,
        component: TaxesList,
        layout: '/admin',
      },
      {
        path: '/currencies',
        name: 'Currencies',
        rtlName: 'آرتيإل',
        icon: <SupportIcon color="inherit" />,
        component: CurrenciesList,
        layout: '/admin',
      },
      {
        path: '/exchangesrate',
        name: 'Tasa de Cambio',
        rtlName: 'آرتيإل',
        icon: <SupportIcon color="inherit" />,
        component: ExchangesRateList,
        layout: '/admin',
      },
      
    ],
  },
  {
    name: 'Pedidos',
    path: '/periodsaccounting',
    category: 'account',
    rtlName: 'صفحات',
    state: 'pageArcordion',
    icon: <CreditIcon color="inherit" />,
    views: [
      {
        path: '/invoices',
        name: 'Invoices',
        rtlName: 'آرتيإل',
        icon: <SupportIcon color="inherit" />,
        secondaryNavbar: true,
        component: Invoices,
        layout: '/admin',
      },
     
     
      
    ],
  },

  {
    name: 'Reportes',
    path: '/stepperform',
    category: 'account',
    rtlName: 'صفحات',
    icon: <CreditIcon color="inherit" />,
    state: 'pageArcordion',
    views: [
      {
        path: '/stepperform',
        name: 'Detalle de Ventas',
        rtlName: 'لوحة القيادة',
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: StepperForm,
        layout: '/admin',
      },
    ],
  },
  {
    name: 'Usuarios',
    path: '/stepperform',
    category: 'account',
    rtlName: 'صفحات',
    icon: <CreditIcon color="inherit" />,
    state: 'pageArcordion',
    views: [
      {
        path: '/stepperform',
        name: 'Usuarios',
        rtlName: 'لوحة القيادة',
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: StepperForm,
        layout: '/admin',
      },
      {
        path: '/stepperform',
        name: 'Mi Perfil',
        rtlName: 'لوحة القيادة',
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: StepperForm,
        layout: '/admin',
      },
    ],
  },
]
export default dashRoutes
