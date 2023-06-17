import React from 'react'
import TableCrud from 'components/TableCrud/TableCrud'

import ColumnsComponent from './ColumnsComponent'
import  usePayments  from './usePayments'


export default function PaymentsList() {
 
  return (
    <>
    <TableCrud useCustomHook={usePayments} ColumnsComponent={ColumnsComponent} />
    </>
      
  )
}
