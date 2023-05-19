import React from 'react'
import Stepper from 'components/Stepper/Stepper.js'
import AccountingPeriods from './AccountingPeriods'
import BankAccountsList from './BankAccountsList'
import CreateBankAccount from './CreateBankAccount'
import CreateTax from './CreateTax'


const steps = [
  { title: 'Periodos contables' },
  { title: 'Cuenta bancaria' },
  { title: 'Crear cuenta bancaria' },
  
]


const components = [AccountingPeriods, CreateBankAccount, CreateTax  ]

const PeriodsAccounting = () =>{

    const handleSubmit = () => {
        alert('Submit')
      }  
  return <Stepper steps={steps} components={components} onSubmit={handleSubmit} />
}

export default PeriodsAccounting