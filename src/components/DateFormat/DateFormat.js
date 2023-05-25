import React from 'react'
import { Box } from '@chakra-ui/react'

const DateFormat = ({ valuedate }) => {
    const date = new Date(valuedate)
    const formattedDate = date.toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' })

    return (
        <Box>{formattedDate}</Box>
    )
}

export default DateFormat

