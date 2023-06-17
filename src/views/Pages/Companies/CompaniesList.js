import React from 'react'
import TableCrud from 'components/TableCrud/TableCrud'

import ColumnsComponent from './ColumnsComponent'
import  useCompanies  from './useCompanies'


export default function PaymentsList() {
 
  return (
    <>
    <TableCrud useCustomHook={useCompanies} ColumnsComponent={ColumnsComponent} />
    </>
      
  )
}
