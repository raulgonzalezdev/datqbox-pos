import React from 'react'
import TableCrud from 'components/TableCrud/TableCrud'

import ColumnsComponent from './ColumnsComponent'
import  useSizesList  from './useSizesList'


export default function SizesList() {
 
  return (
    <>
    <TableCrud useCustomHook={useSizesList} ColumnsComponent={ColumnsComponent} />
    </>
      
  )
}
