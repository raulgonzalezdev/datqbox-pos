import React from 'react'
import TableCrud from 'components/TableCrud/TableCrud'

import ColumnsComponent from './ColumnsComponent'
import  useTaxes  from './useTaxes'


export default function TaxesList() {
 
  return (
    <>
    <TableCrud useCustomHook={useTaxes} ColumnsComponent={ColumnsComponent} />
    </>
      
  )
}
