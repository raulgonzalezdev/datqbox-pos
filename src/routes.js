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
import { BiAperture, BiCategory } from 'react-icons/bi'
import { ImOffice, ImUsers , ImMakeGroup, ImPieChart} from 'react-icons/im'
import { FaLaravel, FaCoins,FaMoneyBillWave, FaFileInvoiceDollar, FaUsers  } from 'react-icons/fa'
import { SiTaxbuzz, SiDassaultsystemes } from 'react-icons/si'
import { GiPayMoney } from 'react-icons/gi'
import { FcShop, FcOrgUnit } from 'react-icons/fc'
import { BsGraphUpArrow } from 'react-icons/bs'
import { TbReceiptTax } from 'react-icons/tb'
import { CgSize, CgMonday, CgProfile } from 'react-icons/cg'
import { MdCoPresent, MdDashboard } from 'react-icons/md'




var dashRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    rtlName: 'لوحة القيادة',
    icon: <FcOrgUnit color="white" size={24} />,
    secondaryNavbar: true,
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/pos',
    name: 'POS',
    rtlName: 'لوحة القيادة',
    icon: <FcShop color="white" size={24} />,
    component: POSApp,
    layout: '/pos',
  },

  {
    name: 'Productos',
    path: '/products',
    category: 'account',
    rtlName: 'صفحات',
    icon: <CgMonday color="white" size={24}/>,
    state: 'pageArcordion',
    views: [
      {
        path: '/products',
        name: 'Articulos',
        rtlName: 'لوحة القيادة',
        icon: <FaLaravel color="white" size={24}/>,
        secondaryNavbar: true,
        component: ProductsList,
        layout: '/admin',
      },
      {
        path: '/categories',
        name: 'Categorias',
        rtlName: 'لوحة القيادة',
        icon: <BiCategory color="white" size={24}/>,
        secondaryNavbar: true,
        component: CategoriesList,
        layout: '/admin',
      },
      {
        path: '/sizes',
        name: 'Tallas',
        rtlName: 'لوحة القيادة',
        icon: <CgSize color="white" size={24}/>,
        secondaryNavbar: true,
        component: SizesList,
        layout: '/admin',
      },
      {
        path: '/colores',
        name: 'Colores',
        rtlName: 'لوحة القيادة',
        icon: <BiAperture color="white" size={24}/>,
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
    icon: <MdCoPresent color="white" size={24}/>,
    state: 'pageArcordion',
    views: [
      {
        path: '/companies',
        name: 'Empresas',
        rtlName: 'لوحة القيادة',
        icon: <ImOffice color="white" size={24}/>,
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
    icon: <SiTaxbuzz color="white" size={24}/>,
    views: [
     
     
      {
        path: '/paymentmethods',
        name: 'PaymentMethods',
        rtlName: 'آرتيإل',
        icon: <GiPayMoney color="white" size={24}/>,
        secondaryNavbar: true,
        component: PaymentsList,
        layout: '/admin',
      },
      {
        path: '/taxes',
        name: 'Taxes',
        rtlName: 'آرتيإل',
        icon: <TbReceiptTax color="white" size={24}/>,
        secondaryNavbar: true,
        component: TaxesList,
        layout: '/admin',
      },
      {
        path: '/currencies',
        name: 'Currencies',
        rtlName: 'آرتيإل',
        icon: <FaCoins color="yellow" size={24}/>,
        secondaryNavbar: true,
        component: CurrenciesList,
        layout: '/admin',
      },
      {
        path: '/exchangesrate',
        name: 'Tasa de Cambio',
        rtlName: 'آرتيإل',
        icon: <FaMoneyBillWave color="green" size={24}/>,
        secondaryNavbar: true,
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
    icon: <ImMakeGroup color="white" size={24}/>,
    views: [
      {
        path: '/invoices',
        name: 'Invoices',
        rtlName: 'آرتيإل',
        icon: <FaFileInvoiceDollar color="green" size={24}/>,
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
    icon: <ImPieChart color="white" size={24}/>,
    state: 'pageArcordion',
    views: [
      {
        path: '/stepperform',
        name: 'Detalle de Ventas',
        rtlName: 'لوحة القيادة',
        icon: <BsGraphUpArrow color="white" size={24}/>,
        secondaryNavbar: true,
        component: StepperForm,
        layout: '/admin',
      },
    ],
  },
  {
    name: 'Usuarios',
    path: '/user',
    category: 'account',
    rtlName: 'صفحات',
    icon: <ImUsers color="white" size={24}/>,
    state: 'pageArcordion',
    views: [
      {
        path: '/users',
        name: 'Usuarios',
        rtlName: 'لوحة القيادة',
        icon: <FaUsers color="white" size={24}/>,
        secondaryNavbar: true,
        component: UsersList,
        layout: '/admin',
      },
      {
        path: '/stepperform',
        name: 'Mi Perfil',
        rtlName: 'لوحة القيادة',
        icon: <CgProfile color="white" size={24}/>,
        secondaryNavbar: true,
        component: StepperForm,
        layout: '/admin',
      },
    ],
  },
]
export default dashRoutes
