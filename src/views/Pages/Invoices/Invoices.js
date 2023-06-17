import React from 'react'
import TableCrud from 'components/TableInvoice/TableCrud'
import { Box, Flex } from '@chakra-ui/react'

import ColumnsComponent from './ColumnsComponent'
import useInvoices from './useInvoices'



export default function Invoices() {


  
  return (
    <>
 
        <TableCrud 
          useCustomHook={useInvoices} 
          ColumnsComponent={ColumnsComponent} 
        />

    
     </>
  )
}

