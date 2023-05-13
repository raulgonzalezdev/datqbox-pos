import React from "react";
import Stepper from "components/Stepper/Stepper.js";
import UserInfo from "./UserInfo";
import Address from "./Address";
import Social from "./Social";
import Profile from "./Profile";
import UsersList from "../Users/UsersList"
import ProductsList from "../Products/ProductsList"
import ProductForm from "../Products/ProductForm"

const steps = [
  // { title: "User Info" },
  // { title: "Address" },
  // { title: "Social" },
  // { title: "Profile" },
  { title: "Productos" },
  { title: "Detalles" },
];

const components = [ ProductsList, ProductForm];

const StepperForm = () =>{

    const handleSubmit = () => {
        alert("Submit");
      };  
  return <Stepper steps={steps} components={components} onSubmit={handleSubmit} />;
}

export default StepperForm;